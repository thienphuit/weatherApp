import React from 'react'
import { View, Dimensions } from 'react-native'
import {
  Circle, Path, G, Svg, Text,
} from 'react-native-svg'
import {
  AreaChart, LineChart,
} from 'react-native-svg-charts'

const { width } = Dimensions.get('window')

const LineGraphs = (props) => {
  const Decorator = ({ x, y }) => {
    return data.map((value, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Svg key={`list circle ${index}`}>
        <G>
          <Text
            // x={5 / 2}
            dy={y(value) - 20}
            alignmentBaseline="middle"
            dx={x(index)}
            // cy={y(value)}
            fontSize="20"
            textAnchor="middle"
            // stroke="rgb(134, 65, 244)"
            stroke="#fff"
            fill="#fff"
          >
            {`${value}º`}
          </Text>
          <Circle
            cx={x(index)}
            cy={y(value)}
            r={4}
            // stroke="rgb(134, 65, 244)"
            stroke="#fff"
            fill="white"
          />
        </G>
      </Svg>

    ))
  }
  const Line = ({ line }) => (
    <Path
      d={line}
      // stroke="rgba(134, 65, 244)"
      stroke="#fff"
      fill="none"
    />
  )
  const { data } = props
  return (
    <LineChart
      data={data}
      style={{
        height: 80 / 375 * width, width: width - 60 / 375 * width, position: 'absolute',
      }}
      // svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
      contentInset={{
        top: 30, bottom: 30, left: 20, right: 20,
      }}
    >
      <Line />
      <Decorator />
    </LineChart>
  )
}
// LineGraphs.defaultProps = {
//   width: 300,
//   height: 200,
// }
export default LineGraphs
