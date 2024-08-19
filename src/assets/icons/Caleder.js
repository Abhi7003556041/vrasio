// import * as React from "react";
// import Svg, { Rect, G, Line } from "react-native-svg";
// const Caleder = (props) => (
//   <Svg
//     id="Component_17"
//     data-name="Component 17"
//     xmlns="http://www.w3.org/2000/svg"
//     width={24}
//     height={24}
//     viewBox="0 0 24 24"
//     {...props}
//   >
//     <Rect
//       id="Rectangle_1831"
//       data-name="Rectangle 1831"
//       width={24}
//       height={24}
//       fill="none"
//     />
//     <G id="Group_3000" data-name="Group 3000" transform="translate(3.914 3)">
//       <Rect
//         id="Rectangle_1653"
//         data-name="Rectangle 1653"
//         width={16.172}
//         height={16.172}
//         rx={3}
//         transform="translate(0 1.828)"
//         fill="none"
//         stroke="#1d232a"
//         strokeWidth={1}
//       />
//       <Line
//         id="Line_214"
//         data-name="Line 214"
//         x2={16.172}
//         transform="translate(0 6.826)"
//         fill="none"
//         stroke="#1d232a"
//         strokeWidth={1}
//       />
//       <Line
//         id="Line_215"
//         data-name="Line 215"
//         y2={4.226}
//         transform="translate(4.632)"
//         fill="none"
//         stroke="#1d232a"
//         strokeWidth={1}
//       />
//       <Line
//         id="Line_216"
//         data-name="Line 216"
//         y2={4.226}
//         transform="translate(11.539)"
//         fill="none"
//         stroke="#1d232a"
//         strokeWidth={1}
//       />
//       <G
//         id="Group_2612"
//         data-name="Group 2612"
//         transform="translate(4.053 10.049)"
//       >
//         <Rect
//           id="Rectangle_1654"
//           data-name="Rectangle 1654"
//           width={1.158}
//           height={1.158}
//           fill="#1d232a"
//         />
//         <Rect
//           id="Rectangle_1655"
//           data-name="Rectangle 1655"
//           width={1.158}
//           height={1.158}
//           transform="translate(3.454)"
//           fill="#1d232a"
//         />
//         <Rect
//           id="Rectangle_1656"
//           data-name="Rectangle 1656"
//           width={1.158}
//           height={1.158}
//           transform="translate(6.907)"
//           fill="#1d232a"
//         />
//       </G>
//       <G
//         id="Group_2613"
//         data-name="Group 2613"
//         transform="translate(4.053 13.563)"
//       >
//         <Rect
//           id="Rectangle_1657"
//           data-name="Rectangle 1657"
//           width={1.158}
//           height={1.158}
//           transform="translate(0 0)"
//           fill="#1d232a"
//         />
//         <Rect
//           id="Rectangle_1658"
//           data-name="Rectangle 1658"
//           width={1.158}
//           height={1.158}
//           transform="translate(3.454 0)"
//           fill="#1d232a"
//         />
//         <Rect
//           id="Rectangle_1659"
//           data-name="Rectangle 1659"
//           width={1.158}
//           height={1.158}
//           transform="translate(6.907 0)"
//           fill="#1d232a"
//         />
//       </G>
//     </G>
//   </Svg>
// );
// export default Caleder;
import * as React from "react"
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
import Theme from "../../Constants/Theme"

function Caleder(props) {
  return (
    <Svg
      data-name="Group 3115"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path data-name="Rectangle 1914" fill={Theme.colors.btnColor} d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
      <G data-name="Group 3114" clipPath="url(#a)" fill={Theme.colors.btnColor}>
        <Path
          data-name="Path 30"
          d="M19.03 6.582H1.15a4.963 4.963 0 014.1-4.47v2.58h2v-2.66h5.68v2.66h2v-2.58a4.972 4.972 0 014.1 4.47"
        />
        <Path
          data-name="Path 31"
          d="M7.25 0v2.03H6.1a4.016 4.016 0 00-.85.08V0z"
        />
        <Path
          data-name="Path 32"
          d="M14.93 0v2.11a4.913 4.913 0 00-.86-.08h-1.14V0z"
        />
        <Path
          data-name="Path 33"
          d="M1.1 8.585V15a5 5 0 005 5h7.969a5 5 0 005-5V8.585zm5.79 7.772H5.606V15.07h1.287zm0-3.905H5.606v-1.287h1.287zm3.837 3.905H9.443V15.07h1.287zm0-3.905H9.443v-1.287h1.287zm3.838 3.905h-1.284V15.07h1.287zm0-3.905h-1.284v-1.287h1.287z"
        />
      </G>
    </Svg>
  )
}

export default Caleder
