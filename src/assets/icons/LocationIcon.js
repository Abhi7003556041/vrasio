import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function LocationIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <G data-name="Group 185" transform="translate(-1615 -631)">
        <Path
          data-name="Rectangle 151"
          transform="translate(1615 631)"
          fill="none"
          d="M0 0H16V16H0z"
        />
        <G data-name="82deb6fbc95eb8bdaf408afeb3ae139c">
          <Path
            data-name="Path 117"
            d="M10.773 4A5.8 5.8 0 005 9.822c0 3.216 5.774 9.661 5.774 9.661s5.772-6.445 5.772-9.661A5.8 5.8 0 0010.773 4zm0 3.236a1.944 1.944 0 11-1.927 1.937 1.932 1.932 0 011.927-1.939z"
            transform="translate(1617.351 631.381) translate(-4.999 -3.998)"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  )
}

export default LocationIcon
