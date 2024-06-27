import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddMyRequirement = () => {
  const navigation = useNavigation();
  const [requirementDescription, setRequirementDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSavePress = async () => {
    setSaving(true); // Start showing the activity indicator
    try {
      const response = await fetch('https://textcode.co.in/propertybazar/public/api/myrequires', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          require_description: requirementDescription,
        }),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        Alert.alert('Success', 'Requirement added successfully');
        setRequirementDescription('');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to add requirement');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add requirement');
    } finally {
      setSaving(false); // Stop showing the activity indicator
    }
  };

  console.log('requirementDescription:', requirementDescription);

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Requirement Description"
          value={requirementDescription}
          onChangeText={setRequirementDescription}
          placeholderTextColor="black"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress} disabled={saving}>
          {saving ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
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

export default AddMyRequirement;
