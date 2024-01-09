import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MyApp from "./pages/MyApp.tsx";
import D3Network from "./pages/d3/index.tsx";
import D3SelectDemo from "./pages/d3/SelectDemo.tsx";
// import ListFilter from "./pages/Method/ListFilter.tsx";
import SVGClass from "./pages/SVGDemo/index.tsx";
import reportWebVitals from "./reportWebVitals";
import PanoramicTopologyView from "./pages/PanoramicTopologyView.tsx";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <D3Network />
    {/* <D3SelectDemo /> */}
  </>
);
// import ReactDOM from "react-dom";
// import "./index.css";
// import reportWebVitals from "./reportWebVitals";
// // import Curved from "./pages/Curved.tsx";
// import MyApp from "./pages/MyApp.tsx";
// import Profile from "./pages/Profile.tsx";
// import Game from "./pages/Game.tsx";
// import Fruit from "./pages/Fruit.tsx";
// import SVGTest1 from "./pages/SVGDemo/SVGTest1.tsx";
// import SVGNoviceTutorial from "./pages/SVGDemo/SVGNoviceTutorial.tsx";
//
// const root = document.getElementById("root");
// ReactDOM.render(
//   <>
//     <SVGNoviceTutorial />
//   </>,
//   root
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Curved />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
