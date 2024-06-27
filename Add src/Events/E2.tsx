import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Autocomplete from 'react-native-autocomplete-input';

const cities = [
  "Agra", "Ahemad Nagar", "Ahemdabad", "Aurangabad", "Bengluru", "Bhopal", "Chennai", "Chhastisgarh",
  "Chittor", "Delhi", "Ghaziabad", "Goa", "Gujrat", "Guntur", "Gurugram", "Haryana", "Hydrabad",
  "Indore", "Jaipur", "Jamshedpur", "Jhasi", "Kanpur", "Kolhapur", "Kolkata", "London", "Madhya Pradesh",
  "Mangalore", "Mumbai", "Nagpur", "Nasik", "Noida", "Odisha", "Patna", "Pune", "Rajesthan", "Sagali",
  "Satara", "Shirdi", "Surat", "Tamil Nadu", "Tirupati", "Uttarakhand", "Vadrodra", "Varanasi",
  "Vishakhapatnam", "West Bengal"
];

const zones = ["ALL", "Central Zone", "Western Zone", "East Zone", "South Zone"];

const residentialConfigurations = [
  { label: 'Select', value: null },
  { label: 'Studio/1RK', value: 'studio_1rk' },
  { label: '1BHK', value: '1bhk' },
  { label: '1.5 BHK', value: '1_5bhk' },
  { label: '2 BHK', value: '2bhk' },
  { label: '2.5 BHK', value: '2_5bhk' },
  { label: '3 BHK', value: '3bhk' },
  { label: '3.5 BHK', value: '3_5bhk' },
  { label: '4 BHK', value: '4bhk' },
  { label: '5 BHK', value: '5bhk' },
  { label: '6 BHK', value: '6bhk' },
  { label: '7 BHK', value: '7bhk' },
  { label: '8 BHK', value: '8bhk' },
  { label: 'Independent House', value: 'independent_house' },
  { label: 'Villa', value: 'villa' },
  { label: 'Penthouse', value: 'penthouse' },
  { label: 'Bunglow', value: 'bunglow' },
  { label: 'PG', value: 'pg' },
];

const E2 = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [zone, setZone] = useState('');
  const [location, setLocation] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [price, setPrice] = useState('');
  const [configuration, setConfiguration] = useState('');
  const [furnishedType, setFurnishedType] = useState('');
  const [sqft, setSqft] = useState('');
  const [description, setDescription] = useState('');

  const handleLocationChange = (text) => {
    const filtered = cities.filter(city => city.toLowerCase().includes(text.toLowerCase()));
    setFilteredLocations(filtered);
    setLocation(text);
  };

  const handleLocationSelect = (location) => {
    setLocation(location);
    setFilteredLocations([]);
  };

  const handleSave = () => {
    if (!city || !zone || !location || !price || !configuration || !furnishedType || !sqft || !description) {
      Alert.alert('Error', 'Please fill all fields.');
    } else {
      navigation.navigate('Next3');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>City</Text>
        <Picker
          selectedValue={city}
          style={styles.input}
          onValueChange={(itemValue) => setCity(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          {cities.map((city, index) => (
            <Picker.Item label={city} value={city} key={index} />
          ))}
        </Picker>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Zone</Text>
        <Picker
          selectedValue={zone}
          style={styles.input}
          onValueChange={(itemValue) => setZone(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          {zones.map((zone, index) => (
            <Picker.Item label={zone} value={zone} key={index} />
          ))}
        </Picker>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Location</Text>
        <Autocomplete
          data={filteredLocations}
          defaultValue={location}
          onChangeText={handleLocationChange}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleLocationSelect(item)}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
          containerStyle={styles.autocompleteContainer}
          inputContainerStyle={styles.autocompleteInputContainer}
          listStyle={styles.listStyle}
        />
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Configuration</Text>
        <Picker
          selectedValue={configuration}
          style={styles.input}
          onValueChange={(itemValue) => setConfiguration(itemValue)}
        >
          {residentialConfigurations.map((config, index) => (
            <Picker.Item label={config.label} value={config.value} key={index} />
          ))}
        </Picker>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Furnished Type</Text>
        <Picker
          selectedValue={furnishedType}
          style={styles.input}
          onValueChange={(itemValue) => setFurnishedType(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Furnished" value="furnished" />
          <Picker.Item label="Semi Furnished" value="semi_furnished" />
          <Picker.Item label="Unfurnished" value="unfurnished" />
        </Picker>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Sqft</Text>
        <Picker
          selectedValue={sqft}
          style={styles.input}
          onValueChange={(itemValue) => setSqft(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="0-500 sqft" value="0-500" />
          <Picker.Item label="501-1000 sqft" value="501-1000" />
          <Picker.Item label="1001-2000 sqft" value="1001-2000" />
          <Picker.Item label="2001-5000 sqft" value="2001-5000" />
          <Picker.Item label="5001 & above" value="5001_above" />
        </Picker>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Listing Details"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Next (2/3)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'lightgray',
  },
  label: {
    marginBottom: 8,
    color: '#333',
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#fdd700',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  autocompleteContainer: {
    marginBottom: 16,
  },
  autocompleteInputContainer: {
    borderWidth: 0,
  },
  listStyle: {
    maxHeight: 200,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
});

export default E2;