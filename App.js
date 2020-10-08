import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { store } from './src/redux'
import { FlashScreen, HomeScreen, SplashScreen } from './src/screens'

// navigator.geolocation = require('@react-native-community/geolocation')

const Stack = createStackNavigator()
const Setting = (props) => {
  const { navigation } = props
  return (
    <View>
      <TouchableOpacity
        onPress={() => { navigation.goBack() }}
      >
        <Text>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
export default App
