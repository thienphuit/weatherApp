import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import createEncryptor from 'redux-persist-transform-encrypt'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import Reactotron from '../configs/ReactotronConfig'
import rootSaga from './sagas'

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
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeMiddle = compose

const store = createStore(persistedReducer, composeMiddle(
  Reactotron.createEnhancer(),
  applyMiddleware(sagaMiddleware)
))
sagaMiddleware.run(rootSaga)
persistStore(store)

export default store
