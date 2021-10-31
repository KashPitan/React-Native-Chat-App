import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

// import {createChatQuery} from '../queries';
import { coordinates } from '../types';

import ChatsList from '../components/ChatsList';
import CreateChat from '../components/CreateChat';

const ChatsScreen = ({}) => {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );

  const [coordinates, setCoordinates] = useState<coordinates | null>(null);
  const [liveLocation, setliveLocation] = useState<coordinates | null>(null)

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
    watchLocation();
    // console.log('liveLocation ==> ', liveLocation);
  }, []);

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  
    let { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 5000,
      // distanceInterval: null
  });
  
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      setCoordinates({latitude,longitude});
  
      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
  
        setDisplayCurrentAddress(address);
      }
    }
  };

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const watchLocation = async () => {
    await Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 2,
      // timeInterval: 2
    }, (location) => {
      console.log('location ==> ', location);
      setliveLocation({longitude :location.coords.longitude, latitude:location.coords.latitude})
    });
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.messagesContainer}>
          {liveLocation && <ChatsList location={liveLocation}/>}
          
        </View>
      </View>
      {coordinates && 
        <>
          <Text>lat: {coordinates.latitude}</Text>
          <Text>long: {coordinates.longitude}</Text>
        </>
      }
      {liveLocation && <CreateChat location={liveLocation}/>}

    
    </View>
  )
}

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    margin: 10,
    padding: 10,
    height: '70%',
    width: '90%',
    borderRadius: 5,
    backgroundColor: "#fff",
    alignSelf:'center',
  },
  messagesContainer: {
    flex: 1,
    width: "80%",
  },
  messageBox: {
    paddingTop: 10,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    backgroundColor: "#fff",
    textAlign:'center',
  },
});