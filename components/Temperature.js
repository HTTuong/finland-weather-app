import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { timeConverter } from '../utils/converters';
import { images } from '../assets';



const Temperature = ({ description, temperature, wind_speed, icon, timestamp, humidity,
    real_feel }) => {

    return (
        <View style={styles.wrapper}>
            {icon ? <Image
                style={styles.weatherImage}
                source={'https://api.openweathermap.org/img/w/' + icon + '.png'}
            ></Image> : <Text style={styles.noWeather}>No weather</Text>}
            <View style={styles.temperatureSection}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.temperature}>{temperature.toFixed(0)}</Text>
                    <Text style={styles.temperatureDot}>°</Text>
                </View>
                {description !== '' ? <Text style={styles.description}>{description}</Text> : <Text style={styles.description}>Weather description</Text>}
                {timestamp.toFixed() !== '0' ? <Text style={styles.date}>{timeConverter(timestamp)}</Text> : <Text style={styles.date}>Date</Text>}
            </View>
            <View style={{ width: '90%', height: 1, backgroundColor: '#fff', opacity: 0.3, marginTop: 24 }}></View>
            <View style={{ width: '90%', marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Image style={{ width: 36, height: 30, display: 'block', transform: 'scale(0.75)' }} source={images.wind} />
                    <Text style={styles.windSpeed}>{Math.round(wind_speed)} km/h</Text>
                    <Text style={styles.subCondition}>Wind</Text>
                </View>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, display: 'block', transform: 'scale(1.4)' }} source={images.humidity} />
                    <Text style={styles.windSpeed}>{humidity} %</Text>
                    <Text style={styles.subCondition}>Humidity</Text>
                </View>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, display: 'block' }} source={images.feel_like} />
                    <Text style={styles.windSpeed}>{Math.round(real_feel)} °</Text>
                    <Text style={styles.subCondition}>Feel-like</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 18,
        paddingVertical: 10,
        display: 'flex',
        alignItems: 'center'
    },
    weatherImage: {
        display: 'block',
        height: 160,
        width: '80%'
    },
    temperatureSection: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    description: {
        fontSize: 26,
        color: '#fff',
    },
    noWeather: {
        fontSize: 64,
        fontWeight: 500,
        color: '#fff',
        textAlign: 'center',
        height: 100
    },
    temperature: {
        fontSize: 120,
        fontWeight: 500,
        color: '#fff',
        textAlign: 'center'
    },
    temperatureDot: {
        fontSize: 40,
        fontWeight: 500,
        color: '#fff',
        textAlign: 'center',
        height: '80%'
    },
    date: {
        marginTop: 2,
        fontSize: 16,
        color: '#fff'
    },
    subCondition: {
        marginTop: 2,
        fontSize: 16,
        color: '#fff',
        opacity: 0.9
    },
    windSpeed: {
        marginTop: 8,
        fontSize: 20,
        color: '#fff'
    }
})

export default Temperature;