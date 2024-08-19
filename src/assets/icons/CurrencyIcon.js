import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function CurrencyIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}
    >
      <G data-name="Group 6229" transform="translate(-24 -232)">
        <Circle
          data-name="Ellipse 253"
          cx={16}
          cy={16}
          r={16}
          transform="translate(24 232)"
          fill="none"
        />
        <G
          data-name="Ellipse 258"
          transform="translate(28 240)"
          fill="#fff"
          stroke="#000"
          strokeWidth={1.5}
        >
          <Circle cx={8} cy={8} r={8} stroke="none" />
          <Circle cx={8} cy={8} r={7.25} fill="none" />
        </G>
        <G
          data-name="Ellipse 259"
          transform="translate(37 235)"
          fill="#fff"
          stroke="#000"
          strokeWidth={1.5}
        >
          <Circle cx={8} cy={8} r={8} stroke="none" />
          <Circle cx={8} cy={8} r={7.25} fill="none" />
        </G>
        <Path
          data-name="Line 400"
          transform="translate(42.5 242.5)"
          fill="none"
          stroke="#000"
          strokeWidth={1.5}
          d="M0 0L3 0"
        />
        <Path
          data-name="Line 401"
          transform="translate(45.5 244.5)"
          fill="none"
          stroke="#000"
          strokeWidth={1.5}
          d="M0 0L3 0"
        />
      </G>
    </Svg>
  )
}

export default CurrencyIcon
