import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EyeClose(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.69 7.705a.75.75 0 00-1.38.59l1.38-.59zm10.18 5.358l-.275-.698.275.698zm-5.111.409a.75.75 0 00-1.257-.818l1.257.818zm-2.388.919a.75.75 0 101.258.818l-1.258-.818zM20.69 8.295a.75.75 0 00-1.378-.59l1.378.59zM17.6 11.303l-.513-.547.513.547zm.67 1.73a.75.75 0 101.06-1.06l-1.06 1.06zM11.25 15.6a.75.75 0 001.5 0h-1.5zm4.121-.391a.75.75 0 101.258-.818l-1.258.818zm-8.44-3.376a.75.75 0 00-1.061-1.06l1.06 1.06zm-2.261.14a.75.75 0 001.06 1.06l-1.06-1.06zm7.33.877c-2.524 0-4.339-1.255-5.55-2.56a10.761 10.761 0 01-1.665-2.385 5.705 5.705 0 01-.093-.194l-.003-.007L4 8l-.69.296h.001l.001.003.002.005a2.626 2.626 0 00.033.073 10.716 10.716 0 00.47.881c.333.56.839 1.305 1.533 2.052 1.389 1.495 3.574 3.04 6.65 3.04v-1.5zm2.595-.485A7.02 7.02 0 0112 12.85v1.5a8.52 8.52 0 003.144-.59l-.549-1.395zm-6.093.289l-1.13 1.737 1.257.818 1.13-1.737-1.257-.818zM20 8l-.69-.296h.001l-.005.01-.021.048-.096.196a10.49 10.49 0 01-2.102 2.798l1.026 1.094a11.99 11.99 0 002.531-3.455 5.154 5.154 0 00.04-.09l.004-.006v-.002h.001v-.001L20 8zm-2.913 2.756c-.677.635-1.504 1.22-2.492 1.61l.55 1.395c1.2-.472 2.184-1.175 2.968-1.911l-1.026-1.094zm-.017 1.077l1.2 1.2 1.06-1.06-1.2-1.2-1.06 1.06zM11.25 13.6v2h1.5v-2h-1.5zm2.991-.128l1.13 1.737 1.258-.818-1.13-1.737-1.258.818zm-8.371-2.7l-1.2 1.2 1.06 1.061 1.2-1.2-1.06-1.06z"
        fill="#fff"
        fillOpacity={0.54}
      />
    </Svg>
  )
}

export default EyeClose