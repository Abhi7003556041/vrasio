import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function LockIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 22 22"
      {...props}
    >
      <G data-name="Group 6402" transform="translate(-310 -171)" 
      opacity={1}
      // opacity={props.stat=='prime' ? 1 : 0.5}
      >
        <Path
          data-name="Rectangle 2644"
          transform="translate(310 171)"
          fill="none"
          d="M0 0H22V22H0z"
        />
        <G data-name="Iconly/Bold/Lock">
          <Path
            data-name="Path 570"
            d="M7.886 0a5.076 5.076 0 015.147 5.015V6.44a3.877 3.877 0 012.767 3.68v4.588a3.924 3.924 0 01-3.967 3.88H3.967A3.925 3.925 0 010 14.708V10.12a3.879 3.879 0 012.767-3.68V5.015A5.081 5.081 0 017.886 0zM7.9 10.581a.813.813 0 00-.822.8v2.05a.826.826 0 001.653 0v-2.05a.816.816 0 00-.831-.8zm0-8.965A3.445 3.445 0 004.42 5v1.24h6.96V5.015A3.441 3.441 0 007.9 1.616z"
            fill="#fff"
            transform="translate(309.6 170.706) translate(3.5 2)"
          />
        </G>
      </G>
    </Svg>
  )
}

export default LockIcon
