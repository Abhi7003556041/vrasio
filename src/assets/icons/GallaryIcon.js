import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function GalleryIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        data-name="Group 323"
        transform="translate(-44 -573) translate(44 573)"
      >
        <Path data-name="Rectangle 91" fill="none" d="M0 0H24V24H0z" />
        <Path
          d="M14.3 0a5.516 5.516 0 014.01 1.554 6.057 6.057 0 011.641 4.351v7a.778.778 0 010 .081v1.068c0 3.531-2.273 5.9-5.656 5.9H5.651C2.271 19.954 0 17.581 0 14.05V5.9C0 2.373 2.271 0 5.651 0zm.277 10.832c-.588 0-1.278.973-1.889 1.832-.838 1.18-1.7 2.4-3.011 2.4a6.23 6.23 0 01-2.4-.641c-1.134-.478-1.648-.631-2.151-.217a13.776 13.776 0 00-2.459 3.084 4.041 4.041 0 002.987 1.163H14.3c2.525 0 4.156-1.728 4.156-4.4v-.8l-.023-.024c-.878-.904-2.39-2.397-3.854-2.397zM14.3 1.5H5.651C3.13 1.5 1.5 3.229 1.5 5.9v8.15a5.394 5.394 0 00.294 1.816 13.5 13.5 0 012.376-2.817c1.252-1.03 2.6-.464 3.686-.007a4.981 4.981 0 001.823.523c.532 0 1.2-.94 1.789-1.769.819-1.156 1.749-2.464 3.111-2.464a6.172 6.172 0 013.875 1.83V5.9a4.518 4.518 0 00-1.2-3.29A4.052 4.052 0 0014.3 1.5zM6.857 4.189a2.6 2.6 0 012.6 2.6 2.6 2.6 0 11-2.6-2.6zm0 1.5a1.1 1.1 0 101.1 1.1 1.1 1.1 0 00-1.101-1.1z"
          fillRule="evenodd"
          transform="translate(2 2)"
          data-name="Iconly/Light-Outline/Image-2"
        />
      </G>
    </Svg>
  )
}

export default GalleryIcon
