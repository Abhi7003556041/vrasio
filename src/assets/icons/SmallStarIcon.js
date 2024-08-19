import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SmallStarIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={10}
      viewBox="0 0 10 10"
      {...props}
    >
      <G data-name="Group 29" transform="translate(0 .167)">
        <Path
          data-name="Rectangle 21"
          transform="translate(0 -.167)"
          fill="none"
          d="M0 0H10V10H0z"
        />
        <G data-name="Iconly/Bold/Star">
          <Path
            data-name="Path 34"
            d="M6.555 4.868a.453.453 0 00-.131.4l.366 2.025a.445.445 0 01-.185.445.453.453 0 01-.482.033L4.3 6.819a.466.466 0 00-.206-.054h-.112a.334.334 0 00-.111.037l-1.824.956a.481.481 0 01-.292.045.458.458 0 01-.367-.523l.367-2.026a.461.461 0 00-.131-.4L.135 3.41a.445.445 0 01-.111-.465.462.462 0 01.366-.309l2.047-.3a.458.458 0 00.363-.248L3.7.239a.429.429 0 01.084-.111L3.821.1a.276.276 0 01.066-.055l.045-.016L4 0h.173a.461.461 0 01.362.247l.914 1.841a.458.458 0 00.342.251l2.047.3a.467.467 0 01.375.309.447.447 0 01-.113.462z"
            transform="translate(.881 .921)"
          />
        </G>
      </G>
    </Svg>
  )
}

export default SmallStarIcon
