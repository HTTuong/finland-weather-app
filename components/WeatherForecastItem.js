import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const WeatherForecastItem = ({time, description, temperature, windSpeed, icon}) => {
  return (
    <View style={styles.day_wrapper}>
      <View>
        <Text>{time.split(' ')[0]}</Text>
        <Text>{time.split(' ')[1]}</Text>
      </View>
      <View style={styles.iconSection}>
        <Image 
          style={styles.weatherImage}
          source={'https://api.openweathermap.org/img/w/' + icon + '.png'}
        ></Image>
          <Text>{description}</Text>
      </View>
      <View style={styles.day}>
        <Text>{temperature}°C</Text>
      </View>
      <Text>{windSpeed} m/s</Text>
       
    </View>
  )
}

const styles = StyleSheet.create({
  day_wrapper:{
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  day: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  weatherImage: {
    display: 'block',
    width: 36,
    height: 36,
  },
});

export default WeatherForecastItem;