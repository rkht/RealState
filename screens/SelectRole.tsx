import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SelectRoleScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (role) => {
    console.log(`Navigating to Login as ${role}`);
    navigation.navigate('Login', { role });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/splash.png')} style={styles.logoImage} />
      </View>
      <Text style={styles.headerText}>I Am A</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Buyer')}>
        <Text style={styles.buttonText}>Buyer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Seller')}>
        <Text style={styles.buttonText}>Seller</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Owner')}>
        <Text style={styles.buttonText}>Owner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Agent/C.P Channel Partner')}>
        <Text style={styles.buttonText}>Agent/C.P Channel Partner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button1} onPress={() => handleNavigation('Builder')}>
        <Text style={styles.buttonText}>Builder</Text>
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
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#CD7F32',
    textShadowColor: '#E1C16E',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 20,
    letterSpacing: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    width: '92%',
    height: 45,
    backgroundColor: '#FFD700', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 10,
    marginBottom: 0,
  },
  button1: {
    width: '92%',
    height: 45,
    backgroundColor: '#FFD700', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SelectRoleScreen;
