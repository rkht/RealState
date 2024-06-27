import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, Share, ActivityIndicator } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const Component = props => (
    <View style={{
        width: scale(30),
        height: verticalScale(50),
        padding: moderateScale(5)
    }}/>
);

const HotLeads = () => {
  const navigation = useNavigation();
  const [thirdBoxY, setThirdBoxY] = useState(0);
  const scrollViewRef = useRef(null);
  const [fabMenuVisible, setFabMenuVisible] = useState(false);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('https://textcode.co.in/propertybazar/public/api/getDeals');
        const data = await response.json();
        console.log('Fetched Deals:', data);

        if (Array.isArray(data.deals)) {
          setDeals(data.deals);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching deals:', error);
        setError('Failed to load deals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleRentPress = () => {
    Alert.alert(
      'Rent Button Pressed',
      'Our team will contact you shortly.'
    );
  };

  const handleFilterPress = () => {
    Alert.alert(
      'Filter Icon Pressed',
      'You can modify the filter settings here.'
    );
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
    navigation.navigate('Hl1');
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

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} ref={scrollViewRef}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <Text style={styles.placeholder}>Click Filter icon to modify</Text>
              <TouchableOpacity style={styles.filterIcon} onPress={handleFilterPress}>
                <Image
                  source={require('../../assets/filter.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {deals.map((deal, index) => (
            <View key={index} style={styles.boxContainer} onLayout={(event) => handleLayout(event, index)}>
              <Text style={styles.text}>{deal.description}</Text>
              <View style={styles.row}>
                <Text style={styles.budgetText}>Budget:</Text>
                <Text style={styles.budgetAmount}>{`₹${deal.budget}`}</Text>
                <View style={[styles.rentButton1, { backgroundColor: '#ffe5b4' }]}>
                  <Text style={styles.rentButtonText1}>Already Claimed</Text>
                </View>
              </View>
              <Text style={styles.text1}>{deal.detailedDescription}</Text>
              <TouchableOpacity style={styles.rentButton} onPress={handleRentPress}>
                <Text style={styles.rentButtonText}>Rent</Text>
              </TouchableOpacity>
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
            <TouchableOpacity style={styles.fabOption} onPress={() => handleSharePress(deals[0])}>
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
    paddingBottom: 100, // To ensure scrolling to see all boxes
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 20,
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
  },
  placeholder: {
    flex: 1,
    color: 'gray',
  },
  filterIcon: {
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#353935',
  },
  text: {
    color: 'green',
    marginBottom: 10,
  },
  text1: {
    color: 'black',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  budgetText: {
    fontWeight: 'bold',
    marginRight: 5,
    color: 'black',
  },
  budgetAmount: {
    color: 'green',
    marginRight: 10,
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  rentButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rentButton1: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rentButtonText1: {
    color: 'brown',
    fontWeight: 'bold',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#282828',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default HotLeads;
