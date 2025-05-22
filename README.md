# Dermadvisor - a skin condition detection app
## By Elliot Hong

This is a mobile application built with React Native to help users identify common skin conditions from a photo. It uses machine learning to classify skin issues and provides informative resources for users to learn more about their condition, including inclusive example images and properly cited medical references.

---

## Motivation

Millions of people suffer from treatable skin conditions but lack immediate access to dermatological care or trustworthy information. This app offers a fast, privacy-conscious, and inclusive way to understand symptoms, especially for users of all skin tones, by using image classification and linking to medically reviewed sources.

---

## Proposed Requirements (will change as needed as project progresses)

- [x] Mobile platform to support camera access  
- [x] Support photo upload functionality  
- [x] Bottom navbar with 3 icons: upload (left), camera (center), info/citations (right)  
- [x] Camera should only function under adequate lighting; show alert and block capture if lighting is insufficient  
- [x] Upload feature must support jpeg, jpg, png, raw, heic/heif, webp, and tiff formats  
- [x] Information page must include descriptions of common skin conditions (e.g., eczema, acne, antifungal, cellulitis), with inclusive example photos representing various skin tones  
- [x] Example photos should be accessed only through external links labeled with a content warning  
- [x] Add fourth icon on the navbar (to the right of the info icon) that links to a "Sources" tab  
- [x] "Sources" tab must contain APA-style citations and information about the project creator  
- [x] After image upload, display a circular loading progress bar  
- [x] Upon completion, show identified skin condition with a brief explanation  
- [x] Include an 'X' button at the top-right to close the result view  
- [x] Provide a link below the explanation labeled 'take me to description' that jumps to the relevant section on the info tab  
- [x] Use AWS SageMaker to host the skin condition classification model for remote inference  
- [x] Use AWS Lambda and API Gateway to connect the mobile app to SageMaker securely  
- [x] Use Expo for React Native app development and deployment  

---

## Tech Stack

### Frontend
- React Native (with Expo)
- React Navigation (for navbar)
- Styled Components or Tailwind (for styling)

### Backend & Cloud
- AWS S3 (for image storage)
- AWS Lambda (for processing uploaded images)
- AWS API Gateway (for RESTful communication between app and backend)
- AWS SageMaker (for image classification model inference)

### Machine Learning
- PyTorch or TensorFlow (model training)
- EfficientNet-B0 or MobileNetV3 (for classification)
- Exported as TorchScript or used via SageMaker endpoint

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
