import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const AddLatestOffers = () => {
  const [buildingName, setBuildingName] = useState('');
  const [location, setLocation] = useState('');
  const [offers, setOffers] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!buildingName || !location || !offers || !price || !description || !contactNumber) {
      Alert.alert('Error', 'Please fill all the fields before submitting.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('building_name', buildingName);
    formData.append('location', location);
    formData.append('offers', offers);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('contact_number', contactNumber);

    if (image) {
      formData.append('images', {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      });
    }

    try {
      const response = await fetch('https://textcode.co.in/propertybazar/public/api/add-offers', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        Alert.alert('Success', 'Offer added successfully');
        console.log('Success: Offer added successfully');
        // Reset form fields
        setBuildingName('');
        setLocation('');
        setOffers('');
        setPrice('');
        setDescription('');
        setContactNumber('');
        setImage(null);
      } else {
        throw new Error('Failed to add offer');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding the offer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImage({
          uri: selectedImage.uri,
          type: selectedImage.type,
          fileName: selectedImage.fileName,
        });
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          placeholder="Building Name"
          value={buildingName}
          onChangeText={setBuildingName}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Offers"
          value={offers}
          onChangeText={setOffers}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
          <Text style={styles.uploadButtonText}>Upload Image (optional)</Text>
        </TouchableOpacity>
        {image && (
          <Text style={styles.imageText}>Selected Image: {image.fileName}</Text>
        )}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'lightgray',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 7,
    marginBottom: 10,
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  boxContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadButton: {
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: 'black',
    fontSize: 16,
  },
  imageText: {
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AddLatestOffers;
