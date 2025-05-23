export const uploadToS3 = async (localUri: string, filename: string) => {
    try {
      const file = await fetch(localUri);
      const blob = await file.blob();
  
      const res = await fetch('http://192.168.1.89:3000/get-upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: `uploads/${filename}`,
          contentType: blob.type,
        }),
      });
  
      const { url } = await res.json();
  
      const uploadRes = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': blob.type },
        body: blob,
      });
  
      if (!uploadRes.ok) throw new Error('Upload failed');
  
      console.log('Upload successful:', url);
      return url.split('?')[0]; // S3 object URL
    } catch (err) {
      console.error('S3 Upload error:', err);
      throw err;
    }
  };
  