import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeLoanEnquiry = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {
    Alert.alert(
      'Enquiry submitted',
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nLoan Amount: ${loanAmount}\nLoan Term: ${loanTerm}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'), // Navigate to the home screen
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          placeholderTextColor=" #454545"
        />
        
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor=" #454545"
        />
        
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor=" #454545"
        />
        
        <Text style={styles.label}>Loan Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter desired loan amount"
          value={loanAmount}
          onChangeText={setLoanAmount}
          keyboardType="numeric"
          placeholderTextColor=" #454545"
        />
        
        <Text style={styles.label}>Loan Term (years):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter loan term in years"
          value={loanTerm}
          onChangeText={setLoanTerm}
          keyboardType="numeric"
          placeholderTextColor=" #454545"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Enquiry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 10,
    marginBottom: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#ffd700',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 16,
    marginBottom:60
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
});

export default HomeLoanEnquiry;
