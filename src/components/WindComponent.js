import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, calWidth, Colors } from '../../assets/styles'

const WindComponent = (props) => {
  const { speed, unit, label } = props
  return (
    <View>
      <Text style={styles.labelWind}>{label}</Text>
      <Text style={styles.labelNumber}>{speed}</Text>
      <Text style={styles.labelUnit}>{unit}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  labelWind: {
    fontSize: 24 * calWidth,
    color: 'rgba(255, 255, 255, 0.7)',
    ...Fonts.bold,
    lineHeight: 28 * calWidth,
  },
  labelUnit: {
    fontSize: 24 * calWidth,
    color: Colors.primaryWrite,
    ...Fonts.bold,
    lineHeight: 28 * calWidth,
    marginBottom: 9 * calWidth,
  },
  labelNumber: {
    fontSize: 36 * calWidth,
    color: Colors.primaryWrite,
    ...Fonts.bold,
  },
})
WindComponent.propTypes = {
  label: PropTypes.string.isRequired,
  // speed: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,

}
export default WindComponent
