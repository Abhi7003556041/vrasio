import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function EditIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={9}
      height={8.737}
      viewBox="0 0 9 8.737"
      {...props}
    >
      <G data-name="Group 2688" fill="#fff">
        <Path
          data-name="Path 1198"
          d="M140.042 405.509l-1.8-.143-.143-1.8 5.536-5.536 1.939 1.939z"
          transform="translate(-278.5 -243.263) translate(140.642 -154.771)"
        />
        <Path
          data-name="Path 1314"
          d="M9 .5H0v-1h9z"
          transform="translate(-278.5 -243.263) translate(278.5 251.5)"
        />
      </G>
    </Svg>
  )
}

export default EditIcon
