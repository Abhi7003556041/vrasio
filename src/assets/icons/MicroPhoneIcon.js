import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function MicroPhoneIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="Group 324" transform="translate(-44 -573)">
        <Path
          data-name="Rectangle 91"
          transform="translate(44 573)"
          fill="none"
          d="M0 0H24V24H0z"
        />
        <Path
          d="M15.465 8.126a.693.693 0 01.692.692A8.111 8.111 0 018.772 16.9v2.256a.693.693 0 11-1.385 0V16.9A8.111 8.111 0 010 8.818a.693.693 0 011.385 0 6.694 6.694 0 1013.388 0 .693.693 0 01.692-.692zM8.079 0a4.456 4.456 0 014.442 4.46v4.329a4.442 4.442 0 11-8.885 0V4.46A4.457 4.457 0 018.079 0zm0 1.385A3.07 3.07 0 005.021 4.46v4.329a3.057 3.057 0 006.114.069H9.067a.693.693 0 010-1.385h2.068v-1.7H9.989a.693.693 0 010-1.385h1.144v-.1a3.069 3.069 0 00-3.054-2.903z"
          stroke="#fff"
          strokeWidth={0.2}
          fillRule="evenodd"
          transform="translate(44.921 574.075) translate(3 1)"
          data-name="Iconly/Light-Outline/Voice-2"
        />
      </G>
    </Svg>
  )
}

export default MicroPhoneIcon
