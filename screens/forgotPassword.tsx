import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { s, vs, ms, mvs } from 'react-native-size-matters';

const Component = props =>
  <View style={{
      width: ms(30),
      height: mvs(50),
      padding: s(5)
  }}/>;

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleVerify = () => {
    // Handle verification logic here
    console.log('Verifying email:', email);
    
    // Show an alert for verification
    Alert.alert(
      'Verification',
      'Verification successful!',
      [
        { text: 'OK', onPress: () => {
          handleNewPasswordSet();
          navigateToLogin();
        }}
      ]
    );
  };

  const handleNewPasswordSet = () => {
    // Show an alert for new password set
    Alert.alert(
      'New Password Set',
      'Your new password has been successfully set!'
    );
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.heading}>Forgot Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email ID"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#888"
            placeholderTextColor={'black'}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30, // Increased font size for more emphasis
    fontWeight: 'bold',
    color: '#CD7F32', // Yellow color#E1C16E
    textShadowColor: '#E1C16E', // Orange shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 5, // Shadow radius
    marginBottom: 20,
    letterSpacing: 2,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    width: 350,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: 'black',
    alignSelf: 'center'
  },
  button: {
    width: 340,
    height: 40,
    backgroundColor: '#FFD700',  //FFD700
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
    marginBottom:20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    
  },
});

export default ForgotPasswordScreen;
