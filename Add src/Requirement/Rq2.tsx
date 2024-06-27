import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Autocomplete from 'react-native-autocomplete-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cities = [
  "Agra", "Ahemad Nagar", "Ahemdabad", "Aurangabad", "Bengluru", "Bhopal", "Chennai", "Chhastisgarh",
  "Chittor", "Delhi", "Ghaziabad", "Goa", "Gujrat", "Guntur", "Gurugram", "Haryana", "Hydrabad",
  "Indore", "Jaipur", "Jamshedpur", "Jhasi", "Kanpur", "Kolhapur", "Kolkata", "London", "Madhya Pradesh",
  "Mangalore", "Mumbai", "Nagpur", "Nasik", "Noida", "Odisha", "Patna", "Pune", "Rajesthan", "Sagali",
  "Satara", "Shirdi", "Surat", "Tamil Nadu", "Tirupati", "Uttarakhand", "Vadrodra", "Varanasi",
  "Vishakhapatnam", "West Bengal"
];

const zones = ["ALL", "Central Zone", "Western Zone", "East Zone", "South Zone"];

const configurations = {
  Residential: [
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
  ],
  Commercial: [
    { label: 'Select', value: null },
    { label: 'Office', value: 'office' },
    { label: 'Shop', value: 'shop' },
    { label: 'Retail', value: 'retail' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Restaurant/Cafe', value: 'restaurant_cafe' },
  ],
  Industrial: [
    { label: 'Select', value: null },
    { label: 'Gala', value: 'gala' },
    { label: 'Godown', value: 'godown' },
    { label: 'Warehouse', value: 'warehouse' },
    { label: 'Shed', value: 'shed' },
  ],
  'Second Home': [
    { label: 'Select', value: null },
    { label: 'Villa', value: 'villa' },
    { label: 'Apartment', value: 'apartment' },
    { label: 'Bunglow', value: 'bunglow' },
  ],
  'Guest House': [
    { label: 'Select', value: null },
    { label: '1 RK', value: '1rk' },
    { label: '1 BHK', value: '1bhk' },
    { label: '2 BHK', value: '2bhk' },
    { label: 'Sharing', value: 'sharing' },
  ],
  'Land / Plots': [
    { label: 'Select', value: null },
    { label: 'Open Land', value: 'open_land' },
    { label: 'Plot', value: 'plot' },
    { label: 'Farm House', value: 'farm_house' },
  ],
};

const Rq2 = ({ navigation, route }) => {
  const { selectedOption } = route.params;
  const [city, setCity] = useState('');
  const [zone, setZone] = useState('');
  const [location, setLocation] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [price, setPrice] = useState('');
  const [configuration, setConfiguration] = useState('');
  const [furnishedType, setFurnishedType] = useState('');
  const [sqft, setSqft] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
    };

    fetchUserId();
  }, []);

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
    } else if (configuration === null) {
      Alert.alert('Error', 'Please select a configuration.');
    } else {
      navigation.navigate('Rq3', {
        selectedOption,
        formData: {
          userId,
          city,
          zone,
          location,
          price,
          configuration,
          furnishedType,
          sqft,
          description
        }
      });
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
          {configurations[selectedOption.propertyType].map((config, index) => (
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
          <Picker.Item label="Semi-furnished" value="semi_furnished" />
          <Picker.Item label="Unfurnished" value="unfurnished" />
        </Picker>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Area (sqft)</Text>
        <Picker
          selectedValue={sqft}
          style={styles.input}
          onValueChange={(itemValue) => setSqft(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="0-500 sqft" value="0-500 sqft" />
          <Picker.Item label="500-1000 sqft" value="500-1000 sqft" />
          <Picker.Item label="1001-2000 sqft" value="1001-2000 sqft" />
          <Picker.Item label="2001-5000 sqft" value="2001-5000 sqft" />
          <Picker.Item label="5000 & Above" value="5000 & Above" />
        </Picker>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.textInput, { height: 100 }]}
          placeholder="Enter Description"
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
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  boxContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    backgroundColor: '#e9ecef',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#495057',
  },
  textInput: {
    backgroundColor: '#e9ecef',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#495057',
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    borderRadius: 5,
  },
  autocompleteInputContainer: {
    backgroundColor: '#e9ecef',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
  },
  itemText: {
    padding: 10,
    fontSize: 16,
    color: '#495057',
  },
  listStyle: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#fdd700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Rq2;
