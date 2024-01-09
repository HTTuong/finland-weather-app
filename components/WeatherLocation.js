import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';


const WeatherLocation = () => {
  const [location, setLocation] = React.useState({ coords: '' });
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.locationTitle}>Current location: </Text>
      <View>
        <Text>Latitude: {location.coords.latitude}</Text>
        <Text>Longitude: {location.coords.longitude}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    marginTop: 16,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 600,
  }

})

export default WeatherLocation;