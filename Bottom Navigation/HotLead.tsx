import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Component = props =>
    <View style={{
        width: scale(30),
        height: verticalScale(50),
        padding: moderateScale(5)
    }}/>;
const HotLeads = () => {
  const handleRentPress = () => {
    Alert.alert(
      'Rent Button Pressed',
      'Our team will contact you shortly.'
    );
  };
  const handleFilterPress = () => {
    Alert.alert(
      'Filter Icon Pressed',
      'You can modify the filter settings here.'
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            {/* Placeholder */}
            <Text style={styles.placeholder}>Click Filter icon to modify </Text>
            {/* Filter Icon */}
            <TouchableOpacity style={styles.filterIcon} onPress={handleFilterPress}>
              <Image
                source={require('../assets/filter.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Box Container */}
        <View style={styles.boxContainer}>
          {/* Text */}
          <Text style={styles.text}>Required 2 BHK flat for Rent in Vasai East Near Evershine Nagar Or Vasant Nagar</Text>

          {/* Budget */}
          <View style={styles.row}>
            <Text style={styles.budgetText}>Budget:</Text>
            <Text style={styles.budgetAmount}>₹10K</Text>
            {/* Button */}
            <View style={[styles.rentButton1, { backgroundColor: '#ffe5b4' }]}>
              <Text style={styles.rentButtonText1}>Already Claimed</Text>
            </View>
          </View>

          {/* Second Requirement */}
          <Text style={styles.text1}>
            Required 2 BHK flat for rent in Vasai East Near Evershine Nagar Or Vasant Nagar budget 8k to 10k
          </Text>

          {/* Rent Button */}
          <TouchableOpacity style={styles.rentButton} onPress={handleRentPress}>
            <Text style={styles.rentButtonText}>Rent</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.boxContainer}>
          {/* Text */}
          <Text style={styles.text}>Required 1 RK , 1 BHK &PG flat for 2 People Rent in Malad West To Goregoan West Near Railway Station </Text>

          {/* Budget */}
          <View style={styles.row}>
            <Text style={styles.budgetText}>Budget:</Text>
            <Text style={styles.budgetAmount}>₹22K</Text>
            {/* Button */}
            <View style={[styles.rentButton1, { backgroundColor: '#ffe5b4' }]}>
              <Text style={styles.rentButtonText1}>Already Claimed</Text>
            </View>
          </View>

          {/* Second Requirement */}
          <Text style={styles.text1}>
          Required 1 RK , 1 BHK &PG flat for 2 People Rent in Malad West To Goregoan West Near Railway Station bugedt 22k(Note : Fully Furnished Flat)
          </Text>

          {/* Rent Button */}
          <TouchableOpacity style={styles.rentButton} onPress={handleRentPress}>
            <Text style={styles.rentButtonText}>Rent</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.boxContainer}>
          {/* Text */}
          <Text style={styles.text}>Required 2 BHK flat for Rent in Kalyan West Near Rambaug</Text>

          {/* Budget */}
          <View style={styles.row}>
            <Text style={styles.budgetText}>Budget:</Text>
            <Text style={styles.budgetAmount}>₹15K</Text>
            {/* Button */}
            <View style={[styles.rentButton1, { backgroundColor: '#ffe5b4' }]}>
              <Text style={styles.rentButtonText1}>Already Claimed</Text>
            </View>
          </View>

          {/* Second Requirement */}
          <Text style={styles.text1}>
          Required 2 BHK flat for Rent in Kalyan West Near Rambaug Budget:15K
          </Text>

          {/* Rent Button */}
          <TouchableOpacity style={styles.rentButton} onPress={handleRentPress}>
            <Text style={styles.rentButtonText}>Rent</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.boxContainer}>
          {/* Text */}
          <Text style={styles.text}>Required 2 BHK flat for Rent in Malad West</Text>

          {/* Budget */}
          <View style={styles.row}>
            <Text style={styles.budgetText}>Budget:</Text>
            <Text style={styles.budgetAmount}>₹40K</Text>
            {/* Button */}
            <View style={[styles.rentButton1, { backgroundColor: '#ffe5b4' }]}>
              <Text style={styles.rentButtonText1}>Already Claimed</Text>
            </View>
          </View>

          {/* Second Requirement */}
          <Text style={styles.text1}>
          Required 2 BHK flat for Rent in Malad West Budget 40K To 50K (Note: Semi Furnished)          </Text>

          {/* Rent Button */}
          <TouchableOpacity style={styles.rentButton} onPress={handleRentPress}>
            <Text style={styles.rentButtonText}>Rent</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
    padding: 20,
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
  },
  placeholder: {
    flex: 1,
    color: 'gray',
  },
  filterIcon: {
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#353935',
  },
  text: {
    color: 'green',
    marginBottom: 10,
  },
  text1: {
    color: 'black',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  budgetText: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  budgetAmount: {
    color: 'green',
    marginRight: 10,
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  rentButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rentButton1: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rentButtonText1: {
    color: 'brown',
    fontWeight: 'bold',
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
    color: '#ddf700',
  },
});

export default HotLeads;
