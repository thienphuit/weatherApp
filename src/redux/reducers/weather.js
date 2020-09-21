import { typeWearther } from '../types'

const initState = {
  listWheather: [],
}

const weatherReducer = (state = initState, action) => {
  switch (action.type) {
    case typeWearther.GET_WEATHER_SUCCESS:
      return {
        ...action.payload.data,
      }

    default:
      return state
  }
}

export default weatherReducer
