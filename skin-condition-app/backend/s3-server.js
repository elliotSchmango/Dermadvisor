import express from 'express';
import cors from 'cors';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import { SageMakerRuntimeClient, InvokeEndpointCommand } from "@aws-sdk/client-sagemaker-runtime";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

app.post('/get-upload-url', async (req, res) => {
  const { filename, contentType } = req.body;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${filename}`,
    ContentType: contentType,
  });

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 min
    res.json({ url });
  } catch (err) {
    console.error('Error generating URL', err);
    res.status(500).json({ error: 'Failed to generate URL' });
  }
});

const sagemaker = new SageMakerRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

app.post('/predict', async (req, res) => {
  const { base64Image } = req.body;

  if (!base64Image) {
    return res.status(400).json({ error: 'Image data is required' });
  }

  const buffer = Buffer.from(base64Image, 'base64');

  const command = new InvokeEndpointCommand({
    EndpointName: "sagemaker-dermadvisor-endpoint-fixed",
    ContentType: "image/jpeg",
    Body: buffer,
  });

  try {
    const response = await sagemaker.send(command);
    const raw = await response.Body.transformToString();
    const labelIndex = parseInt(raw.replace(/"/g, ""), 10);
    res.json({ prediction: labelIndex });
  } catch (err) {
    console.error("SageMaker error:", err);
    res.status(500).json({ error: "Inference failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server active on port ${PORT}`);
});
