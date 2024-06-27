import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const AddEvents = () => {
  const [eventDate, setEventDate] = useState('');
  const [eventCharge, setEventCharge] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('event_date', eventDate);
      formData.append('event_charge', eventCharge);
      formData.append('event_description', eventDescription);

      if (image) {
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      }

      const response = await fetch('https://textcode.co.in/propertybazar/public/api/events', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'Event added successfully');
        
        navigation.navigate("Events");
      } else {
        throw new Error('Failed to add event');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding the event');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets[0];
        setImage({
          uri: asset.uri,
          type: asset.type,
          fileName: asset.fileName,
        });
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          placeholder="Event Date"
          value={eventDate}
          onChangeText={setEventDate}
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Event Charge"
          value={eventCharge}
          onChangeText={setEventCharge}
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={styles.input}
          placeholder="Event Description"
          value={eventDescription}
          onChangeText={setEventDescription}
          multiline
          numberOfLines={4}
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
          <Text style={styles.imageButtonText}>Select Image</Text>
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
  imageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  imageText: {
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AddEvents;
