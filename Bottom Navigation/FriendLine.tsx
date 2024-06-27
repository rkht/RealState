import React from 'react';
import { View, Text, TouchableOpacity, Linking, Image } from 'react-native';

const callIcon = require('../assets/call1.png'); // Replace with your call icon image
const chatIcon = require('../assets/chats.png'); // Replace with your chat icon image
const emailIcon = require('../assets/mail.png'); // Replace with your email icon image
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Component = props =>
    <View style={{
        width: scale(30),
        height: verticalScale(50),
        padding: moderateScale(5)
    }}/>;
const FriendLine = () => {
  const handleCallUs = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleChatWithUs = () => {
    Linking.openURL('whatsapp://send?phone=+1234567890');
  };

  const handleEmailUs = () => {
    Linking.openURL('mailto:customerservice@example.com');
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <TouchableOpacity onPress={handleCallUs} style={styles.button}>
          <Text style={styles.buttonText}>Call Us</Text>
          <Image source={callIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChatWithUs} style={styles.button}>
          <Text style={styles.buttonText}>Chat with Us</Text>
          <Image source={chatIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEmailUs} style={styles.button}>
          <Text style={styles.buttonText}>Email Us</Text>
          <Image source={emailIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  button: {
    backgroundColor: '#28282B',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',

  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    alignSelf:'center'
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '95%',
    height: 250,
    alignSelf: 'center',
    marginTop: 20,
  },
};

export default FriendLine;
