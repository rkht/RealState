import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, Linking, ScrollView, ActivityIndicator, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TopBrokerSearch = () => {
  const navigation = useNavigation();
  const [brokerName, setBrokerName] = useState('');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [location, setLocation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thirdBoxY, setThirdBoxY] = useState(0);
  const scrollViewRef = useRef(null);
  const [fabMenuVisible, setFabMenuVisible] = useState(false);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const response = await fetch('https://textcode.co.in/propertybazar/public/api/getBrokers');
        const data = await response.json();
        console.log('hellodata>>>>>>>>>>>>>>>>>>>', data);
        setBrokers(data || []);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch brokers');
      } finally {
        setLoading(false);
      }
    };

    fetchBrokers();
  }, []);

  const handleSearchPress = () => {
    const filteredBrokers = brokers.filter(broker => {
      return (
        broker.broker_name.toLowerCase().includes(brokerName.toLowerCase()) &&
        broker.membership_id.toLowerCase().includes(membershipNumber.toLowerCase()) &&
        broker.location.toLowerCase().includes(location.toLowerCase()) &&
        broker.contact_number.includes(mobileNumber)
      );
    });

    if (filteredBrokers.length > 0) {
      Alert.alert('Search Results', JSON.stringify(filteredBrokers));
    } else {
      Alert.alert('Search Results', 'No brokers found.');
    }
  };

  const handleMailPress = () => {
    Linking.openURL('mailto:example@example.com');
  };

  const handleCallPress = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const addBroker = (broker) => {
    setBrokers([...brokers, broker]);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      addBroker: (broker) => addBroker(broker),
    });
  }, [navigation]);

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
    navigation.navigate('Tb1');
  };

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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} ref={scrollViewRef}>
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            <TextInput
              style={styles.input}
              placeholder="Broker Name"
              value={brokerName}
              onChangeText={setBrokerName}
              placeholderTextColor={'black'}
            />
            <TextInput
              style={styles.input}
              placeholder="Membership Number"
              value={membershipNumber}
              onChangeText={setMembershipNumber}
              placeholderTextColor={'black'}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor={'black'}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              keyboardType="numeric"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              placeholderTextColor={'black'}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          {brokers.map((broker, index) => (
            <View key={index} style={styles.boxContainer} onLayout={(event) => handleLayout(event, index)}>
              <View style={styles.brokerDetails}>
                <Image source={require('../../assets/a.png')} style={styles.logo} />
                <View style={styles.detailsContainer}>
                  <Text style={styles.name}>{broker.broker_name}</Text>
                  <Text style={styles.membership}>{broker.membership_id}</Text>
                  <Text style={styles.area}>Area: {broker.location}</Text>
                  <Text style={styles.dealsIn}>Deals In: {broker.deals_description}</Text>
                  <View style={styles.contactContainer}>
                    <TouchableOpacity onPress={handleMailPress}>
                      <Image source={require('../../assets/mail.png')} style={styles.mailIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCallPress(broker.contact_number)}>
                      <Image source={require('../../assets/call1.png')} style={styles.phoneIcon} />
                    </TouchableOpacity>
                  </View>
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
            <TouchableOpacity style={styles.fabOption} onPress={() => handleSharePress(brokers[0])}>
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
  scrollViewContent: {
    flexGrow: 1,
  },
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 7,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  brokerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  membership: {
    fontSize: 14,
    color: 'gray',
  },
  area: {
    fontSize: 14,
    color: 'gray',
  },
  dealsIn: {
    fontSize: 14,
    color: 'gray',
  },
  contactContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  mailIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  phoneIcon: {
    width: 20,
    height: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
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
  },
  optionIcon: {
    width: 23,
    height: 23,
    tintColor: '#fdd700',
  },
});

export default TopBrokerSearch;
