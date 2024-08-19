import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function MenuIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="Group 6028" transform="translate(-52 -840)">
        <Path
          data-name="Rectangle 1924"
          transform="translate(52 840)"
          fill="none"
          d="M0 0H24V24H0z"
        />
        <Path
          data-name="Path 38"
          d="M18.726 2a.946.946 0 11-.1 1.891H.954A.945.945 0 11.954 2H18.63a.945.945 0 01.095 0zm0 7.959a.946.946 0 11-.1 1.891H.954a.945.945 0 110-1.891H18.725zm0 7.959a.946.946 0 11-.1 1.891H.954a.945.945 0 110-1.891H18.63a.945.945 0 01.095 0z"
          transform="translate(54.183 841.095)"
          fillRule="evenodd"
        />
      </G>
    </Svg>
  )
}

export default MenuIcon
