import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { role } = route.params;

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Enter your email and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://textcode.co.in/propertybazar/public/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login Response:', data); // Log the response for debugging

      if (response.ok) {
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('isLoggedIn', 'true');

        if (data.data && data.data.id && data.data.membership_id) {
          await AsyncStorage.setItem('userId', data.data.id.toString()); // Store userId in AsyncStorage
          await AsyncStorage.setItem('membership_id', data.data.membership_id.toString()); // Store membership_id in AsyncStorage
          navigation.navigate("Home");
          Alert.alert('Welcome!', 'Welcome to Property Bazar');
        } else {
          Alert.alert('Error', 'User ID or Membership ID not found in the response.');
        }
      } else if (data.message === 'Incorrect email or password') {
        Alert.alert('Error', 'Incorrect email or password');
      } else if (data.message === 'Email is not registered') {
        Alert.alert('Error', 'Email is not registered');
      } else {
        Alert.alert('Error', data.message || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Sign Up', { role });
  };

  const handleForgotPassword = () => {
    navigation.navigate('Forgot Password');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/splash.png')} style={styles.logoImage} />
        <Text style={styles.logoText}>Property Bazar</Text>
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/user.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          placeholderTextColor={'black'}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/password.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={'black'}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
          <Image
            source={isPasswordVisible ? require('../assets/eyeOff.png') : require('../assets/eyeOn.png')}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign in</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 350,
    height: 350,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  logoText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#CD7F32',
    textShadowColor: '#E1C16E',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 20,
    letterSpacing: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    color: 'black',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    color: 'black'
  },
  button: {
    width: '92%',
    height: 40,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
    marginLeft: 20,
  },
  signUpText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 40,
    marginLeft: 20,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
});

export default LoginScreen;
