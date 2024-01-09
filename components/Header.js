import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { images } from '../assets';

const Header = ({ location, fetchForecastData, fetchWeatherInPlace }) => {
    return (
        <View style={styles.wrapper}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{ width: 30, height: 43, transform: 'scale(0.46)' }}
                        source={'https://www.seekpng.com/png/full/15-155998_white-transparent-location-pin-gps-maps-visitor-information.png'} />

                    {location !== '' ? <Text style={styles.location}>{location}</Text> : <Text style={styles.location}>Location/City</Text>}
                </View>
            </View>
            <View style={styles.updatingText}>
                <View style={{ backgroundColor: '#ffec01', width: 6, height: 6, borderRadius: "50%" }}></View>
                <Text style={{ fontSize: 12, color: '#fff', marginLeft: 4 }}>Updating</Text>
            </View>
            <View style={{ position: 'absolute', top: 0, right: 20, marginTop: 4 }}>
                <TouchableOpacity style={styles.forecastBtn} onPress={fetchForecastData}>
                    <Image
                        style={{ width: 44, height: 44, transform: 'scale(0.46)' }}
                        source={images.forecast} />
                </TouchableOpacity>
            </View >
            <View style={{ position: 'absolute', top: 0, left: 20, marginTop: 4 }}>
                <TouchableOpacity style={styles.forecastBtn} onPress={fetchWeatherInPlace}>
                    <Image
                        style={{ width: 44, height: 44, transform: 'scale(0.46)' }}
                        source={images.place} />
                </TouchableOpacity>
            </View >
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginTop: 16,
        height: 'fit-content',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    updatingText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 40
    },
    location: {
        fontSize: 24,
        lineHeight: 50,
        color: '#fff',
        fontWeight: 600
    },
    forecastBtn: {
        display: 'flex',
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: '50%'
    }
})

export default Header;