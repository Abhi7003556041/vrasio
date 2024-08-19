import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function HomeDisabledIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        data-name="Group 6024"
        transform="translate(-52 -840) translate(52 840)"
      >
        <Path data-name="Rectangle 1924" fill="none" d="M0 0H24V24H0z" />
        <G data-name="Iconly/Bold/Home">
          <Path
            data-name="Path 37"
            d="M6.635 18.773v-3.057A1.419 1.419 0 018.058 14.3h2.874a1.429 1.429 0 011.007.414 1.408 1.408 0 01.417 1v3.058a1.213 1.213 0 00.356.867 1.231 1.231 0 00.87.36h1.961a3.461 3.461 0 002.443-1A3.41 3.41 0 0019 16.578V7.867a2.473 2.473 0 00-.9-1.9L11.434.676a3.1 3.1 0 00-3.949.071L.967 5.965A2.474 2.474 0 000 7.867v8.7A3.444 3.444 0 003.456 20h1.916a1.231 1.231 0 001.236-1.218z"
            fill="none"
            stroke="#000"
            strokeWidth={1.5}
            transform="translate(2.5 2)"
          />
        </G>
      </G>
    </Svg>
  )
}

export default HomeDisabledIcon
// export default SvgComponent

