import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const AddNews = () => {
  const [date, setDate] = useState('01/01/22');
  const [image, setImage] = useState(null);
  const [newsDescription, setNewsDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to control activity indicator

  const handleSave = async () => {
    try {
      setIsLoading(true); // Show activity indicator

      const formData = new FormData();
      formData.append('date', date);
      if (image) {
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      }
      formData.append('news_description', newsDescription);

      console.log('Date:', date);
      console.log('Image:', image);
      console.log('News Description:', newsDescription);

      const response = await fetch('https://textcode.co.in/propertybazar/public/api/news', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'News added successfully');
        console.log('Success: News added successfully');
      } else {
        throw new Error('Failed to add news');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding the news');
    } finally {
      setIsLoading(false); // Hide activity indicator
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
        console.log('Image selected: ', asset);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={setDate}
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
          <Text style={styles.imageButtonText}>Select Image</Text>
        </TouchableOpacity>
        {image && (
          <Text style={styles.imageText}>Selected Image: {image.fileName}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="News Description"
          value={newsDescription}
          onChangeText={setNewsDescription}
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

export default AddNews;
