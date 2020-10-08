import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native'
import Swiper from 'react-native-swiper'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import {
  iconSearch, drawer, cloudy, raining, sun,
} from '../../assets/images'
import { Colors, paddingHeight, Fonts } from '../../assets/styles'
import { LineGraphs, TimeComponent, WindComponent } from '../components'
import { weatherActions } from '../redux/actions'

// let timeOut

const { width, height } = Dimensions.get('window')
const calWidth = width / 375
const data = [29, 31, 27, 26, 35, 28]
const listData = [
  '1',
  '2',
]

const HomeScreen = () => {
  // const [weathers, setWeather] = useState([])
  const [nameCity, setNameCity] = useState('Ho Chi Minh')
  const [indexChanged, setIndexChanged] = useState(0)
  const [bgImage, setBgImage] = useState(raining)
  const [textInput, setTextInput] = useState('')
  const dispatch = useDispatch()
  const weathers = useSelector((state) => state.weather)
  const aniValue = useRef(new Animated.Value(0)).current

  const handleInputSearch = () => {
    Animated.spring(aniValue, {
      toValue: 1,
      tension: 100,
      useNativeDriver: true,
    }).start()
  }
  const handleHideInput = () => {
    Animated.spring(aniValue, {
      toValue: 0,
      tension: 100,
      useNativeDriver: true,
    }).start()
  }
  const tranX = aniValue.interpolate({
    inputRange: [0, 1],
    outputRange: [300 * calWidth, 0],
  })

  const handleChangeBacground = () => {
    // const wearther = weathers?.weather && weathers?.weather[0]
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
  useEffect(() => {
    if (indexChanged === 0) {
      getData('Ho Chi Minh')
      handleChangeBacground()
    } else {
      getData('Ha Noi')
      handleChangeBacground()
    }
  }, [indexChanged])
  const handleSearch = () => {
    handleInputSearch()
  }
  const getData = async (name) => {
    dispatch(weatherActions.getWeather(name))
  }

  useEffect(() => {
    getData(nameCity)
  }, [])

  const handlePagination = (index, total) => {
    const dotViews = []
    for (let indexPagination = 0; indexPagination < total; indexPagination++) {
      dotViews.push(
        <View
          key={indexPagination}
          style={[styles.dot, { backgroundColor: indexPagination === index ? Colors.primaryWrite : Colors.primaryDot }]}
        />
      )
    }
    return (
      <View style={styles.dotView}>
        {dotViews}
      </View>
    )
  }
  const handleOnKeyPress = () => {
    getData(textInput)
    handleHideInput()
  }
  const wearther = weathers?.weather && weathers.weather[0]
  const now = moment().format('LT - dddd,DD MMM YYYY')
  return (
    <View style={styles.container}>
      { bgImage && <Image
        source={bgImage}
        style={{ position: 'absolute', width, height }}
        resizeMode="cover"
      />}
      <SafeAreaView />
      <View style={styles.viewHeader}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          <TouchableOpacity onPress={handleSearch}>
            <View style={styles.bgIcon}>
              <Image
                source={iconSearch}
                style={styles.imageIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <Animated.View style={{
            height: 40,
            borderRadius: 5,
            backgroundColor: Colors.primaryWrite,
            justifyContent: 'center',
            flex: 1,
            marginHorizontal: 10,
            opacity: aniValue,
            transform: [{
              translateX: tranX,
            }],
          }}
          >
            <TextInput
              placeholder="Search..."
              placeholderTextColor={Colors.primaryProcess}
              returnKeyType="google"
              style={{ marginLeft: 10 }}
              onChangeText={(text) => setTextInput(text)}
              onSubmitEditing={handleOnKeyPress}
            // keyboardType="phone-pad"
            />
          </Animated.View>
        </View>
        <View style={styles.bgIcon}>
          <Image
            source={drawer}
            style={styles.imageIcon}
            resizeMode="contain"
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewSwipperWrapper}>
          <Swiper
            showsPagination
            loadMinimal
            loadMinimalSize={width * 0.5}
            renderPagination={handlePagination}
            onIndexChanged={(index) => {
              setIndexChanged(index)
            }}
          >
            {listData.map((item) => {
              return (
                <View style={{ marginTop: 28 }} key={item}>
                  <Text style={styles.titleCity}>{weathers?.name}</Text>
                  <Text style={styles.formatTime}>
                    {now}
                  </Text>
                  <Text style={styles.temp}>{`${weathers?.main?.temp.toFixed()} *`}</Text>
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
                  <View style={[styles.styleStatus, { justifyContent: 'space-between' }]}>
                    <WindComponent speed={weathers?.wind?.speed} label="Wind" unit="Km/h" />
                    <WindComponent speed={0} label="Rain" unit="mi/h" />
                    <WindComponent speed={weathers?.main?.humidity} label="Clounds" unit="%" />
                  </View>
                  <View style={styles.timeHour}>
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
              )
            })}
            {/* Create component  re-call */}
          </Swiper>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: paddingHeight,
  },
  timeHour: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  formatTime: {
    color: Colors.primaryWrite, ...Fonts.bold, fontSize: 18, marginTop: 8,
  },
  viewSwipperWrapper: {
    marginTop: 57 * calWidth, paddingLeft: paddingHeight, flex: 1,
  },
  imageIcon: {
    width: 28 * calWidth,
    height: 28 * calWidth,
  },
  dotView: {
    flexDirection: 'row',
    marginLeft: 3,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
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
