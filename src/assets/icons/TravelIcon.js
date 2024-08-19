import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
import Theme from "../../Constants/Theme"

function TravelIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      viewBox="0 0 20 20"
      {...props}
    >
      <G data-name="Group 6311" transform="translate(-44 -541)">
        <Path
          data-name="Rectangle 2934"
          transform="translate(44 541)"
          fill="none"
          d="M0 0H20V20H0z"
        />
        <G data-name="Group 6310" fill={Theme.colors.secondary}>
          <Path
            data-name="Path 5555"
            d="M31.889 7.944A1.944 1.944 0 1129.944 6a1.944 1.944 0 011.945 1.944z"
            transform="translate(38 535) translate(-9.778)"
          />
          <Path
            data-name="Path 5556"
            d="M25.056 8.778a.833.833 0 10-.833-.833.833.833 0 00.833.833zm0 1.111a1.944 1.944 0 10-1.944-1.944 1.944 1.944 0 001.944 1.944zm-6.944 1.667a1.111 1.111 0 000 2.222H22v11.111a1.111 1.111 0 002.222 0v-5h1.667v5a1.111 1.111 0 002.222 0v-6.713a3.334 3.334 0 00-.556-6.621zm11.111 3.333a1.111 1.111 0 00-1.111-1.111V16a1.111 1.111 0 001.11-1.111z"
            transform="translate(38 535) translate(-4.889)"
            fillRule="evenodd"
          />
          <Path
            data-name="Path 5557"
            d="M6 29.333a1.111 1.111 0 011.111-1.111h7.222a1.111 1.111 0 011.111 1.111v4.444a1.111 1.111 0 01-1.111 1.111H7.111A1.111 1.111 0 016 33.778zm2.222 3.889v-3.333h1.111v3.333zm3.889-3.333v3.333h1.111v-3.333zm-3.333-2.778A1.111 1.111 0 019.889 26h1.667a1.111 1.111 0 011.111 1.111v1.111h-1.111v-1.111H9.889v1.111H8.778z"
            transform="translate(38 535) translate(0 -8.889)"
            fillRule="evenodd"
          />
        </G>
      </G>
    </Svg>
  )
}

export default TravelIcon
