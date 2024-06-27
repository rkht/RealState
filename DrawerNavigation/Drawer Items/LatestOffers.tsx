import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, Modal, ActivityIndicator, Linking, TouchableWithoutFeedback, Share } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const LatestOffers = () => {
  const navigation = useNavigation();
  const [heartPressed, setHeartPressed] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thirdBoxY, setThirdBoxY] = useState(0);
  const scrollViewRef = useRef(null);
  const [fabMenuVisible, setFabMenuVisible] = useState(false);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://textcode.co.in/propertybazar/public/api/getOffers');
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched Offers:', data);
      const parsedOffers = data.map(offer => ({
        ...offer,
        images: offer.images ? JSON.parse(offer.images) : []
      }));
      setOffers(parsedOffers);
    } catch (error) {
      console.error('Error fetching offers:', error);
      Alert.alert('Error', 'Failed to fetch offers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchOffers();
    }, [])
  );

  const toggleHeart = (index) => {
    setHeartPressed({ ...heartPressed, [index]: !heartPressed[index] });
  };

  const handleCallPress = (number) => {
    Alert.alert(
      'Call',
      `Do you want to call ${number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Linking.openURL(`tel:${number}`) },
      ],
      { cancelable: false }
    );
  };

  const handleFilterPress = () => {
    navigation.navigate('Filter');
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLayout = (event, index) => {
    if (index === 2) {
      setThirdBoxY(event.nativeEvent.layout.y);
    }
  };

  const handleFabPress = () => {
    setModalVisible(true);
  };

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
    navigation.navigate('LO1');
  };

  const handleBoxPress = (offer) => {
    navigation.navigate('LOdetails', { offer });
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
      <ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.placeholder}>Click Filter icon to modify</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity style={styles.filterIcon} onPress={handleFilterPress}>
                <Image
                  source={require('../../assets/filter.png')}
                  style={[styles.icon, { tintColor: 'black' }]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.centeredView}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Choose Your Location</Text>
                  {['Mumbai', 'Kolhapur'].map((location) => (
                    <TouchableOpacity key={location} onPress={() => handleLocationSelect(location)}>
                      <Text style={styles.modalOption}>{location}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {offers.map((offer, index) => (
          <TouchableOpacity key={index} onPress={() => handleBoxPress(offer)} style={styles.boxContainer} onLayout={(event) => handleLayout(event, index)}>
            <View style={styles.imageContainer}>
              {offer.images.length > 0 ? (
                <Image
                  source={{ uri: `https://textcode.co.in/propertybazar/public/${offer.images[0]}` }}
                  style={styles.image}
                  resizeMode="contain"
                  onError={(e) => console.error('Error loading image:', e.nativeEvent.error)}
                />
              ) : (
                <View style={styles.noImageContainer}>
                  <Text style={{ color: 'black' }}>No Image Available</Text>
                </View>
              )}
              <View style={styles.textContainer}>
                {offer.name && <Text style={styles.name}>{offer.name}</Text>}
                <Text style={styles.locationText}>Location: {offer.location || 'N/A'}</Text>
                <Text style={styles.descriptionTitle}>Points:</Text>
                <Text style={styles.descriptionPoint}>{offer.description || 'No description available'}</Text>
                <View style={styles.rowContainer}>
                  <TouchableOpacity onPress={() => handleCallPress(offer.contact_number)}>
                    <Image
                      source={require('../../assets/call1.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleHeart(index)}>
                    <Image
                      source={heartPressed[index] ? require('../../assets/redheart.png') : require('../../assets/heart.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  container: {
    flexGrow: 1,
    backgroundColor: 'lightgray',
    padding: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    height: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
  },
  placeholder: {
    marginLeft: 10,
    marginRight: 130,
    color: 'black',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  filterIcon: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  icon: {
    width: 30,
    height: 27,
    marginHorizontal: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 180,
  },
  image: {
    flex: 1,
    height: '100%',
    width: undefined,
  },
  noImageContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 16,
    color: 'black',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  descriptionPoint: {
    fontSize: 14,
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  boxContainer: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default LatestOffers;
