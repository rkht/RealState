import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddRequirement = () => {
  const navigation = useNavigation(); // Use the useNavigation hook
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [price, setPrice] = useState('');
  const [areaSqrtFit, setAreaSqrtFit] = useState('');
  const [userName, setUserName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    // Check if any required field is empty
    if (!location || !propertyType || !price || !areaSqrtFit || !userName || !contactNumber || !description) {
      Alert.alert('Error', 'Please fill all required fields');
      return; // Exit the function if any required field is empty
    }
  
    try {
      setIsLoading(true); // Show activity indicator
      const formData = new FormData();
      formData.append('location', location);
      formData.append('property_type', propertyType);
      formData.append('price', price);
      formData.append('area_sqrtFit', areaSqrtFit);
      formData.append('user_name', userName);
      formData.append('contact_number', contactNumber);
      formData.append('description', description);
  
      const response = await fetch('https://textcode.co.in/propertybazar/public/api/requirements', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        Alert.alert('Success', 'Requirement added successfully');
        console.log('Success: Requirement added successfully');
        // Reset form fields
        setLocation('');
        setPropertyType('');
        setPrice('');
        setAreaSqrtFit('');
        setUserName('');
        setContactNumber('');
        setDescription('');
        navigation.navigate('Requirements'); // Redirect to Requirements screen
      } else {
        throw new Error('Failed to add requirement');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding the requirement');
    } finally {
      setIsLoading(false); // Hide activity indicator
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Property Type"
          value={propertyType}
          onChangeText={setPropertyType}
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Area (Sqft)"
          value={areaSqrtFit}
          onChangeText={setAreaSqrtFit}
          keyboardType="numeric"
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={userName}
          onChangeText={setUserName}
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
});

export default AddRequirement;
