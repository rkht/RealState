import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const N3 = () => {
  const [photos, setPhotos] = useState([null, null, null]);

  const handleImagePicker = (index) => {
    Alert.alert(
      'Upload Image',
      '',
      [
        {
          text: 'Take a Photo',
          onPress: () => requestCameraPermission(index),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => openGallery(index),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const requestCameraPermission = async (index) => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      openCamera(index);
    } else {
      Alert.alert('Camera permission denied');
    }
  };

  const openCamera = (index) => {
    launchCamera({ mediaType: 'photo', cameraType: 'back' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const newPhotos = [...photos];
        newPhotos[index] = response.assets[0].uri;
        setPhotos(newPhotos);
      }
    });
  };

  const openGallery = (index) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const newPhotos = [...photos];
        newPhotos[index] = response.assets[0].uri;
        setPhotos(newPhotos);
      }
    });
  };

  const renderPhotos = () => {
    return photos.map((photo, index) => (
      <TouchableOpacity key={index} style={styles.imagePlaceholder} onPress={() => handleImagePicker(index)}>
        {photo ? <Image source={{ uri: photo }} style={styles.image} /> : <View style={styles.imageEmpty} />}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Images</Text>
      <View style={styles.photoContainer}>{renderPhotos()}</View>
      <TouchableOpacity style={styles.submitButton} onPress={() => Alert.alert('Submit', 'Photos Submitted')}>
        <Text style={styles.submitButtonText}>Submit (3/3)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#e1e4e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmpty: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d0d0d0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  submitButton: {
    backgroundColor: '#ffcc00',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default N3;