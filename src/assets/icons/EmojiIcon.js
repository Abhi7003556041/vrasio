import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"

function EmojiIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="Group 325" transform="translate(-44 -573)">
        <Path
          data-name="Rectangle 91"
          transform="translate(44 573)"
          fill="none"
          d="M0 0H24V24H0z"
        />
        <G data-name="Group 298" transform="translate(-251.763 563.237)">
          <G
            data-name="Rectangle 118"
            fill="none"
            stroke="#000"
            strokeWidth={1.5}
          >
            <Path
              d="M4 0h12a4 4 0 014 4v8a8 8 0 01-8 8H4a4 4 0 01-4-4V4a4 4 0 014-4z"
              stroke="none"
              transform="translate(297.763 11.763)"
            />
            <Path
              d="M4 .75h12A3.25 3.25 0 0119.25 4v8A7.25 7.25 0 0112 19.25H4A3.25 3.25 0 01.75 16V4A3.25 3.25 0 014 .75z"
              transform="translate(297.763 11.763)"
            />
          </G>
          <Path
            data-name="Path 34"
            d="M309.517 30.388V23.67h7.269"
            fill="none"
            stroke="#000"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
          <Circle
            data-name="Ellipse 9"
            cx={1}
            cy={1}
            r={1}
            transform="translate(302.763 18.763)"
          />
          <Circle
            data-name="Ellipse 10"
            cx={1}
            cy={1}
            r={1}
            transform="translate(310.763 18.763)"
          />
          <Path
            data-name="Path 35"
            d="M303.865 24.586a4.156 4.156 0 003.429 1.356c2.3-.113 2.223-1.356 2.223-1.356"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeWidth={1.5}
          />
        </G>
      </G>
    </Svg>
  )
}

export default EmojiIcon
