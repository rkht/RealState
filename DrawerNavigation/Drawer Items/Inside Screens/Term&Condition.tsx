import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Component = props =>
    <View style={{
        width: scale(30),
        height: verticalScale(50),
        padding: moderateScale(5)
    }}/>;
const TermsAndConditions = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.title}>Terms & Conditions</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et fringilla velit. Mauris
          sagittis libero vel lorem lacinia, eget luctus turpis tempor. Vestibulum sit amet orci at
          nisi bibendum condimentum. Vestibulum at velit in nisi bibendum feugiat. Quisque a
          consequat tortor. Ut malesuada interdum libero. Morbi sodales, velit a ultrices fermentum,
          elit ipsum faucibus nulla, eu vestibulum tortor metus at justo.
        </Text>
        <Text style={styles.text}>
          Nulla facilisi. Donec imperdiet eleifend urna, vel consectetur ante eleifend id. Sed
          tristique lectus nec ipsum laoreet, at faucibus arcu volutpat. Nulla sit amet quam
          consequat, volutpat arcu ac, laoreet quam. Aenean tempus magna at turpis convallis
          faucibus. Integer efficitur vehicula elit, at iaculis odio vehicula sit amet.
        </Text>
        <Text style={styles.text}>
          Fusce quis ultricies velit. Nullam hendrerit ex eget elit luctus, a laoreet nunc
          vestibulum. Proin ultricies, metus quis auctor scelerisque, risus magna sollicitudin urna,
          sit amet bibendum velit mauris nec odio. Sed viverra euismod odio, nec fermentum orci
          pulvinar non. Vestibulum nec ante vitae purus scelerisque ullamcorper.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  boxContainer: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: 370,
    alignSelf: 'center',
  },
});

export default TermsAndConditions;
