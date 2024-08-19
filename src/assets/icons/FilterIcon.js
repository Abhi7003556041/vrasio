import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function FilterIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 15 15"
      {...props}
    >
      <G
        data-name="Group 2993"
        fill="#fff"
        stroke="rgba(0,0,0,0)"
        strokeWidth={1}
      >
        <Path
          data-name="Union 1"
          d="M168.152 151.673H160v-2.339h7.846a3.129 3.129 0 11.306 2.339zm1.733-1.545a.987.987 0 10.986-.987.987.987 0 00-.986.987z"
          transform="translate(-159.5 -146.5)"
        />
        <Path
          data-name="Union 3"
          d="M165.85 156.332h8.149v2.34h-7.847a3.13 3.13 0 11-.3-2.339zm-1.736 1.539a.987.987 0 10-.986.986.988.988 0 00.986-.986z"
          transform="translate(-159.5 -146.5)"
        />
      </G>
    </Svg>
  )
}

export default FilterIcon
