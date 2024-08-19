import * as React from "react"
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"

function SearchIcon(props) {
  return (
    <Svg
      data-name="Group 3117"
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path data-name="Rectangle 1913" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
      <G data-name="Group 3112" clipPath="url(#a)">
        <Path
          data-name="Path 29"
          d="M15.528 14.317L13.414 12.2a7.393 7.393 0 10-1.47 1.318l2.19 2.19a.986.986 0 101.394-1.394M2.19 7.4a5.605 5.605 0 115.61 5.607A5.605 5.605 0 012.19 7.4"
          transform="translate(-.078)"
          fill={props.Color ? '#fff' : '#000'}
          // fillRule="evenodd"
        />
      </G>
    </Svg>
  )
}

export default SearchIcon
