# Dermadvisor - a skin condition detection app
## By Elliot Hong

This is a mobile application built with React Native to help users identify common skin conditions from a photo. It uses machine learning to classify skin issues and provides informative resources for users to learn more about their condition, including inclusive example images and properly cited medical references.

---

## Motivation

Millions of people suffer from treatable skin conditions but lack immediate access to dermatological care or trustworthy information. This app offers a fast, privacy-conscious, and inclusive way to understand symptoms, especially for users of all skin tones, by using image classification and linking to medically reviewed sources.

---

## Features

- Capture photos directly from the device camera (with lighting checks)
- Upload images in various formats (jpg, jpeg, png, heic/heif, raw, webp, tiff)
- Circular progress indicator during diagnosis
- Dynamic condition result screen with:
  - Predicted condition name
  - Scrollable link to info page
  - Brief explanation with follow-up resources
  - "X" to close result view
- Informational tab with inclusive examples and condition summaries
- Sources tab with full APA-style references and project author info
- Bottom navigation bar with five tabs: Upload, Camera, Info, Sources, Analysis
- Secure API powered by AWS SageMaker
- Backend powered by Node.js with Express

---

## Tech Stack

### Frontend
- React Native (with Expo)
- React Navigation (for navbar)
- Styled Components
- Libraries including (but not limited to): expo-camera, expo-image-picker, expo-file-system

### Backend & Cloud
- Node.js with Express
- AWS S3 (for image upload/storage)
- AWS SageMaker (for image classification model inference)
- AWS DynamoDB (for dynamic information storage regarding skin conditions)

### Machine Learning
- PyTorch, ResNet18
- Trained and evaluated in SageMaker Studio (Jupyter Labs)
- Model used via SageMaker endpoint

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
