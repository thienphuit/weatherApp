import { all } from 'redux-saga/effects'
import weatherSaga from './weather'

export default function* rootSaga() {
  yield all([weatherSaga()])
}
