import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';

const AddHomeLoanEnquiry = () => {
  const [loanDescription, setLoanDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to control activity indicator

  const handleSave = async () => {
    try {
      setIsLoading(true); // Show activity indicator

      const formData = new FormData();
      formData.append('loan_description', loanDescription);

      console.log('Loan Description:', loanDescription);

      const response = await fetch('https://textcode.co.in/propertybazar/public/api/home-loan', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'Home loan inquiry added successfully');
        console.log('Success: Home loan inquiry added successfully');
      } else {
        throw new Error('Failed to add home loan inquiry');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding the home loan inquiry');
    } finally {
      setIsLoading(false); // Hide activity indicator
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          placeholder="Loan Description"
          value={loanDescription}
          onChangeText={setLoanDescription}
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

export default AddHomeLoanEnquiry;
