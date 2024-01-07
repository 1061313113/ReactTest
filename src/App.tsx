// import logo from "./logo.svg";
// import "./App.css";
// import girl from "../src/assets/girl.png";
// import React from "react";
// import { useState, useEffect, number, styles, mapImg } from "react";

// function App() {
//   return (
//     <>
//     <h1>'React'</h1>
//       {/* <div className="App"> */}
//         {/* <header className="App-header"> */}
//           {/* <img
//             src={logo}
//             className="App-logo"
//             alt="logo"
//             style={{ width: 100, height: 100 }}
//           /> */}
//           {/* <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a> */}
//         {/* </header> */}
//       {/* </div> */}
//       {/* <img
//             src={girl}
//             alt="My girl"
//             style={{ width: 700, height: 400 }}
//           ></img> */}
//       {/* <div>{this.DynamicStyle()}</div> */}
//     </>
//   );
// }

// const imgInfo = {
//   lableLeft: "1900",
//   lableTop: "2000",
// };

// const WIDTH = 1200;
// const HEIGHT = 900;
// const SCALE = 0.2;

// export default App;

// function DynamicStyle() {
//   const imgRef = React.createRef < HTMLImageElement > React;
//   /** 初始化缩放比例，默认为1 */
//   const [rate, setRate] = useState(1);
//   /** 图片样式 */
//   const [imgStyle, setImgStyle] = useState < React.CSSProperties > {};
//   /** 记录鼠标是否按下 */
//   const [mouseDowmFlag, setMouseDowmFlag] = useState(false);
//   /** 记录鼠标按下的坐标 */
//   const [mouseDowmPos, setMouseDowmPos] = useState < { x: number, y: number } > { x: 0, y: 0 };
//   /** 图片原始大小，默认设置为1是防止计算图片原始大小与初始大小比例出现无穷大 */
//   const [natural, setNatural] = useState < { width: number, height: number } > { width: 1, height: 1 };
//   /** 图片现在大小 */
//   const [initial, setInitial] = useState <
//     { width: number, height: number } >
//     { width: WIDTH, height: HEIGHT };

//   useEffect(() => {
//     const { naturalWidth, naturalHeight, width, height } = imgRef.current;
//     setNatural({ width: naturalWidth, height: naturalHeight });
//     setInitial({ width, height });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     document.onmouseover = () => {
//       if (mouseDowmFlag) {
//         setMouseDowmFlag(false);
//       }
//     };
//     return () => {
//       document.onmouseover = null;
//     };
//   }, [mouseDowmFlag]);

//   /** 缩放 */
//   const handleWheelImage = (event) => {
//     // 向上为负，向下为正
//     const bigger = event.deltaY > 0 ? -1 : 1;
//     // transform偏移量
//     const transformX = -initial.width / 2;
//     const transformY = -initial.height / 2;
//     if (bigger > 0 && rate < 2) {
//       const enlargeRate = rate + SCALE;
//       setImgStyle({
//         ...imgStyle,
//         transform: `matrix(${enlargeRate}, 0, 0, ${enlargeRate}, ${transformX}, ${transformY})`, // 默认以图片中心为原点进行缩放
//       });
//       setRate(enlargeRate);
//     } else if (bigger < 0 && rate > 1) {
//       const shrinkRate = rate - SCALE;
//       setImgStyle({
//         ...imgStyle,
//         transform: `matrix(${shrinkRate}, 0, 0, ${shrinkRate}, ${transformX}, ${transformY})`,
//       });
//       setRate(shrinkRate);
//     }
//   };

//   /** 平移 */
//   const handleMouseDown = (event) => {
//     const { clientX, clientY } = event;
//     event.stopPropagation();
//     event.preventDefault(); // 阻止浏览器默认行为，拖动会打开图片
//     setMouseDowmFlag(true); // 控制只有在鼠标按下后才会执行mousemove
//     setMouseDowmPos({
//       x: clientX,
//       y: clientY,
//     });
//   };

//   const handleMouseMove = (event) => {
//     event.stopPropagation();
//     event.preventDefault();
//     const { clientX, clientY } = event;
//     const diffX = clientX - mouseDowmPos.x;
//     const diffY = clientY - mouseDowmPos.y;
//     if (!mouseDowmFlag || (diffX === 0 && diffY === 0)) return;
//     const { offsetLeft, offsetTop } = imgRef.current;
//     const offsetX = parseInt(`${diffX + offsetLeft}`, 10);
//     const offsetY = parseInt(`${diffY + offsetTop}`, 10);

//     setMouseDowmPos({
//       x: clientX,
//       y: clientY,
//     });
//     setImgStyle({
//       ...imgStyle,
//       left: offsetX,
//       top: offsetY,
//     });
//   };

//   const handleMouseUp = (event) => {
//     event.stopPropagation();
//     event.preventDefault();
//     setMouseDowmFlag(false);
//   };

//   // 初始图片缩放比例（图片有原始的图片大小）
//   const imgScaleRateX = initial.width / natural.width;
//   const imgScaleRateY = initial.height / natural.height;

//   const labelTransformOrigin = () => {
//     return `${initial.width / 2 - Number(imgInfo.lableLeft) * imgScaleRateX}px ${initial.height / 2 - Number(imgInfo.lableTop) * imgScaleRateY}px`;
//   };

//   /** 图标位置计算 */
//   const labelStyle = () => {
//     const transformX = -initial.width / 2;
//     const transformY = -initial.height / 2;
//     // 图标相对父元素坐标 = 图标初始位置坐标 + 平移量
//     const labelLeft = parseInt(`${imgInfo.lableLeft}`, 10) * imgScaleRateX +
//       Number(imgStyle.left || WIDTH / 2);
//     const labelTop = parseInt(`${imgInfo.lableTop}`, 10) * imgScaleRateY +
//       Number(imgStyle.top || HEIGHT / 2);
//     return {
//       left: labelLeft,
//       top: labelTop,
//       transformOrigin: labelTransformOrigin(),
//       transform: `matrix(${rate}, 0, 0, ${rate}, ${transformX}, ${transformY})`,
//     };
//   };

//   return (
//     <div className={styles.imgArea}>
//       <img
//         src={girl}
//         alt="part"
//         height={HEIGHT}
//         style={imgStyle}
//         ref={girl}
//         onWheel={handleWheelImage}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       ></img>
//       <span className={styles.label} style={labelStyle()}></span>
//     </div>
//   );
// }

