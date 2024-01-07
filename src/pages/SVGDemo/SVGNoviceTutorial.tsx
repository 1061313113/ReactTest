import React from "react";
import circle from "../svg/circle.svg";

class SVGTTest1 extends React.Component {
  render() {
    return (
      <>
        <svg
          version="1.1"
          baseProfile="full"
          width="300"
          height="200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="64" cy="64" r="64" style={{ fill: "#00ccff" }}></circle>
        </svg>
        <img alt="circle1" src="circle"></img>
      </>
    );
  }
}

export default SVGTTest1;
