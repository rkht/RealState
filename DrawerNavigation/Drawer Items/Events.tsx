import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thirdBoxY, setThirdBoxY] = useState(0);
  const navigation = useNavigation();
  const thirdBoxRef = useRef(null);
  const [fabMenuVisible, setFabMenuVisible] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://textcode.co.in/propertybazar/public/api/getEvents');
        const data = await response.json();
        console.log('hellodata>>>>>>>>>>>>>>>>>>>', data);
        setEvents(data || []);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleLayout = (event, index) => {
    if (index === 2) {
      setThirdBoxY(event.nativeEvent.layout.y);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const toggleFabMenu = () => {
    setFabMenuVisible(!fabMenuVisible);
  };

  const handleSharePress = async (offer) => {
    try {
      const result = await Share.share({
        message: `${offer.name}\nLocation: ${offer.location}\nDescription: ${offer.description}`,
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
      Alert.alert('Error', 'Failed to share the offer');
    }
  };

  const handleAddRequirementInventory = () => {
    navigation.navigate('E1');
  };

  // const handleBoxPress = (offer) => {
  //   navigation.navigate('LOdetails', { offer });
  // };

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
          {events.map((event, index) => (
            <View
              key={index}
              style={styles.boxContainer}
              onLayout={(event) => handleLayout(event, index)}
            >
              <View style={styles.rowContainer}>
                <Image
                  source={{ uri: event.image_url || 'https://via.placeholder.com/90' }}
                  style={styles.smallImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.heading}>{event.event_name}</Text>
                  <Text style={styles.subheading}>{event.event_description}</Text>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.dateText1}>FREE</Text>
                <View style={styles.rowContainer1}>
                  <Image source={require('../../assets/circle.jpg')} style={styles.logo} />
                  <Text style={styles.dateText}>{event.event_date}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab} onPress={toggleFabMenu}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
        {fabMenuVisible && (
          <View style={styles.fabOptionsContainer}>
            <TouchableOpacity style={styles.fabOption} onPress={() => handleSharePress(offers[0])}>
              <Image
                source={require('../../assets/share.png')}
                style={styles.optionIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabOption} onPress={handleAddRequirementInventory}>
              <Image
                source={require('../../assets/hotel.png')}
                style={styles.optionIcon}
              />
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
    paddingVertical: 10,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  logo: {
    width: 15,
    height: 15,
    marginRight: 10,
    tintColor: '#fdd700',
    borderRadius: 50,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  dateText1: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    marginBottom: 10,
    width: 370,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  modalOption: {
    padding: 10,
    fontSize: 18,
  },
  smallImage: {
    width: 90,
    height: 90,
    marginRight: 10,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Events;
