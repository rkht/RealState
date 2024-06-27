import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddHotLeads = () => {
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('Not Claimed'); // Initial status is 'Not Claimed'
  const [isLoading, setIsLoading] = useState(false); // State to control activity indicator

  const handleSave = async () => {
    try {
      setIsLoading(true); // Show activity indicator

      const formData = new FormData();
      formData.append('description', description);
      formData.append('budget', budget);
      formData.append('number', number);
      formData.append('status', status);

      console.log('Description:', description);
      console.log('Budget:', budget);
      console.log('Number:', number);
      console.log('Status:', status);

      const response = await fetch('https://textcode.co.in/propertybazar/public/api/deals', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'Deal added successfully');
        console.log('Success: Deal added successfully');
      } else {
        throw new Error('Failed to add deal');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding the deal');
    } finally {
      setIsLoading(false); // Hide activity indicator
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Budget"
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Number"
          value={number}
          onChangeText={setNumber}
          keyboardType="phone-pad"
          placeholderTextColor={'gray'}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Not Claimed" value="Not Claimed" />
            <Picker.Item label="Already Claimed" value="Already Claimed" />
          </Picker>
        </View>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
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

export default AddHotLeads;
