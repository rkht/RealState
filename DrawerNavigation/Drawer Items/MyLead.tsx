import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Component = props =>
    <View style={{
        width: scale(30),
        height: verticalScale(50),
        padding: moderateScale(5)
    }}/>;
const MyLead = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleFilterPress = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            {/* Placeholder */}
            <Text style={styles.placeholder}>Click Filter icon to modify</Text>
            {/* Filter Icon */}
            <TouchableOpacity style={styles.filterIcon} onPress={handleFilterPress}>
              <Image
                source={require('../../assets/filter.png')}
                style={[styles.icon, { tintColor: '#353935' }]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              {/* Heading */}
              <Text style={styles.heading}> Results Not Found !</Text>
              {/* Subheading */}
              <Text style={styles.subheading}></Text>
            </View>
          </View>
        </View>
      </View>
      {/* Plus Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    
    color: 'black',
    
    alignSelf:'center',
    marginTop:200,
    // marginBottom:150
  },
  subheading: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 5,
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  logo: {
    width: 15,
    height: 15,
    marginRight: 10,
    tintColor: '#fdd700',
    borderRadius: 50,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  dateText1: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: 370,
    height: '90%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginTop: 0,
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 10,
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
  smallImage: {
    width: 90,
    height: 90,
    marginRight: 10,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    
    width: '100%',
    height: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
  },
  placeholder: {
    marginLeft: 10,
    marginRight: 130,
    color: 'gray',
  },
  filterIcon: {
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 27,
    marginHorizontal: 10,
  },
});

export default MyLead;
