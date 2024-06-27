import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thirdBoxY, setThirdBoxY] = useState(0);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [fabMenuVisible, setFabMenuVisible] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://textcode.co.in/propertybazar/public/api/getNews');
        const data = await response.json();
        console.log('hellodata>>>>>>>>>>>>>>>>>>>', data);
        setNews(data || []);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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
    navigation.navigate('N1');
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
      <ScrollView contentContainerStyle={styles.scrollViewContent} ref={scrollViewRef}>
        <View style={styles.container}>
          {news.map((item, index) => (
            <View key={index} style={styles.boxContainer} onLayout={(event) => handleLayout(event, index)}>
              <View style={styles.rowContainer}>
                {item.imageUrl ? (
                  <Image source={{ uri: item.imageUrl }} style={styles.smallImage} />
                ) : (
                  <Image source={require('../../assets/default.png')} style={styles.smallImage} />
                )}
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <Image source={require('../../assets/circle.jpg')} style={styles.logo} />
                <Text style={styles.dateText}>{item.date}</Text>
                <View style={styles.rowContainer1}>
                  <Image source={require('../../assets/circle.jpg')} style={styles.logo} />
                  <Text style={styles.commentText}>0 Comments</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  description: {
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
    color: '#fdd700',
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 16,
    color: '#fdd700',
    fontWeight: 'bold',
    marginLeft: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default News;
