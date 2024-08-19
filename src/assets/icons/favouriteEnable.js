import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function FavouriteEnable(props) {
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
          d="M10.5 1.066a7.068 7.068 0 015.8-.732c4.163 1.342 5.455 5.881 4.3 9.492-1.783 5.671-9.4 9.9-9.724 10.079a.768.768 0 01-.737 0c-.329-.174-7.89-4.342-9.733-10.079C-.752 6.213.536 1.674 4.695.333a6.9 6.9 0 015.805.733z"
          fill="#e15454"
          fillRule="evenodd"
          transform="translate(51.502 839) translate(2 3)"
          data-name="Iconly/Light-Outline/Heart"
        />
      </G>
    </Svg>
  )
}

export default FavouriteEnable
