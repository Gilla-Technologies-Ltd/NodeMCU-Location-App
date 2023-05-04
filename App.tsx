import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import ServicesMap from './src/components/ServicesMap';
import fetchLocationFromNodeMCU from './src/helpers/fetchLocationFromNodeMCU';
import ServicesNearby from './src/components/ServicesNearby';

const Stack = createStackNavigator();

export default function App() {
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const updateUserLocation = (latitude: any, longitude: any) => {
    setUserLocation({ latitude, longitude });
  };

  // Services Nearby {} - move to seperate component
  //
 
  useEffect(() => {
    // Fetch location data from NodeMCU board periodically or when needed
    const interval = setInterval(
      () => fetchLocationFromNodeMCU(updateUserLocation),
      5000
    ); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  userLocation ?  (
    return(
     <ServicesNearby data={userLocation} />;

    )
  ): (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="ServicesMap"
          component={ServicesMap}
          options={{ title: 'Services Map' }}
          initialParams={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
