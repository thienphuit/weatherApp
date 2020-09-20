import { typeWearther } from '../types'

const initState = {
  listWheather: [],
}

const weatherReducer = (state = initState, action) => {
  switch (action.type) {
    case typeWearther.GET_WEATHER:
      return {
        ...state, ...state.listWheather,
      }

    default:
      return state
  }
}

export default weatherReducer
