import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Component = props =>
    <View style={{
        width: scale(30),
        height: verticalScale(50),
        padding: moderateScale(5)
    }}/>;
const Feedback = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');

  const submitFeedback = () => {
    if (feedback.trim() === '') {
      // If feedback is empty, show alert
      Alert.alert(
        'Empty Feedback',
        'Please provide your feedback before submitting.',
        [{ text: 'OK', onPress: () => console.log('Alert closed') }],
        { cancelable: false }
      );
    } else {
      // Here you can handle the submission of feedback, such as sending it to a server or storing it locally
      console.log('Feedback submitted:', feedback);
      // Show alert with a good message
      Alert.alert(
        'Feedback Submitted ✅',
        'Thank you for your feedback!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the home screen
              navigation.navigate('Home');
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Your feedback..."
          value={feedback}
          onChangeText={setFeedback}
          placeholderTextColor={'black'}
        />
        <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
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
  input: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
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
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 350,
    width: 370,
  },
});

export default Feedback;
