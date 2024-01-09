import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import WeatherForecastItem from './WeatherForecastItem'
import LocationContext from '../context/LocationContext'

const urlBase = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const apiKey = '&units=metric&appid=28b65cd0f51254a2b4a4cc8eba82b712'

const WeatherForecast = () => {
  const [weatherForecast, setWeatherForecast] = React.useState({ city: { name: "Fetching..." } });
  const locationCtx = React.useContext(LocationContext);

  React.useEffect(() => {
    fetchWeatherForecast();
  }, [locationCtx.location, fetchWeatherForecast])

  const fetchWeatherForecast = React.useCallback(async () => {
    try {
      const response = await fetch(urlBase + locationCtx.location.toLowerCase() + apiKey);
      const weatherObject = await response.json();
      setWeatherForecast(weatherObject);
    } catch (error) { console.log(error) }
  }, [locationCtx.location])


  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{weatherForecast.city.name}</Text>
      <FlatList
        data={weatherForecast.list}
        renderItem={({ item }) =>
          <WeatherForecastItem
            time={item.dt_txt}
            description={item.weather[0].description}
            temperature={item.main.temp}
            windSpeed={item.wind.speed}
            icon={item.weather[0].icon}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 12,
    backgroundColor: '#56CCF2',
    borderRadius: 4,
    display: 'flex',

  },
  title: {
    padding: 8,
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 600,
    marginHorizontal: 'auto',
    fontSize: 24
  },

});

export default WeatherForecast;