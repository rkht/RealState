// LO1.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';

const LO1 = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState({
    listType: '',
    serviceType: '',
    propertyType: ''
  });

  const handleSelection = (category, option) => {
    const updatedSelection = { ...selectedOption, [category]: option };
    setSelectedOption(updatedSelection);
    console.log('Updated Selection:', updatedSelection);
  };

  const handleNextPress = () => {
    if (!selectedOption.listType || !selectedOption.serviceType || !selectedOption.propertyType) {
      Alert.alert("Selection Incomplete", "Please select options for all categories before proceeding.");
    } else {
      navigation.navigate('LO2', { selectedOption });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <View style={styles.boxContainer}>
          <Text style={styles.sectionTitle}>I Want To List</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.iconContainer, selectedOption.listType === 'Requirement' && styles.selectedContainer]}
              onPress={() => handleSelection('listType', 'Requirement')}
            >
              <Image source={require('../../assets/require.png')} style={styles.icon} />
              <Text style={styles.iconText}>Requirement</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconContainer, selectedOption.listType === 'Inventory' && styles.selectedContainer]}
              onPress={() => handleSelection('listType', 'Inventory')}
            >
              <Image source={require('../../assets/others.png')} style={styles.icon} />
              <Text style={styles.iconText}>Inventory</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.boxContainer}>
          <Text style={styles.sectionTitle}>Service Type</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.iconContainer, selectedOption.serviceType === 'Buy' && styles.selectedContainer]}
              onPress={() => handleSelection('serviceType', 'Buy')}
            >
              <Image source={require('../../assets/buy.png')} style={styles.icon} />
              <Text style={styles.iconText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconContainer, selectedOption.serviceType === 'Rent' && styles.selectedContainer]}
              onPress={() => handleSelection('serviceType', 'Rent')}
            >
              <Image source={require('../../assets/rent.png')} style={styles.icon} />
              <Text style={styles.iconText}>Rent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconContainer, selectedOption.serviceType === 'Sell' && styles.selectedContainer]}
              onPress={() => handleSelection('serviceType', 'Sell')}
            >
              <Image source={require('../../assets/sale.png')} style={styles.icon} />
              <Text style={styles.iconText}>Sell</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.boxContainer}>
          <Text style={styles.sectionTitle}>Property Type</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.iconContainer, selectedOption.propertyType === 'Residential' && styles.selectedContainer]}
              onPress={() => handleSelection('propertyType', 'Residential')}
            >
              <Image source={require('../../assets/residential.png')} style={styles.icon} />
              <Text style={styles.iconText}>Residential</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconContainer, selectedOption.propertyType === 'Commercial' && styles.selectedContainer]}
              onPress={() => handleSelection('propertyType', 'Commercial')}
            >
              <Image source={require('../../assets/hotel.png')} style={styles.icon} />
              <Text style={styles.iconText}>Commercial</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconContainer, selectedOption.propertyType === 'Industrial' && styles.selectedContainer]}
              onPress={() => handleSelection('propertyType', 'Industrial')}
            >
              <Image source={require('../../assets/industrial.png')} style={styles.icon} />
              <Text style={styles.iconText}>Industrial</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.iconContainer, selectedOption.propertyType === 'Second Home' && styles.selectedContainer]}
              onPress={() => handleSelection('propertyType', 'Second Home')}
            >
              <Image source={require('../../assets/Secondhome.png')} style={styles.icon} />
              <Text style={styles.iconText}>Second Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconContainer, selectedOption.propertyType === 'Guest House' && styles.selectedContainer]}
              onPress={() => handleSelection('propertyType', 'Guest House')}
            >
              <Image source={require('../../assets/guesthouse.png')} style={styles.icon} />
              <Text style={styles.iconText}>Guest House</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconContainer, selectedOption.propertyType === 'Land / Plots' && styles.selectedContainer]}
              onPress={() => handleSelection('propertyType', 'Land / Plots')}
            >
              <Image source={require('../../assets/land.png')} style={styles.icon} />
              <Text style={styles.iconText}>Land / Plots</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Text style={styles.nextButtonText}>Next (1/3)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'lightgray',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 14,
    color: 'gray'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
    width: 80,
    marginBottom: 3,
    padding: 10,
    borderRadius: 10,
  },
  selectedContainer: {
    backgroundColor: '#FFD700',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 10,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
});

export default LO1;
