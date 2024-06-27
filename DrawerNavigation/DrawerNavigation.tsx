import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import Main from './Main';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Drawer = createDrawerNavigator();

const DrawerContent = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [membershipId, setMembershipId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserName = await AsyncStorage.getItem('userName');
      const storedMembershipId = await AsyncStorage.getItem('membership_id');
      if (storedUserName) {
        setUserName(storedUserName);
      }
      if (storedMembershipId) {
        setMembershipId(storedMembershipId);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await AsyncStorage.removeItem('isLoggedIn');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Select Role' }],
              })
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const navigateToScreen = (screenName) => {
    if (screenName === 'Home') {
      navigation.dispatch(
        CommonActions.navigate({
          name: 'TeamUP Broker Network', // Name of the stack navigator
          params: {
            screen: 'Home', // Screen name you want to navigate to
          },
        })
      );
    } else {
      navigation.navigate(screenName);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ backgroundColor: '#353935', flex: 1 }}>
        <View style={styles.boxcontainer}>
          <View style={styles.header}>
            <Image source={require('../assets/h.jpg')} style={styles.avatar} resizeMode="cover" />
            <View style={styles.userInfo}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{userName}</Text>
              <Text style={styles.membership} numberOfLines={1} ellipsizeMode="tail">Membership.No:</Text>
              <Text style={styles.membershipId} numberOfLines={1} ellipsizeMode="tail">{membershipId}</Text>
              <TouchableOpacity>
                <Text style={styles.viewProfile} onPress={() => navigateToScreen('View Profile')}>View Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
          </View>
        </View>
        <View>
          {[
            { title: 'Home', image: require('../assets/house.png') }, // Added 'Home' item
            { title: 'Latest Offers / Schemes', image: require('../assets/latest.png') },
            { title: 'Requirement / Inventory', image: require('../assets/check.png') },
            { title: 'Top Brokers Search', image: require('../assets/search1.png') },
            { title: 'Hot Leads', image: require('../assets/rupee.png') },
            { title: 'Home Loan Enquiry', image: require('../assets/homeloan.png') },
            { title: 'News', image: require('../assets/news.png') },
            { title: 'Events', image: require('../assets/event.png') },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.imageContainer} onPress={() => navigateToScreen(item.title)}>
              <Image source={item.image} style={[styles.homeImage, { tintColor: 'white' }]} />
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.line} />
          {[
            { title: 'My Requirement / Inventory', image: require('../assets/mail.png') },
            { title: 'My Lead', image: require('../assets/trend.png') },
            { title: 'Chat', image: require('../assets/chats.png') },
            { title: 'My Visits', image: require('../assets/team.png') },
            { title: 'Bookmarks', image: require('../assets/bookmark.png') },
            { title: 'Book A Cab', image: require('../assets/cab.png') }, // Added 'Book A Cab' item
            { title: 'Notifications', image: require('../assets/notification.png') },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.imageContainer} onPress={() => navigateToScreen(item.title)}>
              <Image source={item.image} style={[styles.homeImage, { tintColor: 'white' }]} />
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.line} />
          {[
            { title: 'Settings', image: require('../assets/setting.png') },
            { title: 'Rate Us', image: require('../assets/star.png') },
            { title: 'Feedback', image: require('../assets/feedback.png') },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.imageContainer} onPress={() => navigateToScreen(item.title)}>
              <Image source={item.image} style={[styles.homeImage, { tintColor: 'white' }]} />
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.imageContainer} onPress={handleLogout}>
            <Image source={require('../assets/logout.png')} style={[styles.homeImage, { tintColor: 'white' }]} />
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            {[
              require('../assets/fb.png'),
              require('../assets/twitter.png'),
              require('../assets/link.png'),
              require('../assets/insta.png')
            ].map((image, index) => (
              <TouchableOpacity key={index}>
                <Image source={image} style={styles.bottomImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={({ navigation }) => <DrawerContent navigation={navigation} />}>
      <Drawer.Screen
        name="TeamUP Broker Network"
        component={Main}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                TeamUP Broker Network
              </Text>
              <Image source={require('../assets/logo.png')} style={{ width: 30, height: 30, marginLeft: 70 }} resizeMode="contain" />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 0,
    marginLeft: -25,
  },
  userInfo: {
    marginLeft: 10,
    maxWidth: '70%', // Added max width to limit text overflow
  },
  name: {
    fontSize: 18, // Reduced font size
    fontWeight: 'bold',
    color: 'white',
  },
  membership: {
    fontSize: 14, // Reduced font size
    marginTop: 5,
    color: 'white',
  },
  membershipId: {
    fontSize: 14, // Reduced font size
    color: 'white',
  },
  viewProfile: {
    fontSize: 14,
    marginTop: 5,
    color: '#fdd700',
  },
  line: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 15,
  },
  boxcontainer: {
    width: '100%',
    backgroundColor: '#28282B',
    borderRadius: 0,
    padding: 20,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  homeImage: {
    width: 18,
    height: 18,
    marginRight: 5,
    marginLeft: -10,
    marginBottom: 5,
    marginTop: 5,
  },
  bottomImage: {
    width: 35,
    height: 35,
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
    marginTop: 5,
  },
});

export default DrawerNavigation;
