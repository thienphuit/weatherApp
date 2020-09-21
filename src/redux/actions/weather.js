import { typeWearther } from '../types'

export const getWeather = (data) => {
  return {
    type: typeWearther.GET_WEATHER,
    payload: { data },
  }
}
