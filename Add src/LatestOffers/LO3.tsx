import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LO3 = () => {
  const [photos, setPhotos] = useState([null, null, null]);
  const [floorPlans, setFloorPlans] = useState([null, null, null]);
  const [videos, setVideos] = useState([null, null, null]);
  const [pdfs, setPdfs] = useState([null, null, null]);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedOption, formData } = route.params;

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
    };

    fetchUserId();
  }, []);

  const handleImagePicker = (index, type) => {
    Alert.alert(
      'Upload Image',
      '',
      [
        {
          text: 'Take a Photo',
          onPress: () => requestCameraPermission(index, type),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => openGallery(index, type),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const requestCameraPermission = async (index, type) => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      openCamera(index, type);
    } else {
      Alert.alert('Camera permission denied');
    }
  };

  const openCamera = (index, type) => {
    launchCamera({ mediaType: 'photo', cameraType: 'back' }, (response) => {              
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const newMedia = type === 'photo' ? [...photos] : [...floorPlans];
        newMedia[index] = response.assets[0].uri;
        type === 'photo' ? setPhotos(newMedia) : setFloorPlans(newMedia);
      }
    });
  };

  const openGallery = (index, type) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const newMedia = type === 'photo' ? [...photos] : [...floorPlans];
        newMedia[index] = response.assets[0].uri;
        type === 'photo' ? setPhotos(newMedia) : setFloorPlans(newMedia);
      }
    });
  };

  const handleVideoPicker = (index) => {
    launchImageLibrary({ mediaType: 'video' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const newVideos = [...videos];
        newVideos[index] = response.assets[0].uri;
        setVideos(newVideos);
      }
    });
  };

  const handlePdfPicker = (index) => {
    // Implement a PDF picker here
    // For now, we'll just mock the PDF selection
    const newPdfs = [...pdfs];
    newPdfs[index] = `mock_pdf_uri_${index}`;
    setPdfs(newPdfs);
  };

  const renderMedia = (mediaArray, type) => {
    return mediaArray.map((media, index) => (
      <TouchableOpacity key={index} style={styles.imagePlaceholder} onPress={() => handleImagePicker(index, type)}>
        {media ? <Image source={{ uri: media }} style={styles.image} /> : <View style={styles.imageEmpty} />}
      </TouchableOpacity>
    ));
  };

  const renderVideos = () => {
    return videos.map((video, index) => (
      <TouchableOpacity key={index} style={styles.imagePlaceholder} onPress={() => handleVideoPicker(index)}>
        {video ? <Text style={styles.videoText}>Video {index + 1}</Text> : <View style={styles.imageEmpty} />}
      </TouchableOpacity>
    ));
  };

  const renderPdfs = () => {
    return pdfs.map((pdf, index) => (
      <TouchableOpacity key={index} style={styles.imagePlaceholder} onPress={() => handlePdfPicker(index)}>
        {pdf ? <Text style={styles.pdfText}>PDF {index + 1}</Text> : <View style={styles.imageEmpty} />}
      </TouchableOpacity>
    ));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append('user_id', userId);
      form.append('description', formData.description);
  
      photos.forEach((photo, index) => {
        if (photo) {
          form.append(`images[${index}]`, {
            uri: photo,
            type: 'image/jpeg',
            name: `photo${index}.jpg`,
          });
        }
      });
  
      floorPlans.forEach((floorPlan, index) => {
        if (floorPlan) {
          form.append(`floor_plans_images[${index}]`, {
            uri: floorPlan,
            type: 'image/jpeg',
            name: `floorPlan${index}.jpg`,
          });
        }
      });
  
      videos.forEach((video, index) => {
        if (video) {
          form.append(`videos[${index}]`, {
            uri: video,
            type: 'video/mp4',
            name: `video${index}.mp4`,
          });
        }
      });
  
      pdfs.forEach((pdf, index) => {
        if (pdf) {
          form.append(`pdfs[${index}]`, {
            uri: pdf,
            type: 'application/pdf',
            name: `pdf${index}.pdf`,
          });
        }
      });
  
      if (thumbnailImage) {
        form.append('thumbnail_image', {
          uri: thumbnailImage,
          type: 'image/jpeg',
          name: 'thumbnail.jpg',
        });
      }
  
      form.append('want_to_list', selectedOption.listType);
      form.append('service_type', selectedOption.serviceType);
      form.append('property_type', selectedOption.propertyType);
      form.append('city', formData.city);
      form.append('zone', formData.zone);
      form.append('location', formData.location);
      form.append('price', formData.price);
      form.append('configuration', formData.configuration);
      form.append('furnished_type', formData.furnishedType);
      form.append('sqft', formData.sqft);
      form.append('amenities', formData.amenities);
      form.append('building_name', formData.buildingName);
      form.append('project_highlights', formData.projectHighlights);
      form.append('construction_status', formData.constructionStatus);
      form.append('project_location', formData.projectLocation);
      form.append('location_highlight', formData.locationHighlight);
      form.append('rera_number', formData.reraNumber);
      form.append('developer_details', formData.developerDetails);
  
      // Manually log the FormData entries
      for (let key in form._parts) {
        console.log(form._parts[key][0] + ': ' + form._parts[key][1]);
      }
  
      const response = await axios.post(`https://textcode.co.in/propertybazar/public/api/add-offers/${userId}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to submit data');
      }
  
      Alert.alert('Success', 'Data submitted successfully');
      navigation.navigate('Latest Offers / Schemes');
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Failed to submit data');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Upload Images</Text>
      <View style={styles.photoContainer}>{renderMedia(photos, 'photo')}</View>
      <Text style={styles.header}>Upload Floor Plans</Text>
      <View style={styles.photoContainer}>{renderMedia(floorPlans, 'floorPlan')}</View>
      <Text style={styles.header}>Upload Videos</Text>
      <View style={styles.photoContainer}>{renderVideos()}</View>
      <Text style={styles.header}>Upload PDFs</Text>
      <View style={styles.photoContainer}>{renderPdfs()}</View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imagePlaceholder: {
    width: '30%',
    height: 100,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageEmpty: {
    width: '100%',
    height: '100%',
    backgroundColor: '#CCCCCC',
  },
  videoText: {
    fontSize: 16,
    color: '#000000',
  },
  pdfText: {
    fontSize: 16,
    color: '#000000',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LO3;
