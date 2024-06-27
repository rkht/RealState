import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Component = props =>
    <View style={{
        width: scale(30),
        height: verticalScale(50),
        padding: moderateScale(5)
    }}/>;
const RateUsScreen = ({ navigation }) => {
  const handleRate = () => {
    // Redirect to the Play Store for rating
    Linking.openURL('market://details?id=your_app_package_name');
  };

  const handleLater = () => {
    // Navigate to the home screen
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/star2.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.description}>
          Enjoying our app? Please take a moment to rate us on the Play Store.
        </Text>
        <TouchableOpacity style={styles.rateButton} onPress={handleRate}>
          <Text style={styles.buttonText}>Rate Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.laterButton} onPress={handleLater}>
          <Text style={styles.buttonText}>Remind Me Later</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 260,
    width: 370,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    color: 'black',
  },
  rateButton: {
    backgroundColor: '#28282B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  laterButton: {
    backgroundColor: '#28282B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RateUsScreen;
