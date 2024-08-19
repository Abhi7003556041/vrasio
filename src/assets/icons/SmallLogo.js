import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SmallLogo(props) {
  return (
    <Svg
      data-name="Group 6024"
      xmlns="http://www.w3.org/2000/svg"
      width={12.411}
      height={16.548}
      viewBox="0 0 12.411 16.548"
      {...props}
    >
      <Path
        data-name="Ellipse 11"
        d="M5.907.788a5.123 5.123 0 105.119 5.123A5.127 5.127 0 005.907.788m0-.788A5.911 5.911 0 110 5.911 5.909 5.909 0 015.907 0z"
        transform="translate(.298 .172)"
        fill={props.Color}
      />
      <Path
        data-name="Ellipse 11 - Outline"
        d="M5.829-.25A6.084 6.084 0 11-.25 5.834 6.088 6.088 0 015.829-.25zm0 11.823A5.739 5.739 0 10.094 5.834a5.743 5.743 0 005.735 5.739zm0-11.034a5.3 5.3 0 11-5.292 5.3A5.3 5.3 0 015.829.538zm0 10.246A4.951 4.951 0 10.882 5.834a4.955 4.955 0 004.947 4.95z"
        transform="translate(.376 .25)"
        fill={props.Color}
      />
      <Path
        data-name="Polygon 1"
        d="M5.907 1.577L1.364 9.458h9.086L5.907 1.577m0-1.577l5.907 10.246H0z"
        transform="translate(.298 6.129)"
        fill={props.Color}
      />
      <Path
        data-name="Polygon 1 - Outline"
        d="M5.772-.5l6.205 10.764H-.433zm5.609 10.419L5.772.19.164 9.919zM5.772 1.077l4.842 8.4H.931zm4.246 8.053L5.772 1.767 1.527 9.13z"
        transform="translate(.433 6.284)"
        fill={props.Color}
      />
    </Svg>
  )
}

export default SmallLogo
