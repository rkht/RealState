import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Notification = ({ navigation, route }) => {
  const [fabMenuVisible, setFabMenuVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://textcode.co.in/propertybazar/public/api/notifications');
        console.log('API Response:', response.data);
        const fetchedNotifications = response.data.data.map(notification => ({
          ...notification,
          images: JSON.parse(notification.images.replace(/\\/g, ''))
        }));

        if (Array.isArray(fetchedNotifications)) {
          setNotifications(fetchedNotifications);
        } else {
          console.error('Invalid data format:', response.data);
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        Alert.alert('Error', `Failed to fetch notifications: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (route.params?.formData) {
      const newNotification = {
        title: `${route.params.formData.selectedOption.listType} - ${route.params.formData.selectedOption.serviceType}`,
        message: `Property Type: ${route.params.formData.selectedOption.propertyType}, City: ${route.params.city}, Price: ${route.params.price}`,
        date: 'Just Now',
        images: route.params.formData.photos || ['uploads/1716816714.jpg'], // Use actual images if available
        location: route.params.location,
        price: route.params.price,
        property_type: route.params.formData.selectedOption.propertyType,
        description: route.params.description
      };
      setNotifications((prev) => [newNotification, ...prev]);
    }
  }, [route.params?.formData]);

  const toggleFabMenu = () => {
    setFabMenuVisible(!fabMenuVisible);
  };

  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message: 'Check out the latest notifications from the TeamUp app!',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share the notification');
    }
  };

  const handleNavigatePress = () => {
    navigation.navigate('Add Requirement Inventory');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {notifications.map((notification, index) => (
            notification.images && notification.images.map((image, imgIndex) => (
              <View key={`${index}-${imgIndex}`} style={styles.boxContainer}>
                <View style={styles.rowContainer}>
                  <Image
                    source={{ uri: `https://textcode.co.in/propertybazar/public/${image}` }}
                    style={styles.logo}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.heading}>{notification.title}</Text>
                    <Text style={styles.subheading}>{notification.message}</Text>
                    <Text style={styles.dateText}>{notification.date}</Text>
                  </View>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailText}>Location: {notification.location}</Text>
                  <Text style={styles.detailText}>Price: {notification.price}</Text>
                  <Text style={styles.detailText}>Property Type: {notification.property_type}</Text>
                  <Text style={styles.detailText}>Description: {notification.description}</Text>
                </View>
              </View>
            ))
          ))}
        </View>
      </ScrollView>
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab} onPress={toggleFabMenu}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
        {fabMenuVisible && (
          <View style={styles.fabOptionsContainer}>
            <TouchableOpacity style={styles.fabOption} onPress={handleSharePress}>
              <Image source={require('../../assets/share.png')} style={styles.optionIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabOption} onPress={handleNavigatePress}>
              <Image source={require('../../assets/hotel.png')} style={styles.optionIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  subheading: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  dateText: {
    fontSize: 16,
    color: '#fdd700',
    fontWeight: 'bold',
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    width: '95%',
    height: 'auto',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#28282B',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#fdd700',
    fontSize: 24,
    fontWeight: 'bold',
  },
  fabOptionsContainer: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    alignItems: 'center',
  },
  fabOption: {
    backgroundColor: '#282828',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginBottom: 10,
    marginLeft: -60,
  },
  optionIcon: {
    width: 23,
    height: 23,
    tintColor: '#fdd700',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Notification;
