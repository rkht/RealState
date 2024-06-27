import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ViewProfile = () => {
  const [name, setName] = useState('');
  const [membershipID, setMembershipID] = useState('');
  const [reraNo, setReraNo] = useState('ABC123');
  const [city, setCity] = useState('');
  const [zones, setZones] = useState('');
  const [area, setArea] = useState('');
  const [company, setCompany] = useState('');
  const [workingArea, setWorkingArea] = useState('');
  const [dealIn, setDealIn] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPhone = await AsyncStorage.getItem('userPhone');
      const storedMembershipID = await AsyncStorage.getItem('membership_id');
      const storedImage = await AsyncStorage.getItem('profileImage');
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
      if (storedMembershipID) setMembershipID(storedMembershipID);
      if (storedImage) await AsyncStorage.setItem('profileImage', '../../assets/h.jpg'); // Assuming image path is stored in profileImage
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('user_id', membershipID);
      formData.append('name', name);
      formData.append('rera_no', reraNo);
      formData.append('city', city);
      formData.append('zones', zones);
      formData.append('area', area);
      formData.append('company', company);
      formData.append('working_area', workingArea);
      formData.append('deal_in', dealIn);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('end_date', endDate);

      console.log('Updating user details:', {
        user_id: membershipID,
        name,
        rera_no: reraNo,
        city,
        zones,
        area,
        company,
        working_area: workingArea,
        deal_in: dealIn,
        email,
        phone,
        end_date: endDate,
      });

      const response = await fetch('https://textcode.co.in/propertybazar/public/api/Userupdate', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'User details updated successfully');
      } else {
        throw new Error('Failed to update user details');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while updating user details');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxcontainer1}>
        <Image
          source={require('../../assets/h.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.membership}>Membership ID: {membershipID}</Text>
        </View>
      </View>
      <View style={styles.boxcontainer2}>
        <View style={styles.boxContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer}>
          <Text style={styles.label}>Membership ID:</Text>
          <Text style={[styles.input, styles.nonEditable]}>{membershipID}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer}>
          <Text style={styles.label}>RERA No:</Text>
          <Text style={[styles.input, styles.nonEditable]}>{reraNo}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer}>
          <Text style={styles.label}>City:</Text>
          <TextInput style={styles.input} value={city} onChangeText={setCity} />
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer}>
          <Text style={styles.label}>Zones:</Text>
          <TextInput style={styles.input} value={zones} onChangeText={setZones} />
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer}>
          <Text style={styles.label}>Area:</Text>
          <TextInput style={styles.input} value={area} onChangeText={setArea} />
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer}>
          <Text style={styles.label}>Company:</Text>
          <TextInput style={styles.input} value={company} onChangeText={setCompany} />
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer}>
          <Text style={styles.label}>Working Area:</Text>
          <TextInput style={styles.input} value={workingArea} onChangeText={setWorkingArea} />
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer}>
          <Text style={styles.label}>Deal In:</Text>
          <TextInput style={styles.input} value={dealIn} onChangeText={setDealIn} />
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer}>
          <Text style={styles.label}>Phone:</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer}>
          <Text style={styles.label}>End Date:</Text>
          <TextInput style={styles.input} value={endDate} onChangeText={setEndDate} />
        </View>
        <View style={styles.line1} />
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.updateButtonText}>Update Details</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  membership: {
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginTop: 5,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 20,
  },
  line1: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 0,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: moderateScale(13),
    color: 'black',
  },
  input: {
    flex: 1,
    height: verticalScale(40),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    color: 'black',
    alignSelf: 'center',
    marginLeft: 3,
  },
  nonEditable: {
    backgroundColor: '#e9ecef',
    color: 'black',
  },
  updateButton: {
    width: '100%',
    height: verticalScale(50),
    backgroundColor: '#Fdd700',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    marginTop: 10,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxcontainer1: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
  },
  boxcontainer2: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
  },
});

export default ViewProfile;