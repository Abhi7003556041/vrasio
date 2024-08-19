import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function FavouriteIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="Group 6026" transform="translate(-52 -840)">
        <Path
          data-name="Rectangle 1924"
          transform="translate(52 840)"
          fill="none"
          d="M0 0H24V24H0z"
        />
        <Path
          d="M10.5 1.066a7.068 7.068 0 015.8-.732c4.163 1.342 5.455 5.881 4.3 9.492-1.783 5.671-9.4 9.9-9.724 10.079a.768.768 0 01-.737 0c-.329-.174-7.89-4.342-9.733-10.079C-.752 6.213.536 1.674 4.695.333a6.9 6.9 0 015.805.733zM5.167 1.8C1.8 2.883.957 6.5 1.87 9.356c1.438 4.474 7.119 8.091 8.628 8.986 1.515-.9 7.237-4.562 8.628-8.982.914-2.857.066-6.477-3.3-7.563a5.424 5.424 0 00-4.852.812.769.769 0 01-.933.006A5.368 5.368 0 005.167 1.8z"
          fillRule="evenodd"
          transform="translate(51.502 839) translate(2 3)"
          data-name="Iconly/Light-Outline/Heart"
        />
      </G>
    </Svg>
  )
}

export default FavouriteIcon
