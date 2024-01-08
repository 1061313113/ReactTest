import React from "react";
import {
  getBezierPath,
  getMarkerEnd,
  getEdgeCenter,
  EdgeText,
  BaseEdge,
  EdgeLabelRenderer,
} from "react-flow-renderer";
import styles from "./index.less";
export default function EdgeWithLabel({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const foreignObjectSizeX = 72;
  const foreignObjectSizeY = 20;
  const { label, errorStatus } = data;
  return (
    <a style={{ zIndex: 2000 }}>
      <g>
        <path
          id={id}
          className={errorStatus ? styles.warnEdge : styles.normalEdge}
          d={edgePath}
          markerEnd={markerEnd}
        />
      </g>

      <foreignObject
        width={foreignObjectSizeX}
        height={foreignObjectSizeY}
        x={edgeCenterX - foreignObjectSizeX / 2}
        y={edgeCenterY - foreignObjectSizeY / 2}
        className={styles.labelForeignobject}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body>{label}</body>
      </foreignObject>
    </a>
  );
}
