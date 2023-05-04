import { useState, useEffect } from 'react';
import servicesData from './services.json';

export const useLocationServices = (currentLatitude, currentLongitude) => {
  const [servicesNearby, setServicesNearby] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationServices = async () => {
      setLoading(true);
      try {
        const result = await getLocationServicesNearby(
          currentLatitude,
          currentLongitude
        );
        setServicesNearby(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationServices();
  }, [currentLatitude, currentLongitude]);

  return { servicesNearby, loading, error };
};

export const getLocationServicesNearby = async (
  latitude,
  longitude,
  maxDistance = 1000
) => {
  // The distance calculation is simplified for the sake of this example.
  const isWithinDistance = (lat1, lon1, lat2, lon2, maxDistance) => {
    const R = 6371e3; // Earth's radius in meters
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance <= maxDistance;
  };

  const servicesNearby = servicesData.filter((service) =>
    isWithinDistance(
      latitude,
      longitude,
      service.latitude,
      service.longitude,
      maxDistance
    )
  );

  return servicesNearby;
};

export default { useLocationServices, getLocationServicesNearby };
