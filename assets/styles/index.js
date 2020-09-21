import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export const paddingHeight = 34 / 375 * width
export const calWidth = width / 375

export const Colors = {
  primaryWrite: '#fff',
  primaryProcess: '#1BED62',
  primaryDot: '#B4B4B4',
}
export const Fonts = {
  bold: {
    fontFamily: 'Gilroy-Bold',
  },
}
