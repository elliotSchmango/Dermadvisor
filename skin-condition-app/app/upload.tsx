import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { uploadToS3 } from '../utils/uploadToS3';
import { ActivityIndicator } from 'react-native';

export default function Upload() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
  
      try {
        setLoading(true);
        const s3Url = await uploadToS3(uri, `photo-${Date.now()}.jpg`);
        setLoading(false);
        alert('Successfully uploaded! ✅');
  
        router.push({
          pathname: '/result',
          params: { uri, s3Url },
        });
      } catch (err) {
        setLoading(false);
        alert('Upload failed. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <MaterialIcons name="upload-file" size={24} color="white" />
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
  
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          )}
        </>
      )}
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10
  }
});
