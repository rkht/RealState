import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Linking, ActivityIndicator, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Requirement = () => {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChatBot, setShowChatBot] = useState(false);
  const [fabMenuVisible, setFabMenuVisible] = useState(false);
  const [secondBoxY, setSecondBoxY] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation(); // Initialize useNavigation hook

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await fetch('https://textcode.co.in/propertybazar/public/api/getRequirements');
        const data = await response.json();
        console.log('Fetched Offers:', data);
        const updatedData = data.map((item) => {
          let imagesArray = [];
          try {
            imagesArray = JSON.parse(item.images);
          } catch (error) {
            console.error('Failed to parse images:', error);
          }
          return {
            ...item,
            image: imagesArray.length > 0 ? `https://textcode.co.in/propertybazar/public/${imagesArray[0]}` : '',
          };
        });

        // Filter out duplicates based on unique identifiers like 'id'
        const uniqueRequirements = [];
        updatedData.forEach(item => {
          if (!uniqueRequirements.some(uniqueItem => uniqueItem.id === item.id)) {
            uniqueRequirements.push(item);
          }
        });

        setRequirements(uniqueRequirements || []);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch requirements');
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, []);

  const handlePlusIconPress = () => {
    Alert.alert('Plus Icon Pressed', 'Plus icon pressed!', [{ text: 'OK', style: 'cancel' }]);
  };

  const handleWhatsAppPress = () => {
    Alert.alert('Chat Bot', 'This will open a chat bot screen.', [{ text: 'Cancel', style: 'cancel' }, { text: 'OK', onPress: () => setShowChatBot(true) }]);
  };

  const handleCallPress = async () => {
    try {
      await Linking.openURL('tel:1234567890');
    } catch (error) {
      console.error('Failed to open dial pad:', error);
    }
  };

  const handleDetailsPress = (details) => {
    Alert.alert('Details', details, [{ text: 'OK', style: 'cancel' }]);
  };

  const handleLayout = (event, index) => {
    if (index === 1) {
      setSecondBoxY(event.nativeEvent.layout.y);
    }
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
    navigation.navigate('Rq1');
  };

  const handleFilterPress = () => {
    navigation.navigate('Filter');
  };

  // Function to handle navigation to Rqdetails screen
  const handleBoxPress = () => {
    navigation.navigate('RqDetails'); // Navigate to 'Rqdetails' screen
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
      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <View style={styles.boxContainer1}>
              <View style={styles.searchBar}>
                <Text style={styles.placeholder}>Click Filter Icon to modify</Text>
                <TouchableOpacity style={styles.filterIcon} onPress={handleFilterPress}>
                  <Image source={require('../../assets/filter.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {requirements.map((requirement, index) => (
            <TouchableOpacity key={index} onPress={handleBoxPress}>
              <View style={styles.boxContainer} onLayout={(event) => handleLayout(event, index)}>
                <View style={styles.row}>
                  <View style={styles.imageContainer}>
                    {requirement.image ? (
                      <Image source={{ uri: requirement.image }} style={styles.image} resizeMode="contain" />
                    ) : (
                      <View style={styles.noImageContainer}>
                        <Text style={{ color: 'black' }}>No Image Available</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.subhead}>{requirement.location}</Text>
                    {requirement.type && <Text style={styles.sellInfo}> - {requirement.type}</Text>}
                    {requirement.category && <Text style={styles.sellInfo}> - {requirement.category}</Text>}
                    {requirement.price && <Text style={styles.sellInfo}> - ₹{requirement.price}</Text>}
                    {requirement.description && <Text style={styles.sellInfo}> - {requirement.description}</Text>}
                    {requirement.configuration && <Text style={styles.sellInfo}> - {requirement.configuration}</Text>}
                    {requirement.sqft && <Text style={styles.sellInfo}> - {requirement.sqft}</Text>}
                    {requirement.furnished_type && <Text style={styles.sellInfo}> - {requirement.furnished_type}</Text>}
                    {requirement.timeAgo && <Text style={styles.sellInfo}> - {requirement.timeAgo}</Text>}
                  </View>
                </View>
                <View style={styles.logoContainer}>
                  {requirement.logo ? (
                    <Image source={{ uri: requirement.logo }} style={styles.logo} resizeMode="contain" />
                  ) : (
                    <Image source={require('../../assets/user1.png')} style={styles.logo} resizeMode="contain" />
                  )}
                  <Text style={styles.name}>{requirement.agent}</Text>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleWhatsAppPress}>
                      <Image source={require('../../assets/chats.png')} style={styles.icon1} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCallPress}>
                      <Image source={require('../../assets/call1.png')} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab} onPress={toggleFabMenu}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
        {fabMenuVisible && (
          <View style={styles.fabOptionsContainer}>
            <TouchableOpacity style={styles.fabOption} onPress={() => handleSharePress(requirements[0])}>
              <Image source={require('../../assets/share.png')} style={styles.optionIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabOption} onPress={handleAddRequirementInventory}>
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightgray',
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    flex: 1,
    color: 'gray',
  },
  filterIcon: {
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  icon1: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
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
  subhead: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  sellInfo: {
    fontSize: 16,
    color: 'black',
  },
  detailsButton: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#282828',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 24,
    color: '#fdd700',
  },
  fabOptionsContainer: {
    position: 'absolute',
    bottom: 70,
    alignItems: 'center',
  },
  fabOption: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  optionIcon: {
    width: 30,
    height: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  boxContainer1: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 0,
  },
});

export default Requirement;
