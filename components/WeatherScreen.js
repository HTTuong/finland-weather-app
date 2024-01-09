import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Platform, ToastAndroid, Alert, Image, TouchableOpacity } from 'react-native';
import Header from './Header';
import Temperature from './Temperature';
import LocationContext from '../context/LocationContext'


const urlBase = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&units=metric&appid=28b65cd0f51254a2b4a4cc8eba82b712';

const DEFAULT_WEATHER_DATA = {
  location: '',
  description: '',
  icon: '',
  temperature: 0,
  wind_speed: 0,
  timestamp: 0,
  humidity: 0,
  real_feel: 0,
}

const WeatherScreen = ({ navigation }) => {
  const locationCtx = React.useContext(LocationContext)
  const [location, setLocation] = React.useState('');
  const [weatherData, setWeatherData] = React.useState(DEFAULT_WEATHER_DATA);

  const showFetchingToast = () => {
    if (Platform.OS == 'android') {
      ToastAndroid.show("Fetching weather data", ToastAndroid.LONG);
    }
    else if (Platform.OS == 'ios') {
      Alert.alert("Fetching weather data ?");
    }
    else {
      console.log("We're probably running on the web");
    }
  }

  const fetchWeatherData = React.useCallback(async () => {
    const desiredLocation = location.toLowerCase() || locationCtx.location.toLowerCase()
    locationCtx.updateLocation(location)
    if (location) {
      try {
        const response = await fetch(urlBase + desiredLocation + apiKey)
        console.log(response)
        if (response.status == '404') {
          locationCtx.setError('City not found')
        }
        const jsonWeatherObject = await response.json();
        setWeatherData({
          location: jsonWeatherObject.name,
          description: jsonWeatherObject.weather[0].main,
          icon: jsonWeatherObject.weather[0].icon,
          temperature: jsonWeatherObject.main.temp,
          wind_speed: jsonWeatherObject.wind.speed,
          timestamp: jsonWeatherObject.dt,
          humidity: jsonWeatherObject.main.humidity,
          real_feel: jsonWeatherObject.main.feels_like,
        });
        setLocation('')
        locationCtx.setError('')
      } catch (error) { console.log({ error }) }
    } else {
      locationCtx.setError("Please enter a city's name")
    }

  }, [locationCtx, location])

  const fetchWeatherDataInPlace = async () => {
    const coordinate = locationCtx.coordinate
    if (locationCtx.coordinate.latitude && locationCtx.coordinate.longitude) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&units=metric&appid=28b65cd0f51254a2b4a4cc8eba82b712`);
        const jsonWeatherObject = await response.json();
        setWeatherData({
          location: jsonWeatherObject.name,
          description: jsonWeatherObject.weather[0].main,
          icon: jsonWeatherObject.weather[0].icon,
          temperature: jsonWeatherObject.main.temp,
          wind_speed: jsonWeatherObject.wind.speed,
          timestamp: jsonWeatherObject.dt,
          humidity: jsonWeatherObject.main.humidity,
          real_feel: jsonWeatherObject.main.feels_like,
        });
        setLocation('')
        locationCtx.updateLocation(jsonWeatherObject.name.toLowerCase())
        locationCtx.setError('')
      } catch (error) { console.log(error) }
    } else {
      console.log('Not yet')
    }
  }

  const openForecastScreen = () => {
    if ((location || locationCtx.location) && locationCtx.error === '') {
      locationCtx.setError('')
      showFetchingToast();
      navigation.navigate('Weather Forcast');
    } else {
      locationCtx.setError("Please enter a city's name")
    }
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Header
          location={weatherData.location}
          fetchForecastData={openForecastScreen}
          fetchWeatherInPlace={fetchWeatherDataInPlace} />
        <Temperature
          description={weatherData.description}
          temperature={weatherData.temperature}
          wind_speed={weatherData.wind_speed}
          icon={weatherData.icon}
          timestamp={weatherData.timestamp}
          humidity={weatherData.humidity}
          real_feel={weatherData.real_feel}
        />
        <View style={{ width: "100%", flex: 1, alignItems: "center", position: 'relative' }}>
          <TextInput
            style={styles.input}
            placeholder="Enter a location"
            keyboardType="default"
            value={location}
            onChangeText={newText => setLocation(newText)}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={fetchWeatherData}>
            <Image
              style={{ width: 28, height: 28, }}
              source={'https://cdn.icon-icons.com/icons2/2715/PNG/512/magnifying_glass_icon_172355.png'}

            />
          </TouchableOpacity>
        </View>
      </View >
      <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {locationCtx.isLoading &&
          <Text style={{ fontSize: 24 }}>{'Getting your location...'}</Text>
        }
        {locationCtx.error !== '' &&
          <Text style={{ fontSize: 24 }}>{locationCtx.error}</Text>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    display: 'flex',
    backgroundImage: "linear-gradient(#56CCF2, #2F80ED)",
    justifyContent: 'space-between',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: 'center'
  },
  searchIcon: {
    padding: 11,
    position: 'absolute',
    top: '50%',
    right: "5%",
    display: 'flex',
    alignItems: 'center',
    transform: 'translateY(-50%)',
    borderRadius: "50%",
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginVertical: 12,
    borderRadius: 50,
    border: 'none',
    outlineColor: "#000",
    outlineStyle: "solid",
    outlineWidth: 0,
    fontSize: 16,
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
  },
  forecastBtn: {
    marginTop: 12,
  }
})

export default WeatherScreen;