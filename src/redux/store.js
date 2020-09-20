import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import createEncryptor from 'redux-persist-transform-encrypt'
import rootReducer from './reducers'
import Reactotron from '../configs/ReactotronConfig'

const encryptor = createEncryptor({
  secretKey: 'reduxsdada',
  onError(error) {
    // Handle the error.
    console.log('============================')
    console.log('Encry', error)
    console.log('============================')
  },
})
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [encryptor],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, Reactotron.createEnhancer())
persistStore(store)

export default store
