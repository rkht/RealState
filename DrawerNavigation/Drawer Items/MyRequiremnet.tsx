import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyRequirement = () => {
  const navigation = useNavigation();
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const thirdBoxRef = useRef(null);
  const [fabPosition, setFabPosition] = useState(0);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await fetch('https://textcode.co.in/propertybazar/public/api/myrequires');
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setRequirements(data || []);
      } catch (error) {
        console.error('Error fetching requirements:', error);
        Alert.alert('Error', 'Failed to fetch requirements');
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, []);

  useEffect(() => {
    if (thirdBoxRef.current) {
      thirdBoxRef.current.measure((x, y, width, height, pageX, pageY) => {
        setFabPosition(pageY + height + 10); // Adjust as necessary
      });
    }
  }, [requirements]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {requirements.length === 0 ? (
            <View style={styles.boxContainer}>
              <View style={styles.rowContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.heading}>There Are No Requirements / Inventory available</Text>
                </View>
              </View>
            </View>
          ) : (
            requirements.map((requirement, index) => (
              <View
                key={index}
                style={styles.boxContainer}
                ref={index === 2 ? thirdBoxRef : null} // Set ref to third box
              >
                <View style={styles.rowContainer}>
                  {requirement.image_url && (
                    <Image source={{ uri: requirement.image_url }} style={styles.smallImage} />
                  )}
                  <View style={styles.textContainer}>
                    <Text style={styles.heading}>{requirement.require_description}</Text>
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.dateText}>{requirement.date}</Text>
                  <View style={styles.rowContainer1}>
                    <Text style={styles.dateText1}>{requirement.additional_info}</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={[styles.fab, { top: fabPosition }]} onPress={() => navigation.navigate('AddMyRequirement')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
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
    marginBottom: 5,
    color: 'black',
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
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#28282B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyRequirement;
