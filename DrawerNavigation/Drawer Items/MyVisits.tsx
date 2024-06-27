import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, Alert } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
const Component = props =>
  <View style={{
      width: scale(30),
      height: verticalScale(50),
      padding: moderateScale(5)
  }}/>;
const { height: screenHeight } = Dimensions.get('window');

const MyVisits = () => {
  const [selectedVisitType, setSelectedVisitType] = useState(null);

  const handleVisitTypeSelect = (visitType) => {
    setSelectedVisitType(visitType);
    switch (visitType) {
      case 'Visit':
        Alert.alert('Visits', 'Visits - 0');
        break;
      case 'Rewards':
        Alert.alert('Rewards', 'Rewards - 0');
        break;
      case 'Pending':
        Alert.alert('Pending', 'Pending - 0');
        break;
      default:
        break;
    }
  };

  const handleFabPress = () => {
    Alert.alert('FAB Pressed', 'You pressed the FAB!');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { minHeight: screenHeight }]}>
      {/* Bronze Level Heading */}
      <View style={[styles.boxContainer, { backgroundColor: '#28282B' }]}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.heading}>BRONZE LEVEL</Text>
      </View>

      {/* Subheadings */}
      <View style={styles.subheadingContainer}>
        <View style={[styles.boxContainer1, { backgroundColor: '#fdd700' }]}>
          <Image source={require('../../assets/Visits.png')} style={styles.subheadingIcon} />
          <TouchableOpacity
            style={[
              styles.subheading,
              selectedVisitType === 'Visit' && styles.selectedSubheading,
            ]}
            onPress={() => handleVisitTypeSelect('Visit')}
          >
            <Text style={styles.subheadingText}>Visits</Text>
          </TouchableOpacity>
          <Image source={require('../../assets/0.jpeg')} style={styles.extraImage} />
        </View>
        <View style={[styles.boxContainer1, { backgroundColor: '#fdd700' }]}>
          <Image source={require('../../assets/rewards.png')} style={[styles.subheadingIcon,{marginLeft:-10}]} />
          <TouchableOpacity
            style={[
              styles.subheading,
              selectedVisitType === 'Rewards' && styles.selectedSubheading,
            ]}
            onPress={() => handleVisitTypeSelect('Rewards')}
          >
            <Text style={styles.subheadingText}>Rewards</Text>
          </TouchableOpacity>
          <Image source={require('../../assets/0.jpeg')} style={styles.extraImage} />
        </View>
        <View style={[styles.boxContainer1, { backgroundColor: '#fdd700' }]}>
          <Image source={require('../../assets/pending.png')} style={styles.subheadingIcon} />
          <TouchableOpacity
            style={[
              styles.subheading,
              selectedVisitType === 'Pending' && styles.selectedSubheading,
            ]}
            onPress={() => handleVisitTypeSelect('Pending')}
          >
            <Text style={styles.subheadingText}>Pending</Text>
          </TouchableOpacity>
          <Image source={require('../../assets/0.jpeg')} style={styles.extraImage} />
        </View>
      </View>

      {/* CP visit and Client visit */}
      <View style={styles.additionalVisitTypesContainer}>
        <View style={styles.boxContainer2}>
          <TouchableOpacity
            style={[
              styles.additionalVisitType,
              selectedVisitType === 'CP Visit' && styles.selectedAdditionalVisitType,
            ]}
            onPress={() => handleVisitTypeSelect('CP Visit')}
          >
            <Text style={styles.additionalVisitTypeText}>CP Visit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.additionalVisitType,
              selectedVisitType === 'Client Visit' && styles.selectedAdditionalVisitType,
            ]}
            onPress={() => handleVisitTypeSelect('Client Visit')}
          >
            <Text style={styles.additionalVisitTypeText}>Client Visit</Text>
          </TouchableOpacity>
        </View>
        {/* Render image and text */}
        <View style={styles.imageContainer}>
          {selectedVisitType === 'CP Visit' && (
            <View style={styles.imageTextContainer}>
              {/* <Text style={styles.additionalVisitTypeText}>CP Visit</Text> */}
              <Image source={require('../../assets/noresult.jpeg')} style={styles.bigImage} />
              <Text style={styles.noResultText}>Kindly visit soon for latest offers & project updates and get Free Verified Leads!</Text>
            </View>
          )}
          {selectedVisitType === 'Client Visit' && (
            <View style={styles.imageTextContainer}>
              {/* <Text style={styles.additionalVisitTypeText}>Client Visit</Text> */}
              <Image source={require('../../assets/noresult.jpeg')} style={styles.bigImage} />
              <Text style={styles.noResultText}>Kindly visit soon for latest offers & project updates and get Free Verified Leads</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#fdd700',
    alignSelf: 'center',
  },
  subheadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: moderateScale(20),
  },
  additionalVisitTypesContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '80%',
    marginTop: moderateScale(20),
  },
  boxContainer: {
    borderRadius: 10,
    padding: 10,
    marginTop:10,
    paddingHorizontal: 90,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxContainer1: {
    // borderRadius: 10,
    padding: 10,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginLeft:-40,
    marginRight:-45,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  subheadingText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
  },
  subheadingIcon: {
    width: 20,
    height: 20,
    marginRight: 0,
  },
  extraImage: {
    width: 20,
    height: 20,
    marginLeft: 0,
    borderRadius:50
  },
  additionalVisitType: {
    backgroundColor: '#7f8274',
    borderRadius: 25,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  additionalVisitTypeText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  selectedAdditionalVisitType: {
    backgroundColor: '#fdd700', // Change to whatever color you want for selected state
  },
  boxContainer2: {
    // borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: -10,
    flexDirection: 'row',
    alignItems: 'center',
    width: 340,
    marginLeft:0,
    marginRight:0,
    alignSelf:'center'
  },
  bigImage: {
    width: 320,
    height: 320, // Adjust the height as needed
    marginTop: 0,
    alignSelf:'center'
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageTextContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noResultText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    color:'black',
    textAlign:'center'
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom:10,
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

export default MyVisits;
