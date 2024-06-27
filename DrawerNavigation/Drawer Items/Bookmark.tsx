import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Component = props =>
  <View style={{
    width: scale(30),
    height: verticalScale(50),
    padding: moderateScale(5)
  }}/>;

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [thirdBoxY, setThirdBoxY] = useState(0);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch('https://textcode.co.in/propertybazar/public/api/getBookmarks');
        const data = await response.json();
        setBookmarks(data.bookmarks || []);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch bookmarks');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleFABPress = () => {
    navigation.navigate('Add Bookmark');
  };

  const handleIconPress = () => {
    Alert.alert('Icon Pressed');
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
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {bookmarks.map((item, index) => (
          <View key={item.id} style={styles.boxContainer} onLayout={(event) => handleLayout(event, index)}>
            <View style={styles.rowContainer}>
              <Image source={{ uri: item.image }} style={styles.smallImageLeft} />
              <View style={styles.textContainer}>
                <Text style={styles.heading}>{item.heading}</Text>
                <TouchableOpacity onPress={handleIconPress}>
                  <Image source={require('../../assets/II.png')} style={styles.logo} />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                  <Image source={require('../../assets/circle.jpg')} style={styles.bullet} />
                  <Text style={styles.infoText}>For Sale</Text>
                  <Image source={require('../../assets/circle.jpg')} style={styles.bullet} />
                  <Text style={styles.infoText}>Residential</Text>
                  <Image source={require('../../assets/circle.jpg')} style={styles.bullet} />
                  <Text style={[styles.infoText, { color: 'green' }]}>₹{item.price}</Text>
                  <Image source={require('../../assets/circle.jpg')} style={styles.bullet} />
                  <Text style={styles.infoText}>{item.years_ago} years ago</Text>
                  <Image source={require('../../assets/circle.jpg')} style={styles.bullet} />
                  <Text style={styles.infoText}>{item.bhk} BHK</Text>
                  <Image source={require('../../assets/circle.jpg')} style={styles.bullet} />
                  <Text style={styles.infoText}>{item.size} sqft</Text>
                  <Image source={require('../../assets/circle.jpg')} style={styles.bullet} />
                  <Text style={styles.infoText}>{item.description}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={[styles.fabContainer, { top: thirdBoxY + 20 }]}>
        <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    position: 'relative',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    marginTop: -20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: -24,
    right: -5,
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: 370,
    height: 175,
    paddingHorizontal: 20,
    paddingVertical: 40,
    position: 'relative',
  },
  fabContainer: {
    position: 'absolute',
    right: 10,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#28282B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    fontSize: 30,
    color: '#fdd700',
  },
  smallImageLeft: {
    width: 90,
    height: 90,
    marginRight: 10,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    top: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 110,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  bullet: {
    width: 5,
    height: 5,
    marginRight: 5,
    tintColor: 'black',
    borderRadius: 50,
  },
  infoText: {
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
    color: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Bookmark;
