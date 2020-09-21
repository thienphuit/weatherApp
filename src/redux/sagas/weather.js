import {
  call, put, takeLatest,
} from 'redux-saga/effects'
import axios from 'axios'
import { typeWearther } from '../types'

function* fetchWether(action) {
  try {
    const weather = yield call(() => axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${action.payload.data}&appid=5a946fa5e49dfe52dca7c9e3e78e9463&units=metric`))
    yield put({ type: typeWearther.GET_WEATHER_SUCCESS, payload: { data: weather.data } })
  } catch (e) {
    yield put({ type: typeWearther.GET_WEATHER_FAIL, message: e.message })
  }
}
function* weatherSaga() {
  yield takeLatest(typeWearther.GET_WEATHER, fetchWether)
}

export default weatherSaga
