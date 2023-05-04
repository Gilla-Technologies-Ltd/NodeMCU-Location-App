import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from '@react-native-community/google-maps';
import useLocationServices from './useLocationServices';

const ServicesMap = ({ latitude, longitude }) => {
  const { servicesNearby, loading, error } = useLocationServices(
    latitude,
    longitude
  );

  if (loading) {
    return null;
  }

  if (error) {
    console.error('Error fetching services:', error);
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {servicesNearby.map((service) => (
          <Marker
            key={service.id}
            coordinate={{
              latitude: service.latitude,
              longitude: service.longitude,
            }}
            title={service.name}
            description={service.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default ServicesMap;
