import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Picker } from '@react-native-picker/picker';

const FilterScreen = ({ navigation }) => {
  const [zone, setZone] = useState(null);
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [commercialSubcategory, setCommercialSubcategory] = useState(null);
  const [residentialConfiguration, setResidentialConfiguration] = useState(null);
  const [othersConfiguration, setOthersConfiguration] = useState(null);

  const zones = [
    { label: 'Select', value: '1' },
    { label: 'All Mumbai', value: '2' },
    { label: 'Central Zone', value: '3' },
    { label: 'Mumbai Harbour Zone', value: '4' },
    { label: 'Navi Mumbai', value: '5' },
    { label: 'Western zone', value: '6' },
  ];

  const statuses = [
    { label: 'Select', value: null },
    { label: 'Ready to Move', value: 'ready_to_move' },
    { label: 'Under Construction', value: 'under_construction' },
    { label: 'Ready Possession', value: 'ready_possession' },
    { label: 'Ready Possession OC', value: 'ready_possession_oc' },
    { label: 'Pre-Launch', value: 'pre_launch' },
    { label: 'New Launched', value: 'new_launched' },
  ];

  const commercialSubcategories = [
    { label: 'Select', value: null },
    { label: 'Shop', value: 'shop' },
    { label: 'Office', value: 'office' },
    { label: 'Warehouse', value: 'warehouse' },
    { label: 'Hotel Unit', value: 'hotel_unit' },
    { label: 'Godown', value: 'godown' },
    { label: 'Gala', value: 'gala' },
    { label: 'Retail', value: 'retail' },
  ];

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

  const othersConfigurations = [
    { label: 'Select', value: null },
    { label: 'Land', value: 'land' },
    { label: 'Plot', value: 'plot' },
    { label: 'Farm House', value: 'farm_house' },
  ];

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setCommercialSubcategory(null);
      setResidentialConfiguration(null);
      setOthersConfiguration(null);
    } else {
      setSelectedCategory(category);
      if (category === 'commercial') {
        setCommercialSubcategory(null);
      } else if (category === 'residential') {
        setResidentialConfiguration(null);
      } else if (category === 'others') {
        setOthersConfiguration(null);
      }
    }
  };

  const handleClear = () => {
    setZone(null);
    setLocation('');
    setStatus(null);
    setSelectedCategory(null);
    setCommercialSubcategory(null);
    setResidentialConfiguration(null);
    setOthersConfiguration(null);
  };

  const handleApplyFilter = () => {
    navigation.navigate('Latest Offers / Schemes');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={[styles.header, { color: 'black' }]}>Choose & Apply Filter to refine results.</Text>
      </View>
      <View style={styles.boxContainer}>
        <View style={styles.categoryContainer}>
          <TouchableOpacity 
            style={[styles.categoryButton, selectedCategory === 'residential' && styles.selectedCategory]}
            onPress={() => handleCategorySelect('residential')}
          >
            <View style={[styles.imageContainer, selectedCategory === 'residential' && styles.selectedCategoryImageContainer]}>
              <Image source={require('../../../assets/residential.png')} style={styles.categoryImage} />
            </View>
            <Text style={[styles.categoryText, { color: 'black' }]}>Residential</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.categoryButton, selectedCategory === 'commercial' && styles.selectedCategory]}
            onPress={() => handleCategorySelect('commercial')}
          >
            <View style={[styles.imageContainer, selectedCategory === 'commercial' && styles.selectedCategoryImageContainer]}>
              <Image source={require('../../../assets/commercial.png')} style={styles.categoryImage} />
            </View>
            <Text style={[styles.categoryText, { color: 'black' }]}>Commercial</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.categoryButton, selectedCategory === 'others' && styles.selectedCategory]}
            onPress={() => handleCategorySelect('others')}
          >
            <View style={[styles.imageContainer, selectedCategory === 'others' && styles.selectedCategoryImageContainer]}>
              <Image source={require('../../../assets/others.png')} style={styles.categoryImage} />
            </View>
            <Text style={[styles.categoryText, { color: 'black' }]}>Others</Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedCategory === 'commercial' && (
        <View style={styles.boxContainer}>
          <Dropdown
            style={styles.dropdown}
            data={commercialSubcategories}
            labelField="label"
            valueField="value"
            placeholder="Select Commercial Subcategory"
            value={commercialSubcategory}
            onChange={item => setCommercialSubcategory(item.value)}
            renderItem={(item) => (
              <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </View>
            )}
          />
        </View>
      )}
      {selectedCategory === 'residential' && (
        <View style={styles.boxContainer}>
          <Dropdown
            style={styles.dropdown}
            data={residentialConfigurations}
            labelField="label"
            valueField="value"
            placeholder="Select Configuration"
            value={residentialConfiguration}
            onChange={item => setResidentialConfiguration(item.value)}
            renderItem={(item) => (
              <View style={styles.dropdownItem}>
                <Text style={[styles.dropdownItemText, { color: 'black' }]}>{item.label}</Text>
              </View>
            )}
          />
        </View>
      )}
      {selectedCategory === 'others' && (
        <View style={styles.boxContainer}>
          <Dropdown
            style={styles.dropdown}
            data={othersConfigurations}
            labelField="label"
            valueField="value"
            placeholder="Select Configuration"
            value={othersConfiguration}
            onChange={item => setOthersConfiguration(item.value)}
            renderItem={(item) => (
              <View style={styles.dropdownItem}>
                <Text style={[styles.dropdownItemText, { color: 'black' }]}>{item.label}</Text>
              </View>
            )}
          />
        </View>
      )}
      <View style={styles.boxContainer}>
        <Dropdown
          style={styles.dropdown}
          data={zones}
          search
          searchPlaceholder="Search..."
          labelField="label"
          valueField="value"
          placeholder="Select Zone"
          value={zone}
          onChange={item => setZone(item.value)}
          renderItem={(item) => (
            <View style={styles.dropdownItem}>
              <Text style={[styles.dropdownItemText, { color: 'black' }]}>{item.label}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.boxContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Location"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      <View style={styles.boxContainer}>
        <Picker
          selectedValue={status}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
        >
          {statuses.map((status) => (
            <Picker.Item key={status.value} label={status.label} value={status.value} />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.applyButton, { width: '45%' }]} onPress={handleApplyFilter}>
          <Text style={styles.buttonText}>Apply Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.clearButton, { width: '45%' }]} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    width: 100,
  },
  selectedCategory: {
    backgroundColor: '#FFD700',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },
  selectedCategoryImageContainer: {
    backgroundColor: '#FFD700',
  },
  categoryImage: {
    width: 35,
    height: 35,
  },
  categoryText: {
    marginTop: 5,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    height: 50,
    justifyContent: 'center',
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
  },
  pickerItem: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    marginBottom: 50,
  },
  clearButton: {
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FilterScreen;
