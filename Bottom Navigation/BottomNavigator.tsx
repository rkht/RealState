import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';

import Home from './Home';
import FriendLine from './FriendLine';
import Chat from './Chat';
import Loan from './Loan';
import HotLead from './HotLead';
import SiteVisit from './SiteVisit';

const Bottom = createBottomTabNavigator();
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Component = (props) => (
  <View
    style={{
      width: scale(30),
      height: verticalScale(50),
      padding: moderateScale(5),
    }}
  />
);

const BottomNavigator = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Image
              source={require('../assets/home1.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: tabInfo.focused ? '#FFD700' : 'black',
              }}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Friend Line"
        component={FriendLine}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Image
              source={require('../assets/call.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: tabInfo.focused ? '#FFD700' : 'black',
              }}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Site Visit"
        component={SiteVisit}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Image
              source={require('../assets/Visits.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: tabInfo.focused ? '#FFD700' : 'black',
              }}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Image
              source={require('../assets/chats.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: tabInfo.focused ? '#FFD700' : 'black',
              }}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Loan"
        component={Loan}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Image
              source={require('../assets/loan.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: tabInfo.focused ? '#FFD700' : 'black',
              }}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Hot Lead"
        component={HotLead}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => (
            <Image
              source={require('../assets/rupee.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: tabInfo.focused ? '#FFD700' : 'black',
              }}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
