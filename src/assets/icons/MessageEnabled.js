import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function MessageEnable(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="Group 6027" transform="translate(-52 -840)">
        <Path
          data-name="Rectangle 1924"
          transform="translate(52 840)"
          fill="none"
          d="M0 0H24V24H0z"
        />
        <Path
          d="M16.06 1c3.415 0 5.991 2.787 5.991 6.482v7.044a6.709 6.709 0 01-1.884 4.812A5.67 5.67 0 0116.077 21H5.971a5.666 5.666 0 01-4.087-1.662A6.709 6.709 0 010 14.526V7.482C0 3.787 2.575 1 5.991 1zm1.616 6.286a.77.77 0 01-.112 1.082l-4.558 3.7a3.12 3.12 0 01-3.9.006L4.511 8.37a.769.769 0 11.965-1.2l4.6 3.7a1.583 1.583 0 001.972 0l4.55-3.7a.768.768 0 011.079.116z"
          transform="translate(51.974 840) translate(1 2) translate(0 -1)"
          fill="#e15454"
          fillRule="evenodd"
          data-name="Iconly/Light-Outline/Message"
        />
      </G>
    </Svg>
  )
}

export default MessageEnable
