import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LocationContextProvider } from './context/LocationContext'

import { NavigationContainer } from '@react-navigation/native';


import WeatherScreen from './components/WeatherScreen';
import WeatherForecast from './components/WeatherForecast';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <LocationContextProvider>
        <Stack.Navigator>
          <Stack.Screen name="Current Weather" component={WeatherScreen} />
          <Stack.Screen name="Weather Forcast" component={WeatherForecast} />
        </Stack.Navigator>
      </LocationContextProvider>
    </NavigationContainer>
  );
}
