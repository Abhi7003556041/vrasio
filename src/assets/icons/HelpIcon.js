import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function HelpIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}
    >
      <G data-name="Group 6229" transform="translate(-24 -232)">
        <Circle
          data-name="Ellipse 253"
          cx={16}
          cy={16}
          r={16}
          transform="translate(24 232)"
          fill="none"
        />
        <G data-name="Group 3177">
          <Path
            data-name="Path 214"
            d="M20.126 10.575a.791.791 0 01-.791-.791V7.551c0-3.163-2.923-5.694-6.517-5.694S6.3 4.419 6.3 7.551v2.233a.791.791 0 11-1.582 0V7.551c0-4.024 3.638-7.3 8.1-7.3s8.1 3.277 8.1 7.3v2.233a.785.785 0 01-.791.791z"
            transform="translate(28.381 236.836) translate(-1.186)"
          />
          <Path
            data-name="Path 215"
            d="M16.8 23.066a.791.791 0 01-.791-.791v-7.51A.791.791 0 0116.8 14a4.769 4.769 0 014.947 4.549 4.744 4.744 0 01-4.947 4.517zm.791-7.428V21.4a3.075 3.075 0 002.569-2.879 3.075 3.075 0 00-2.569-2.882zM6.437 23.066a4.764 4.764 0 01-4.947-4.542A4.749 4.749 0 016.437 14a.791.791 0 01.791.791v7.484a.791.791 0 01-.791.791zm-.791-7.428a3.075 3.075 0 00-2.569 2.885 3.075 3.075 0 002.57 2.877z"
            transform="translate(28.381 236.836) translate(0 -5.051)"
          />
          <Path
            data-name="Path 216"
            d="M23.3 29.924h-2.619a.791.791 0 110-1.582H23.3a1.544 1.544 0 001.544-1.542v-.348a.791.791 0 111.582 0v.348a3.125 3.125 0 01-3.126 3.124z"
            transform="translate(28.381 236.836) translate(-6.759 -9.334)"
          />
          <Path
            data-name="Path 217"
            d="M16.836 32.19h-1.562a2.164 2.164 0 01-2.164-2.164v-.089a2.164 2.164 0 012.164-2.157h1.563a2.157 2.157 0 012.157 2.157v.089a2.164 2.164 0 01-2.157 2.164zm-1.55-2.828a.582.582 0 00-.582.576v.089a.582.582 0 00.582.582h1.55a.582.582 0 00.576-.582v-.089a.576.576 0 00-.576-.576z"
            transform="translate(28.381 236.836) translate(-4.268 -10.113)"
          />
        </G>
      </G>
    </Svg>
  )
}

export default HelpIcon
