import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function StarIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="Group 226" transform="translate(.097 .264)">
        <Path
          data-name="Rectangle 21"
          transform="translate(-.097 -.264)"
          fill="none"
          d="M0 0H24V24H0z"
        />
        <G data-name="Iconly/Bold/Star">
          <Path
            data-name="Path 34"
            d="M16.658 12.369a1.152 1.152 0 00-.334 1.015l.93 5.148a1.13 1.13 0 01-.471 1.13 1.152 1.152 0 01-1.224.084l-4.635-2.417a1.183 1.183 0 00-.523-.137h-.284a.849.849 0 00-.283.094L5.2 19.715a1.223 1.223 0 01-.743.115 1.163 1.163 0 01-.931-1.33l.931-5.148a1.171 1.171 0 00-.334-1.024L.344 8.665a1.13 1.13 0 01-.281-1.183 1.175 1.175 0 01.93-.782l5.2-.754a1.164 1.164 0 00.921-.637L9.406.607a1.089 1.089 0 01.21-.283L9.71.251a.7.7 0 01.168-.136l.114-.042L10.17 0h.441a1.171 1.171 0 01.921.628l2.322 4.678a1.163 1.163 0 00.869.637l5.2.754a1.186 1.186 0 01.952.785 1.137 1.137 0 01-.3 1.182z"
            transform="translate(1.437 1.794)"
          />
        </G>
      </G>
    </Svg>
  )
}

export default StarIcon
