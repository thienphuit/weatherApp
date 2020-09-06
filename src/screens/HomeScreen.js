import React, { useState, useEffect } from 'react'
import {
  View, Text, SafeAreaView, Image, StyleSheet, Dimensions, ImageBackground, ScrollView, ProgressBarAndroid, Platform,
} from 'react-native'
import axios from 'axios'
import Swiper from 'react-native-swiper'
import { ProgressView } from '@react-native-community/progress-view'
import LottieView from 'lottie-react-native'
import {
  iconSearch, bg_weather, drawer,
} from '../../assets/images'
import { Colors, paddingHeight, Fonts } from '../../assets/styles'
import { moto } from '../../assets/animations'

// let timeOut

const { width } = Dimensions.get('window')
const calWidth = width / 375

const HomeScreen = () => {
  const [weathers, setWeather] = useState([])
  const [nameCity, setNameCity] = useState('')

  const getData = async () => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${nameCity === 'Ho Chi Minh' ? 'Ha Noi' : 'Ho Chi Minh'}&appid=751bbe868e283f6d883ca706edfcbc37&units=metric`)
    setWeather(response.data)
    setNameCity(nameCity === 'Ho Chi Minh' ? 'Ha Noi' : 'Ho Chi Minh')
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (weathers.length <= 0) {
        getData()
        clearTimeout(timeOut) // Clear khi call : Timeout ton tai nguyen cua may 
      }
    }, 2000)
  }, [])

  const handlePagination = (index, total) => {
    const dotViews = []
    for (let indexPagination = 0; indexPagination < total; indexPagination++) {
      dotViews.push(
        <View
          key={indexPagination}
          style={{
            width: 8 * calWidth,
            height: 8 * calWidth,
            borderRadius: 4 * calWidth,
            backgroundColor: indexPagination === index ? Colors.primaryWrite : '#B4B4B4',
            marginRight: 7 * calWidth,
          }}
        />
      )
    }
    return (

      <View style={{
        flexDirection: 'row', marginLeft: 3, position: 'absolute', backgroundColor: 'transparent',
      }}
      >
        {dotViews}

      </View>

    )
  }

  if (weathers.length <= 0) {
    return (
      <View style={styles.container}>
        <LottieView
          style={{ flex: 1, backgroundColor: 'green' }}
          source={moto}
          autoPlay
          loop
        />

      </View>
    )
  }
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const wearther = weathers.weather && weathers.weather[0]
  const hunidity = weathers?.main?.humidity
  return (

    <ScrollView>
      <View style={styles.container}>
        <ImageBackground source={bg_weather} style={styles.imgContainer}>
          <SafeAreaView />
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: paddingHeight,
          }}
          >
            <View style={styles.bgIcon}>
              <Image
                source={iconSearch}
                style={{
                  width: 28 * calWidth,
                  height: 28 * calWidth,
                }}
                resizeMode="contain"
              />
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
                    break
                  }
                  case 1: {
                    getData()
                    break
                  }
                  default:
                    console.log('===============')
                    console.log('ssss')
                    console.log('===============')
                }
              }}
            >
              <View style={{ marginTop: 28 }}>
                <Text style={styles.titleCity}>{weathers?.name}</Text>
                <Text style={{
                  color: Colors.primaryWrite, ...Fonts.bold, fontSize: 18, marginTop: 8,
                }}
                >
                  {`${hours} : ${minutes} - ${date.toDateString()}`}
                </Text>
                <Text style={styles.temp}>{`${weathers?.main?.temp} *`}</Text>
                <View style={styles.styleStatus}>
                  <Image source={{ uri: `http://openweathermap.org/img/w/${wearther?.icon}.png` }} style={{ width: 40 * calWidth, height: 40 * calWidth }} />
                  <Text style={styles.status}>{wearther?.main}</Text>
                </View>
                <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View>
                    <Text style={styles.labelWind}>Wind</Text>
                    <Text style={styles.labelNumber}>{weathers?.wind?.speed}</Text>
                    <Text style={styles.labelUnit}>Km/h</Text>
                    {
                      (Platform.OS === 'android')
                        ? (<ProgressBarAndroid color={Colors.primaryProcess} progress={0.4} styleAttr="Horizontal" indeterminate={false} />)
                        : (<ProgressView progressTintColor={Colors.primaryProcess} progress={0.4} />)
                    }
                  </View>
                  <View>
                    <Text style={styles.labelWind}>Rain</Text>
                    <Text style={styles.labelNumber}>0</Text>
                    <Text style={styles.labelUnit}>%</Text>
                    {
                      (Platform.OS === 'android')
                        ? (<ProgressBarAndroid color={Colors.primaryProcess} progress={0.6} styleAttr="Horizontal" indeterminate={false} />)
                        : (<ProgressView progressTintColor={Colors.primaryProcess} progress={0.6} />)
                    }
                  </View>
                  <View>
                    <Text style={styles.labelWind}>Humidity</Text>
                    <Text style={styles.labelNumber}>{weathers?.main?.humidity}</Text>
                    <Text style={styles.labelUnit}>%</Text>
                    {
                      (Platform.OS === 'android')
                        ? (<ProgressBarAndroid color={Colors.primaryProcess} progress={hunidity && (hunidity / 100)} styleAttr="Horizontal" indeterminate={false} />)
                        : (<ProgressView progressTintColor={Colors.primaryProcess} progress={hunidity && (hunidity / 100)} />)
                    }
                  </View>

                </View>
              </View>
              {/* Create component  re-call */}
              <View style={{ marginTop: 28 }}>
                <Text style={styles.titleCity}>{weathers?.name}</Text>
                <Text style={{
                  color: Colors.primaryWrite, ...Fonts.bold, fontSize: 18, marginTop: 8,
                }}
                >
                  {`${hours} : ${minutes} - ${date.toDateString()}`}
                </Text>
                <Text style={styles.temp}>{`${weathers?.main?.temp} *`}</Text>
                <View style={styles.styleStatus}>
                  <Image source={{ uri: `http://openweathermap.org/img/w/${wearther?.icon}.png` }} style={{ width: 40 * calWidth, height: 40 * calWidth }} />
                  <Text style={styles.status}>{wearther?.main}</Text>
                </View>
                <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View>
                    <Text style={styles.labelWind}>Wind</Text>
                    <Text style={styles.labelNumber}>{weathers?.wind?.speed}</Text>
                    <Text style={styles.labelUnit}>Km/h</Text>
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
                    <Text style={styles.labelWind}>Humidity</Text>
                    <Text style={styles.labelNumber}>{weathers?.main?.humidity}</Text>
                    <Text style={styles.labelUnit}>%</Text>
                    {
                      (Platform.OS === 'android')
                        ? (<ProgressBarAndroid color={Colors.primaryProcess} progress={hunidity && (hunidity / 100)} styleAttr="Horizontal" indeterminate={false} />)
                        : (<ProgressView progressTintColor={Colors.primaryProcess} progress={hunidity && (hunidity / 100)} styleAttr="Horizontal" indeterminate={false} />)
                    }
                  </View>

                </View>
              </View>

            </Swiper>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
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
  labelNumber: {
    fontSize: 36 * calWidth,
    color: Colors.primaryWrite,
    ...Fonts.bold,
  },
  styleStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28 * calWidth,
    paddingBottom: 52 * calWidth,
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
    // backgroundColor: 'green',
  },
  imgContainer: {
    flex: 1,
    resizeMode: 'cover',
  },
  bgIcon: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    width: 40 * calWidth,
    height: 40 * calWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeScreen
