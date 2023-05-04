async function fetchLocationFromNodeMCU(updateUserLocation) {
  try {
    const response = await fetch('http://192.168.4.1/location');
    if (response.ok) {
      const locationString = await response.text();
      const [latitudeString, longitudeString] = locationString.split(', ');

      const latitude = parseFloat(latitudeString.split(': ')[1]);
      const longitude = parseFloat(longitudeString.split(': ')[1]);

      // Update the user's location
      updateUserLocation(latitude, longitude);
    } else {
      console.error('Error fetching location data:', response.status);
    }
  } catch (err) {
    console.error('Error fetching location data:', err);
  }
}

export default fetchLocationFromNodeMCU;
