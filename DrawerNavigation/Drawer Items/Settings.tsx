import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Component = props =>
    <View style={{
        width: scale(30),
        height: verticalScale(50),
        padding: moderateScale(5)
    }}/>;
const Settings = ({ navigation }) => {
  const [requirementSwitch, setRequirementSwitch] = useState(false);
  const [inventorySwitch, setInventorySwitch] = useState(false);
  const [rentSwitch, setRentSwitch] = useState(false);
  const [buySwitch, setBuySwitch] = useState(false);
  const [sellSwitch, setSellSwitch] = useState(false);
  const [notificationSwitch, setNotificationSwitch] = useState(false);
  const [autoUpdateSwitch, setAutoUpdateSwitch] = useState(false);

  const navigateToTermsAndConditions = () => {
    navigation.navigate('Terms & Condition');
  };

  const navigateToAboutAndHelp = () => {
    navigation.navigate('About & Help');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          {/* Logo */}
          <Image source={require('../../assets/h.jpg')} style={styles.logo} />

          {/* Name */}
          <Text style={styles.name}>Harshal Sharma</Text>

          {/* Membership Number */}
          <Text style={styles.subheading}>Membership Number: TU090503</Text>
        </View>

        {/* Preference */}
        <View style={styles.preferenceBoxContainer}>
          <Text style={styles.preferenceHeading}>Preference</Text>

          {/* Requirement and Inventory in the same row */}
          <View style={styles.preferenceRow}>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Requirement</Text>
              <Switch
                value={requirementSwitch}
                onValueChange={(value) => setRequirementSwitch(value)}
              />
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Inventory</Text>
              <Switch
                value={inventorySwitch}
                onValueChange={(value) => setInventorySwitch(value)}
              />
            </View>
           
          </View>
          <View style={styles.horizontalLine}></View>

          {/* Subscription */}
          <Text style={styles.preferenceHeading}>Subscription</Text>
          <View style={styles.preferenceRow}>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Rent</Text>
              <Switch
                value={rentSwitch}
                onValueChange={(value) => setRentSwitch(value)}
              />
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Buy</Text>
              <Switch
                value={buySwitch}
                onValueChange={(value) => setBuySwitch(value)}
              />
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Sell</Text>
              <Switch
                value={sellSwitch}
                onValueChange={(value) => setSellSwitch(value)}
              />
            </View>
          </View>

          {/* Horizontal Line */}
          <View style={styles.horizontalLine}></View>

          {/* Notification Sound */}
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Notification Sound</Text>
            <Switch
              value={notificationSwitch}
              onValueChange={(value) => setNotificationSwitch(value)}
            />
          </View>
          <View style={styles.horizontalLine}></View>
          {/* App Auto Update */}
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>App Auto Update</Text>
            <Switch
              value={autoUpdateSwitch}
              onValueChange={(value) => setAutoUpdateSwitch(value)}
            />
          </View>
          <View style={styles.horizontalLine}></View>
          {/* Terms & Condition */}
          <TouchableOpacity style={styles.preferenceRow} onPress={navigateToTermsAndConditions}>
            <Text style={styles.preferenceLabel}>Terms & Conditions</Text>
            <Image source={require('../../assets/arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <View style={styles.horizontalLine}></View>
          {/* About & Help */}
          <TouchableOpacity style={styles.preferenceRow} onPress={navigateToAboutAndHelp}>
            <Text style={styles.preferenceLabel}>About & Help</Text>
            <Image source={require('../../assets/arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <View style={styles.horizontalLine}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: 370,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: 'black',
  },
  subheading: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'black',
  },
  preferenceBoxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: 370,
  },
  preferenceHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  preferenceItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferenceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  rightArrowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  arrowIcon: {
    width: 30,
    height: 30,
    // tintColor: 'black',
    marginRight:10
  },
});

export default Settings;
