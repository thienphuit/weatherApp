import React, { useEffect } from 'react'
import {
  View, Image, Dimensions, StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import SplashScreen from 'react-native-splash-screen'
import { background } from '../../assets/images'

const { width, height } = Dimensions.get('window')

const FlashScreen = ({ navigation }) => {
  const getDataFromStorage = async () => {
    const oldWeather = await AsyncStorage.getItem('weather')
    SplashScreen.hide()
    setTimeout(() => {
      navigation.replace('HomeScreen', {
        oldWeather: JSON.parse(oldWeather),
      })
    }, 1000)
  }
  useEffect(() => {
    getDataFromStorage()
  }, [])
  return (
    <View style={styles.container}>
      <Image source={background} style={{ width, height }} resizeMode="cover" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
export default FlashScreen
