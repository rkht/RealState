import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';

const AddBookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch('https://textcode.co.in/propertybazar/public/api/bookmarks/7');
        const data = await response.json();
        console.log('hellodata>>>>>>>>>>>>>>>>>>>', data);

        setBookmarks(data || []);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch bookmarks');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {bookmarks.map((bookmark, index) => (
          <View key={index} style={styles.boxContainer}>
            <Image source={{ uri: bookmark.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.imageText}>{bookmark.location}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Type: {bookmark.property_type}</Text>
              <Text style={styles.infoText}>Price: ₹{bookmark.price}</Text>
              <Text style={styles.infoText}>Area: {bookmark.area} sqft</Text>
              <Text style={styles.infoText}>Description: {bookmark.description}</Text>
            </View>
          </View>
        ))}
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
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  imageText: {
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddBookmark;
