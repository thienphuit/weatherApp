import React from 'react'
import {
  View, StyleSheet, Image, Text,
} from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, calWidth, Colors } from '../../assets/styles'

const TimeComponent = (props) => {
  const { icon, time, tempature } = props
  return (
    <View>
      <Text style={styles.labelTime}>{time}</Text>
      <Image
        source={{ uri: `http://openweathermap.org/img/w/${icon}.png` }}
        style={{
          width: 40 * calWidth,
          height: 40 * calWidth,
        }}
      />
      <Text style={styles.labelUnit}>{tempature}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  labelUnit: {
    fontSize: 24 * calWidth,
    color: Colors.primaryWrite,
    ...Fonts.bold,
    lineHeight: 28 * calWidth,
    marginBottom: 9 * calWidth,
  },
  labelTime: {
    fontSize: 16 * calWidth,
    color: 'rgba(255, 255, 255, 0.7)',
    ...Fonts.bold,
    lineHeight: 28 * calWidth,
  },
})
TimeComponent.propTypes = {
  time: PropTypes.string.isRequired,
  tempature: PropTypes.string.isRequired,

}
export default TimeComponent
