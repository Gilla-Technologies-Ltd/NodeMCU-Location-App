import data from '../../../../api/servcies.json';

// Haversine formula to calculate distance between two coordinates
export const getLocationServicesNearby = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

const findClosestPostcode = (latitude, longitude) => {
  let closestPostcode = null;
  let closestDistance = Infinity;

  //TODO- map data, replace with API call
  data.services.forEach((service) => {
    const distance = getLocationServicesNearby(
      latitude,
      longitude,
      service.latitude,
      service.longitude
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestPostcode = service.postcode;
    }
    return closestPostcode;
  });
};

// Usage example:
const latitude = 51.5074; // From NodeMCU
const longitude = -0.1278; // From NodeMCU
const closestPostcode = findClosestPostcode(latitude, longitude);
console.log('Closest postcode:', closestPostcode);
