import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ProgressBarAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import Swiper from 'react-native-swiper'
import { ProgressView } from '@react-native-community/progress-view'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from '@react-native-community/geolocation'
import {
  iconSearch, drawer, cloudy, raining, sun,
} from '../../assets/images'
import { Colors, paddingHeight, Fonts } from '../../assets/styles'
import { LineGraphs, TimeComponent, WindComponent } from '../components'

// let timeOut

const { width, height } = Dimensions.get('window')
const calWidth = width / 375
const data = [29, 30, 27, 26, 25, 28]

const HomeScreen = ({ route }) => {
  const [weathers, setWeather] = useState([])
  const [nameCity, setNameCity] = useState('')
  const [bgImage, setBgImage] = useState(cloudy)
  const [latLon, setLetLon] = useState({
    lat: 0,
    lon: 0,
  })

  const getData = async () => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${nameCity === 'Ho Chi Minh'
      ? 'Ha Noi' : 'Ho Chi Minh'}&appid=751bbe868e283f6d883ca706edfcbc37&units=metric`)
    setWeather(response.data)
    setNameCity(nameCity === 'Ho Chi Minh' ? 'Ha Noi' : 'Ho Chi Minh')
    handleChangeBacground()
    AsyncStorage.setItem('weather', JSON.stringify(response.data))
  }
  const handleChangeBacground = () => {
    const wearther = weathers?.weather && weathers?.weather[0]
    switch (wearther?.main) {
      case 'Clouds':
        setBgImage(cloudy)
        break
      case 'Raining':
        setBgImage(raining)
        break
      case 'Sun':
        setBgImage(sun)
        break
      default:
        break
    }
  }
  const handleSearch = () => {
  }

  useEffect(() => {
    setWeather(oldWeather)
    // getData()
  }, [])

  Geolocation.getCurrentPosition((info) => {
    setLetLon({
      lat: info.coords.latitude,
      lon: info.coords.longitude,
    })
  })
  const { oldWeather } = route.params

  const handlePagination = (index, total) => {
    const dotViews = []
    for (let indexPagination = 0; indexPagination < total; indexPagination++) {
      dotViews.push(
        <View
          key={indexPagination}
          style={[styles.dot, { backgroundColor: indexPagination === index ? Colors.primaryWrite : '#B4B4B4' }]}
        />
      )
    }
    return (

      <View style={{
        flexDirection: 'row',
        marginLeft: 3,
        position: 'absolute',
        backgroundColor: 'transparent',
      }}
      >
        {dotViews}
      </View>
    )
  }
  const wearther = weathers?.weather && weathers.weather[0]
  const hunidity = weathers?.main?.humidity
  const now = moment().format('LT - dddd,DD MMM YYYY')
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={bg_weather} style={styles.imgContainer}> */}
      {bgImage && <Image
        source={bgImage}
        style={{ position: 'absolute', width, height }}
        resizeMode="cover"
      />}
      <SafeAreaView />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: paddingHeight,
        // flex: 1,
      }}
      >
        <View style={styles.bgIcon}>
          <TouchableOpacity onPress={handleSearch}>
            <Image
              source={iconSearch}
              style={{
                width: 28 * calWidth,
                height: 28 * calWidth,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bgIcon}>
          <Image
            source={drawer}
            style={{
              width: 28 * calWidth,
              height: 28 * calWidth,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      <ScrollView>
        <View style={{ marginTop: 57, paddingLeft: paddingHeight, flex: 1 }}>
          <Swiper
            showsPagination
            loadMinimal
            loadMinimalSize={width * 0.5}
            renderPagination={handlePagination}
            onIndexChanged={(index) => {
              switch (index) {
                case 0: {
                  getData()
                  handleChangeBacground()
                  break
                }
                case 1: {
                  getData()
                  handleChangeBacground()
                  break
                }
                default:
                  console.log('ssss')
              }
            }}
          >
            <View style={{ marginTop: 28 }}>
              <Text style={styles.titleCity}>{weathers?.name}</Text>
              <Text style={{
                color: Colors.primaryWrite, ...Fonts.bold, fontSize: 18, marginTop: 8,
              }}
              >
                {now}
              </Text>
              <Text style={styles.temp}>{`${weathers?.main?.temp} *`}</Text>
              <View style={styles.styleStatus}>
                <Image
                  source={{ uri: `http://openweathermap.org/img/w/${wearther?.icon}.png` }}
                  style={{
                    width: 40 * calWidth,
                    height: 40 * calWidth,
                  }}
                />
                <Text style={styles.status}>{wearther?.main}</Text>
              </View>
              <View style={[styles.styleStatus, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                <WindComponent speed={weathers?.wind?.speed} label="Wind" unit="Km/h" />
                <WindComponent speed={0} label="Rain" unit="mi/h" />
                <WindComponent speed={weathers?.main?.humidity} label="Clounds" unit="%" />
              </View>
              <View style={{
                marginTop: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 20,
              }}
              >
                <TimeComponent icon={wearther?.icon} time="12:00" tempature="28*" />
                <TimeComponent icon={wearther?.icon} time="13:00" tempature="28*" />
                <TimeComponent icon={wearther?.icon} time="14:00" tempature="28*" />
                <TimeComponent icon={wearther?.icon} time="15:00" tempature="28*" />
                <TimeComponent icon={wearther?.icon} time="16:00" tempature="28*" />
              </View>

              <View>
                <LineGraphs data={data} />
              </View>

              <SafeAreaView />
            </View>
            {/* Create component  re-call */}
            <View style={{ marginTop: 28 }}>
              <Text style={styles.titleCity}>{weathers?.name}</Text>
              <Text style={{
                color: Colors.primaryWrite,
                ...Fonts.bold,
                fontSize: 18,
                marginTop: 8,
              }}
              >
                {now}
              </Text>
              <Text style={styles.temp}>{`${weathers?.main?.temp} *`}</Text>
              <View style={styles.styleStatus}>
                <Image
                  source={{ uri: `http://openweathermap.org/img/w/${wearther?.icon}.png` }}
                  style={{
                    width: 40 * calWidth,
                    height: 40 * calWidth,
                  }}
                />
                <Text style={styles.status}>{wearther?.main}</Text>
              </View>
              <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'space-around' }}>
                <View>
                  <Text style={styles.labelWind}>Wind</Text>
                  <Text style={styles.labelNumber}>{weathers?.wind?.speed}</Text>
                  <Text style={styles.labelUnit}>28*</Text>
                  {
                    (Platform.OS === 'android')
                      ? (<ProgressBarAndroid color={Colors.primaryProcess} progress={0.4} styleAttr="Horizontal" indeterminate={false} />)
                      : (<ProgressView progressTintColor={Colors.primaryProcess} progress={0.4} styleAttr="Horizontal" indeterminate={false} />)
                  }
                </View>
                <View>
                  <Text style={styles.labelWind}>Rain</Text>
                  <Text style={styles.labelNumber}>0</Text>
                  <Text style={styles.labelUnit}>%</Text>
                  {
                    (Platform.OS === 'android')
                      ? (<ProgressBarAndroid color={Colors.primaryProcess} progress={0.6} styleAttr="Horizontal" indeterminate={false} />)
                      : (<ProgressView progressTintColor={Colors.primaryProcess} progress={0.6} styleAttr="Horizontal" indeterminate={false} />)
                  }
                </View>
                <View>
                  <Text style={styles.labelWind}>Clounds</Text>
                  <Text style={styles.labelNumber}>{weathers?.main?.humidity}</Text>
                  <Text style={styles.labelUnit}>%</Text>
                  {
                    (Platform.OS === 'android')
                      ? (<ProgressBarAndroid
                        color={Colors.primaryProcess}
                        progress={hunidity && (hunidity / 100)}
                        styleAttr="Horizontal"
                        indeterminate={false}
                      />)
                      : (<ProgressView
                        progressTintColor={Colors.primaryProcess}
                        progress={hunidity && (hunidity / 100)}
                        styleAttr="Horizontal"
                        indeterminate={false}
                      />)
                  }
                </View>

              </View>
            </View>

          </Swiper>
        </View>

      </ScrollView>
      {/* </ImageBackground> */}
    </View>
  )
}
const styles = StyleSheet.create({
  labelUnit: {
    fontSize: 24 * calWidth,
    color: Colors.primaryWrite,
    ...Fonts.bold,
    lineHeight: 28 * calWidth,
    marginBottom: 9 * calWidth,
  },
  labelWind: {
    fontSize: 24 * calWidth,
    color: 'rgba(255, 255, 255, 0.7)',
    ...Fonts.bold,
    lineHeight: 28 * calWidth,
  },
  labelTime: {
    fontSize: 16 * calWidth,
    color: 'rgba(255, 255, 255, 0.7)',
    ...Fonts.bold,
    lineHeight: 28 * calWidth,
  },
  labelNumber: {
    fontSize: 36 * calWidth,
    color: Colors.primaryWrite,
    ...Fonts.bold,
  },
  styleStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28 * calWidth,
    paddingBottom: 40 * calWidth,
    borderBottomColor: '#998383',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginRight: 28 * calWidth,
  },
  status: {
    fontSize: 24 * calWidth,
    ...Fonts.bold,
    color: Colors.primaryWrite,
    marginLeft: 3,

  },
  temp: {
    fontSize: 96 * calWidth,
    color: Colors.primaryWrite,
    marginTop: 120 * calWidth,
  },
  titleCity: {
    color: Colors.primaryWrite,
    fontSize: 32 * calWidth,
  },
  container: {
    flex: 1,
  },
  imgContainer: {
    flex: 1,
    resizeMode: 'cover',
  },
  bgIcon: {
    flexDirection: 'row',
    width: 40 * calWidth,
    height: 40 * calWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8 * calWidth,
    height: 8 * calWidth,
    borderRadius: 4 * calWidth,
    marginRight: 7 * calWidth,
  },
})

export default HomeScreen
