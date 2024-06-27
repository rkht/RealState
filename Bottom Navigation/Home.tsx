import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function Home({ navigation }) {
  const images = [
    require('../assets/Image1.png'),
    require('../assets/Image2.png'),
    require('../assets/Image3.png'),
    require('../assets/Image4.jpeg'),
    require('../assets/Image5.jpg'),
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <SliderBox
        images={images}
        dotColor="#FFD700"
        inactiveDotColor="black"
        dotStyle={{ height: 20, width: 20, borderRadius: 50 }}
        imageLoadingColor="#ffd700"
        autoplay={true}
        autoplayInterval={2000}
        circleLoop={true}
        // onCurrentImagePressed ={(index) => alert(index + 1)}
        firstItem={1}
        paginationBoxVerticalPadding={20}
      />
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Image source={require('../assets/search.png')} style={styles.logo} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search Projects, Requirements & Channel Partners"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.boxContainer}>
          {/* First Row */}
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate('Latest Offers / Schemes')}>
              <Image source={require('../assets/trending.png')} style={[styles.icon, { tintColor: '#ffd700' }]} />
              <Text style={styles.boxText}>Trending Offers</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate('My Visits')}>
              <Image source={require('../assets/visit.png')} style={[styles.icon, { tintColor: '#ffd700' }]} />
              <Text style={styles.boxText}>Visit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate('Requirement / Inventory')}>
              <Image source={require('../assets/req.png')} style={[styles.icon, { tintColor: '#ffd700' }]} />
              <Text style={styles.boxText}>Req / Inv</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate('Top Brokers Search')}>
              <Image source={require('../assets/broker.png')} style={[styles.icon, { tintColor: '#ffd700' }]} />
              <Text style={styles.boxText}>Top Brokers</Text>
            </TouchableOpacity>
          </View>
          {/* Second Row */}
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate('Hot Leads')}>
              <Image source={require('../assets/rupee.png')} style={[styles.icon, { tintColor: '#ffd700' }]} />
              <Text style={styles.boxText}>Hot Lead</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate('Home Loan')}>
              <Image source={require('../assets/homeloan.png')} style={[styles.icon, { tintColor: '#ffd700' }]} />
              <Text style={styles.boxText}>Home Loan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate('News')}>
              <Image source={require('../assets/news.png')} style={[styles.icon, { tintColor: '#ffd700' }]} />
              <Text style={styles.boxText}>News</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
              <Image source={require('../assets/event.png')} style={[styles.icon, { tintColor: '#ffd700' }]} />
              <Text style={styles.boxText}>Events</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {/* New Box Container */}
        <View style={styles.latestUpdatesContainer}>
          <Text style={styles.heading}>Latest Update</Text>
          <View style={styles.rowContainer}>
            <View style={styles.imageContainer}> 
              <TouchableOpacity onPress={() => navigation.navigate('Home Loan')}>
                <Image source={require('../assets/BottomImage1.jpg')}  style={styles.latestImage}   />
                <Text style={styles.subheading}>Home Loan</Text>
                <Text style={styles.bottomText}>CP Off:- 0.5% || Client Off :- 0.1%</Text>
                <View style={styles.horizontalLine} />
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Hot Leads')}>
                <Image source={require('../assets/BottomImage2.jpg')} style={styles.latestImage1} />
                <Text style={styles.subheading}>Free Hot Lead's</Text>
                <Text style={styles.bottomText}>Buyer & Owner Every Day</Text>
                <View style={styles.horizontalLine} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 13,
    color: 'black',
    fontWeight: '600',
    borderRadius: 10
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Allow wrapping to next row
  },
  box: {
    backgroundColor: 'white',
    width: '23%',
    height: 85,
    padding: 5,
    marginBottom: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffd700', // Border color
  },
  boxText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
    alignSelf: 'center'
  },
  horizontalLine: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginVertical: 10,
    marginTop: 5,
  },
  latestUpdatesContainer: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: 'white', // Background color white
    borderBottomColor: '#ddd', // Change border color to red
    borderBottomWidth: 1, // Ensure the line is visible
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    marginLeft:5,
    marginTop:5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  latestImage: {
    width: 170,
    height: 90,
    marginBottom: 10,
    marginLeft: 4,
    marginRight: 0,
    borderRadius:10
  },
  latestImage1: {
    width: 170,
    height: 90,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 8,
    borderRadius:10
  },
  subheading: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  bottomText: {
    fontSize: 12,
    color: 'gray',
  },
});
