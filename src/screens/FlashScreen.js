import React, { useEffect } from 'react'
import {
  View, Image, Dimensions, StyleSheet,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch } from 'react-redux'
import { background } from '../../assets/images'
import { weatherActions } from '../redux/actions'

const { width, height } = Dimensions.get('window')

const FlashScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const getDataFromStorage = async () => {
    SplashScreen.hide()
    dispatch(weatherActions.getWeather('Ho Chi Minh'))
    navigation.replace('HomeScreen')
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
