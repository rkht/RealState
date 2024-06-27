import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Rq3 = () => {
  const [photos, setPhotos] = useState([null, null, null]);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedOption, formData } = route.params;

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
      console.log('Fetched User ID:', id); // Log user ID for debugging
    };

    fetchUserId();
  }, []);

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

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append('user_id', userId);
      form.append('description', formData.description);
      photos.forEach((photo, index) => {
        if (photo) {
          form.append('images[]', {
            uri: photo,
            type: 'image/jpeg',
            name: `photo${index}.jpg`,
          });
        }
      });
      form.append('want_to_list', selectedOption.listType);
      form.append('service_type', selectedOption.serviceType);
      form.append('property_type', selectedOption.propertyType);
      form.append('city', formData.city);
      form.append('zone', formData.zone);
      form.append('location', formData.location);
      form.append('price', formData.price);
      form.append('configuration', formData.configuration);
      form.append('furnished_type', formData.furnishedType);
      form.append('sqft', formData.sqft);

      console.log('Form Data:', formData); // Log formData
      console.log('User ID:', userId); // Log user_id

      const response = await fetch(`https://textcode.co.in/propertybazar/public/api/requirements/${userId}`, {
        method: 'POST',
        body: form,
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      Alert.alert('Success', 'Data submitted successfully');
      navigation.navigate('Requirement / Inventory');
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Failed to submit data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Images</Text>
      <View style={styles.photoContainer}>{renderPhotos()}</View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Rq3;
