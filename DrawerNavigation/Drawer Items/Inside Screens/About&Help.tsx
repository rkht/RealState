import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Component = props =>
    <View style={{
        width: scale(30),
        height: verticalScale(50),
        padding: moderateScale(5)
    }}/>;
const AboutAndHelp = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.title}>About & Help</Text>
        <Text style={styles.text}>
          Welcome to our Property Application! This application is designed to help you find the
          perfect property for your needs. Whether you're looking to rent, buy, or sell, our app has
          you covered.
        </Text>
        <Text style={styles.text}>
          Need assistance? Our help section provides answers to common questions and troubleshooting
          tips. If you can't find what you're looking for, don't hesitate to reach out to our support
          team for personalized assistance.
        </Text>
        <Text style={styles.text}>
          We're constantly working to improve our app and provide the best possible experience for our
          users. If you have any feedback or suggestions, we'd love to hear from you!
        </Text>
        <Text style={styles.text}>
          Thank you for choosing our Property Application. Happy house hunting!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: 370,
    alignSelf: 'center',
  },
});

export default AboutAndHelp;
