import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddBrokerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const addBroker = route.params?.addBroker;

  const [brokerName, setBrokerName] = useState('');
  const [membershipId, setMembershipId] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dealsDescription, setDealsDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSavePress = async () => {
    if (!brokerName || !membershipId || !location || !contactNumber || !dealsDescription) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append("broker_name", brokerName);
    formData.append("membership_id", membershipId);
    formData.append("location", location);
    formData.append("contact_number", contactNumber);
    formData.append("deals_description", dealsDescription);

    try {
      setLoading(true);
      const response = await fetch('https://textcode.co.in/propertybazar/public/api/brokers', {
        method: 'POST',
        body: formData,
      });

      setLoading(false);

      if (response.ok) {
        const responseData = await response.json();
        Alert.alert('Success', 'Broker details saved successfully.');
        if (addBroker) {
          addBroker(responseData);
        }
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to save broker');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'An error occurred while saving broker details. Please check your network connection and try again.');
    }
  };
  console.log('brokerName:', brokerName);
      console.log('membership_id:', membershipId);
      console.log('location:', location);
      console.log('contact_number:', contactNumber);
      console.log('deals_description:', dealsDescription);
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          placeholder="Broker Name"
          value={brokerName}
          onChangeText={setBrokerName}
          placeholderTextColor={'gray'}
          color="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Membership ID"
          value={membershipId}
          onChangeText={setMembershipId}
          placeholderTextColor={'gray'}
          color="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          placeholderTextColor={'gray'}
          color="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          keyboardType="numeric"
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholderTextColor={'gray'}
          color="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Deals Description"
          value={dealsDescription}
          onChangeText={setDealsDescription}
          placeholderTextColor={'gray'}
          color="black"
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePress} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightgray',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 7,
    marginBottom: 10,
    color: 'black'
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

export default AddBrokerScreen;