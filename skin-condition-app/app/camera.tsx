import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import { LightSensor } from 'expo-sensors';
import { FlashMode } from 'expo-camera';
import { Image } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [lightLevel, setLightLevel] = useState<number | null>(null);
  const isTooDark = lightLevel !== null && lightLevel < 10;
  const [flash, setFlash] = useState<FlashMode>('off');

  useEffect(() => {
    const subscription = LightSensor.addListener(({ illuminance }) => {
      setLightLevel(illuminance);
    });

    LightSensor.setUpdateInterval(500); //check every half second

    return () => subscription.remove();
  }, []);


  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePhoto = async () => {
    if (lightLevel !== null && lightLevel < 10) {
      alert('Too dark to take a photo. Please improve lighting.');
      return;
    }

    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Captured URI:', photo.uri); //debugging photo preview
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      setPhotoUri(photo.uri); //shows preview to confirm or retake photo    
    }
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Preview</Text>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />

          <View style={styles.previewControls}>
            <TouchableOpacity
              onPress={() => setPhotoUri(null)}
              style={styles.retakeButton}
            >
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: '/result', params: { uri: photoUri } })
              }
              style={styles.confirmButton}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          flash={flash}
        >
          {isTooDark && (
            <View style={styles.darkOverlay}>
              <Text style={styles.darkText}>Too dark – please increase lighting</Text>
            </View>
          )}

          <View style={styles.controls}>
            {/* Flip */}
            <View style={styles.buttonSlot}>
              <TouchableOpacity onPress={toggleCameraFacing} style={styles.sideButton}>
                <Text style={styles.buttonText}>Flip</Text>
              </TouchableOpacity>
            </View>

            {/* Capture */}
            <View style={styles.buttonSlot}>
              <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
                <Text style={styles.buttonText}>Capture</Text>
              </TouchableOpacity>
            </View>

            {/* Flash */}
            <View style={styles.buttonSlot}>
              <TouchableOpacity
                onPress={() =>
                  setFlash(prev => (prev === 'off' ? 'on' : 'off'))
                }
                style={styles.flashButton}
              >
                <Text style={styles.buttonText}>
                  {flash === 'off' ? 'Enable Flash' : 'Disable Flash'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      )}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
  },  
  captureButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 30,
    alignSelf: 'flex-end',
  },
  sideButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  previewImage: {
    width: '90%',
    height: '70%',
    borderRadius: 12,
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  retakeButton: {
    backgroundColor: '#888',
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 20,
  },  
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  darkText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  flashButton: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginHorizontal: 10,
  },  
  buttonSlot: {
    flex: 1,
    alignItems: 'center',
  },  
});
