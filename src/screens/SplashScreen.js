import React, { useEffect } from 'react'
import {
  View,
} from 'react-native'
import SplashScreenLib from 'react-native-splash-screen'
import { useDispatch } from 'react-redux'
import { weatherActions } from '../redux/actions'

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const getDataFromStorage = async () => {
    SplashScreenLib.hide()
    fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': 'd17ff6354fmshb1af75b7eca45efp161220jsnc813152349a3',
      },
    })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
    dispatch(weatherActions.getWeather('Ho Chi Minh'))
    navigation.replace('HomeScreen')
  }
  useEffect(() => {
    getDataFromStorage()
  }, [])
  return (
    <View />
  )
}
export default SplashScreen
