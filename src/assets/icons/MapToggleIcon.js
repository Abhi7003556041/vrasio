import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MapToggleIcon(props) {
  return (
    <Svg
      data-name="Group 6021"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        data-name="Path 35"
        d="M23.491 6a.4.4 0 00-.155.025L17.994 8.1 12 6 6.365 7.9A.508.508 0 006 8.379v15.112a.5.5 0 00.655.475L12 21.892l6 2.1 5.631-1.892a.515.515 0 00.36-.485V6.5a.5.5 0 00-.5-.5zm-5.5 15.992l-6-2.1V8l6 2.1z"
        transform="translate(-2.995 -2.995)"
        fill="#fff"
      />
      <Path data-name="Path 36" d="M0 0h24v24H0z" fill="none" />
    </Svg>
  )
}

export default MapToggleIcon
