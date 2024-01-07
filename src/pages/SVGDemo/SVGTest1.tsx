import React from "react";

class SVGTest1 extends React.Component {
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
          <rect width="100%" height="100%" fill="red" />

          <circle cx="150" cy="100" r="80" fill="green" />

          <text
            x="150"
            y="125"
            font-size="60"
            text-anchor="middle"
            fill="white"
          >
            SVG
          </text>
        </svg>
        <svg>
          <rect x="0" y="0" width="100" height="100" />
        </svg>
        <svg width="100" height="100">
          <rect x="0" y="0" width="100" height="100" />
        </svg>
        <svg width="200" height="200" viewBox="0 0 100 100">
          <rect x="0" y="0" width="100" height="100" />
        </svg>
        <svg
          width="200"
          height="250"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="10"
            y="10"
            width="30"
            height="30"
            stroke="black"
            fill="transparent"
            stroke-width="5"
          />
          <rect
            x="60"
            y="10"
            rx="10"
            ry="10"
            width="30"
            height="30"
            stroke="black"
            fill="transparent"
            stroke-width="5"
          />

          <circle
            cx="25"
            cy="75"
            r="20"
            stroke="red"
            fill="transparent"
            stroke-width="5"
          />
          <ellipse
            cx="75"
            cy="75"
            rx="20"
            ry="5"
            stroke="red"
            fill="transparent"
            stroke-width="5"
          />
          <line
            x1="10"
            x2="50"
            y1="110"
            y2="150"
            stroke="orange"
            stroke-width="5"
          />
          <polyline
            points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145"
            stroke="orange"
            fill="transparent"
            stroke-width="5"
          />
          <polygon
            points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
            stroke="green"
            fill="transparent"
            stroke-width="5"
          />
          <path
            d="M20,230 Q40,205 50,230 T90,230"
            fill="none"
            stroke="blue"
            stroke-width="5"
          />
        </svg>

        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10" />
          {/* <!-- Points --> */}
          <circle cx="10" cy="10" r="2" fill="red" />
        </svg>
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 10 H 90 V 90 H 10 L 10 10" />
          {/* <!-- Points --> */}
          <circle cx="10" cy="10" r="2" fill="red" />
          <circle cx="90" cy="90" r="2" fill="red" />
          <circle cx="90" cy="10" r="2" fill="red" />
          <circle cx="10" cy="90" r="2" fill="red" />
        </svg>

        <svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 10 10 C 20 20, 40 20, 50 10"
            stroke="black"
            fill="transparent"
          />
          <path
            d="M 70 10 C 70 20, 110 20, 110 10"
            stroke="black"
            fill="transparent"
          />
          <path
            d="M 130 10 C 120 20, 180 20, 170 10"
            stroke="black"
            fill="transparent"
          />
          <path
            d="M 10 60 C 20 80, 40 80, 50 60"
            stroke="black"
            fill="transparent"
          />
          <path
            d="M 70 60 C 70 80, 110 80, 110 60"
            stroke="black"
            fill="transparent"
          />
          <path
            d="M 130 60 C 120 80, 180 80, 170 60"
            stroke="black"
            fill="transparent"
          />
          <path
            d="M 10 110 C 20 140, 40 140, 50 110"
            stroke="black"
            fill="transparent"
          />
          <path
            d="M 70 110 C 70 140, 110 140, 110 110"
            stroke="black"
            fill="transparent"
          />
          <path
            d="M 130 110 C 120 140, 180 140, 170 110"
            stroke="black"
            fill="transparent"
          />
        </svg>

        <svg width="500" height="120">
          <path
            d="M50,20 l40,40 l-40,40 l-40,-40 l40,-40
         M50,40 l20,20 l-20,20 l-20,-20 l20,-20"
            stroke="#000000"
            fill="#6666ff"
            fill-rule="nonzero"
          ></path>
          <path
            d="M150,20 l40,40 l-40,40 l-40,-40 l40,-40
         M150,40 l-20,20 l20,20 l20,-20 l-20,-20"
            stroke="#000000"
            fill="#6666ff"
            fill-rule="nonzero"
          ></path>
        </svg>
      </>
    );
  }
}

export default SVGTest1;
