import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function NotificationIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="Group 6222" transform="translate(-52 -840)">
        <Path
          data-name="Rectangle 1924"
          transform="translate(52 840)"
          fill="none"
          d="M0 0H24V24H0z"
        />
        <Path
          data-name="26. Notification"
          d="M18.568 12.224a3.07 3.07 0 01-.9-2.185V7.5a7.5 7.5 0 00-15 0v2.54a3.07 3.07 0 01-.9 2.185A2.6 2.6 0 003.6 16.663h2.482a4.166 4.166 0 008.165 0h2.483a2.6 2.6 0 001.839-4.439zm-8.4 6.105a2.5 2.5 0 01-2.346-1.666h4.692a2.5 2.5 0 01-2.346 1.666zM16.729 15H3.6a.934.934 0 01-.66-1.6 4.726 4.726 0 001.393-3.36V7.5A5.832 5.832 0 0116 7.5v2.54a4.726 4.726 0 001.39 3.36.934.934 0 01-.661 1.6z"
          transform="translate(53.835 842)"
        />
      </G>
    </Svg>
  )
}

export default NotificationIcon
