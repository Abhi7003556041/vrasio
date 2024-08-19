import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function CameraIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18.317}
      height={16.485}
      viewBox="0 0 18.317 16.485"
      {...props}
    >
      <G data-name="Iconly/Bold/Camera">
        <Path
          data-name="Path 39"
          d="M11.311 0a2.236 2.236 0 012.033 1.29c.109.217.26.535.419.869l.192.4.094.2.092.2a.208.208 0 00.183.11 4 4 0 013.993 3.989V12.5a4 4 0 01-3.993 3.989H3.993A3.994 3.994 0 010 12.5V7.062a3.994 3.994 0 013.993-3.988.18.18 0 00.174-.11l.055-.11c.256-.54.568-1.2.751-1.564A2.223 2.223 0 017 0h4.314zM9.158 5.864A3.591 3.591 0 006.6 6.925a3.539 3.539 0 00-1.041 2.534 3.6 3.6 0 103.6-3.6zm0 1.372a2.225 2.225 0 11-2.225 2.223V9.45a2.148 2.148 0 01.641-1.555 2.218 2.218 0 011.584-.659zM14.3 5.644a.828.828 0 10.833.832.828.828 0 00-.833-.832z"
          fill="#fff"
          transform="translate(-2 -3) translate(2 3)"
        />
      </G>
    </Svg>
  )
}

export default CameraIcon
