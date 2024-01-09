import React from 'react';
import * as Location from 'expo-location';

const DEFAULT_VALUE = {
  location: '',
  coordinate: {
    latitude: '',
    longitude: ''
  },
  error: '',
  isLoading: false,
  updateLocation: () => { },
  setError: () => { }
}

const LocationContext = React.createContext(DEFAULT_VALUE);

export const LocationContextProvider = ({ children }) => {

  const [location, setLocation] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [coordinate, setCoordinate] = React.useState({
    latitude: '',
    longitude: ''
  })

  React.useEffect(() => {
    setIsLoading(true);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }
      let locationObj = await Location.getCurrentPositionAsync({});
      const coordinateValue = {
        latitude: locationObj.coords.latitude.toString(),
        longitude: locationObj.coords.longitude.toString()
      }
      setCoordinate(coordinateValue);
    })()
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => { setIsLoading(false) });
  }, []);

  const updateLocation = (location) => {
    setLocation(location)
  }

  const value = {
    location,
    coordinate,
    error,
    isLoading,
    updateLocation,
    setError
  }

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>)
}

export default LocationContext;