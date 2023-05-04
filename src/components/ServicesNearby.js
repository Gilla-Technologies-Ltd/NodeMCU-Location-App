import React, { useState } from 'react';
import useLocationServices from './src/hooks/useLocationServices';

const ServicesNearby = ({ data }) => {
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const { servicesNearby, loading, error } = useLocationServices(
    userLocation.latitude,
    userLocation.longitude
  );
  return <div />;
};

export default ServicesNearby;
