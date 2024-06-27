import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Component = props =>
    <View style={{
        width: scale(30),
        height: verticalScale(50),
        padding: moderateScale(5)
    }}/>;
const Loan = () => {
  const handleAddClient = () => {
    Alert.alert('Add Client', 'Do you want to add a client?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => console.log('Client added'),
      },
    ]);
  };

  const handleFabPress = () => {
    Alert.alert('FAB Pressed', 'You pressed the FAB!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Image */}
        <Image
          source={require('../assets/LoanBG.jpg')}
          style={styles.image}
        />
        
        {/* Heading */}
        <View style={styles.boxContainer}>
          <Text style={styles.heading}>Get a quick loan for your client</Text>
          
          {/* Bullets */}
          <View style={styles.bulletContainer}>
            <View style={styles.bullet}>
              <Image source={require('../assets/circle.jpg')} style={styles.logo} />
              <Text style={styles.bulletText}>Add client Name and Mobile Number</Text>
            </View>
            <View style={styles.bullet}>
              <Image source={require('../assets/circle.jpg')} style={styles.logo} />
              <Text style={styles.bulletText}>Auto-Generated SMS approval goes to Client for verification</Text>
            </View>
            <View style={styles.bullet}>
              <Image source={require('../assets/circle.jpg')} style={styles.logo} />
              <Text style={styles.bulletText}>Client approves the SMS verification</Text>
            </View>
            <View style={styles.bullet}>
              <Image source={require('../assets/circle.jpg')} style={styles.logo} />
              <Text style={styles.bulletText}>Client onboarded at TU Home Loans</Text>
            </View>
            <View style={styles.bullet}>
              <Image source={require('../assets/circle.jpg')} style={styles.logo} />
              <Text style={styles.bulletText}>Loan Processed with multiple banks for best deal</Text>
            </View>
            <View style={styles.bullet}>
              <Image source={require('../assets/circle.jpg')} style={styles.logo} />
              <Text style={styles.bulletText}>Sit back and relax</Text>
            </View>
            <View style={styles.bullet}>
              <Image source={require('../assets/circle.jpg')} style={styles.logo} />
              <Text style={styles.bulletText}>Earn Additional Commission on Disbursed loan amount *</Text>
            </View>
            <View style={styles.bullet}>
              <Image source={require('../assets/circle.jpg')} style={styles.logo} />
              <Text style={styles.bulletText}>The client gets Exciting Cashback on the Disbursed loan amount *</Text>
            </View>
          </View>
        </View>
        
        {/* Add Client Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddClient}>
          <Text style={styles.addButtonText}>Add Client</Text>
          <Image
            source={require('../assets/plus1.png')}
            style={styles.plusIcon}
          />
        </TouchableOpacity>

        {/* FAB */}
        <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 380,
    height: 200,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  bulletContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletText: {
    color: 'black',
    marginLeft: 10,
  },
  logo: {
    width: 10,
    height: 10,
    marginRight: 0,
    tintColor:'#ffd700',
    borderRadius:50,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffd700',
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 20,
    marginTop:10,
    marginBottom:20,

  },
  addButtonText: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 10,
    fontSize:15
  },
  plusIcon: {
    width: 20,
    height: 20,
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom:90,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#28282B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    fontSize: 30,
    color: '#fdd700',
  },
});

export default Loan;
