import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

function GalleryBlockIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={68}
      height={74}
      viewBox="0 0 68 74"
      {...props}
    >
      <G data-name="Group 249" transform="translate(-992 -1606)">
        <Rect
          data-name="Rectangle 97"
          width={68}
          height={74}
          rx={4}
          transform="translate(992 1606)"
          fill="#dcd0d0"
        />
        <Path
          data-name="9a55573a9c9859ffc960fe0315c76763"
          d="M11.7 5.375a1.266 1.266 0 101.266 1.266A1.3 1.3 0 0011.7 5.375zM16.344 2H4.531A2.486 2.486 0 002 4.531v11.813a2.486 2.486 0 002.531 2.531h11.813a2.486 2.486 0 002.531-2.531V4.531A2.486 2.486 0 0016.344 2zm.844 10.041l-1.6-1.6a2.6 2.6 0 00-3.544 0l-.759.759-2.451-2.45a2.6 2.6 0 00-3.544 0l-1.6 1.6V4.531a.8.8 0 01.844-.844h11.81a.8.8 0 01.844.844z"
          transform="translate(1015.313 1632.688)"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default GalleryBlockIcon
