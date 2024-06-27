import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOdetails = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      const storedPhone = await AsyncStorage.getItem('userPhone');
      if (storedPhone) {
        setPhone(`+91${storedPhone}`);
      }
    };

    fetchPhoneNumber();
  }, []);

  const handleCallPress = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleAction = (label) => {
    // Handle actions based on the label
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nicco Residency</Text>
        <View style={styles.actionsContainer}>
          {actionButtons.map((button, index) => (
            <TouchableOpacity key={index} style={styles.actionButton} onPress={() => handleAction(button.label)}>
              <View style={styles.actionButtonCircle}>
                <Image source={button.image} style={styles.actionButtonIcon} />
              </View>
              <Text style={styles.actionButtonText}>{button.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main Image */}
      <Image
        source={{ uri: 'https://example.com/your-image-url.jpg' }} // Replace with actual image URL
        style={styles.mainImage}
      />

      {/* Property Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.priceText}>₹ 2.27 Cr Onwards</Text>
        <Text style={styles.propertyTitle}>Nicco Residency</Text>
        <Text style={styles.propertySubtitle}>Nicco Group</Text>
        <Text style={styles.brokerOffer}>View Broker Offer</Text>
        <Text style={styles.propertyDescription}>
          Nicco Residency is a brand-new residential complex that offers opulent 2, 3, and 4 BHK lifestyle homes with the 25,000 Sq ft newest amenities. The Nicco Residency is a tastefully constructed residence with all the conveniences required for a comfortable stay in Mumbai's JVLR Andheri East neighborhood.
        </Text>
      </View>

      {/* Footer Buttons */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={[styles.footerButton, styles.interestedButton]}>
          <Image source={require('../../assets/star.png')} style={[styles.footerButtonIcon, styles.interestedButtonIcon]} />
          <Text style={[styles.footerButtonText, styles.interestedButtonText]}>I'm Interested</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleCallPress}>
          <Image source={require('../../assets/call.png')} style={styles.footerButtonIcon} />
          <Text style={styles.footerButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('../../assets/share.png')} style={styles.footerButtonIcon} />
          <Text style={styles.footerButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const actionButtons = [
  { label: 'Location', image: require('../../assets/location.png') },
  { label: 'eBrochure', image: require('../../assets/brochure.png') },
  { label: 'Gallery', image: require('../../assets/gallery.png') },
  { label: 'Video', image: require('../../assets/vidio.png') },
  { label: 'Site Visit', image: require('../../assets/Visits.png') },
];

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#28282B',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: -40, // Adjusted to properly center the header title
  },
  mainImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginTop: -220, // Adjusted to move up the info container
  },
  priceText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  propertyTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  propertySubtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  brokerOffer: {
    color: '#1E90FF',
    marginBottom: 8,
  },
  propertyDescription: {
    fontSize: 14,
    color: 'black',
  },
  actionsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginVertical: 8,
  },
  actionButtonCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fdd700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28282B',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  footerButtonIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  footerButtonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  interestedButton: {
    backgroundColor: 'white',
    borderColor: 'black',
  },
  interestedButtonText: {
    color: 'black',
  },
  interestedButtonIcon: {
    tintColor: 'black',
  },
});

export default LOdetails;
