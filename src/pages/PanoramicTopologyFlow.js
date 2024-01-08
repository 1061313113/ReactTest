import React, { useState, useEffect, useCallback } from "react";
import { useStore } from "react-flow-renderer";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
} from "react-flow-renderer";
import "reactflow/dist/style.css";

// import ColorSelectorNode from "./ColorSelectorNode";

// import "./index.css";

const initBgColor = "#1A192B";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
// const nodeTypes = {
//   selectorNode: ColorSelectorNode,
// };

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const PanoramicTopologyFlow = ({
  allNodes,
  allEdges,
  onEdgeClick,
  onNodeClick,
  nodeTypes,
  edgeTypes,
  onZoomChange,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([...allNodes]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([...allEdges]);
  const [bgColor, setBgColor] = useState(initBgColor);

  if (nodes !== allNodes) {
    // console.log("PanoramicTopologyFlow", setNodes);
    setNodes(allNodes);
  }
  if (edges !== allEdges) {
    setEdges(allEdges);
  }

  const zoomSelector = (s) => {
    onZoomChange(s);
  };
  const showContent = useStore(zoomSelector);

  // const onConnect = useCallback(
  //   (params) =>
  //     setEdges((eds) =>
  //       addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
  //     ),
  //   []
  // );
  return (
    <ReactFlow
      // className={styles.line}
      className={{
        color: "aqua",
        cursor: "pointer",
        strokeWidth: "10%",
      }}
      nodes={nodes}
      edges={edges}
      onEdgeClick={onEdgeClick}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      // onConnect={onConnect}
      style={{ background: bgColor }}
      connectionLineStyle={connectionLineStyle}
      fitView
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      attributionPosition="bottom-left"
      defaultZoom={0.5}
      defaultEdgeOptions={{ zIndex: 3000 }}
      maxZoom={10}
      minZoom={0.5}
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === "input") return "#0041d0";
          if (n.type === "selectorNode") return bgColor;
          if (n.type === "output") return "#ff0072";
        }}
        nodeColor={(n) => {
          if (n.type === "selectorNode") return bgColor;
          return "#fff";
        }}
      />
      <Controls />
      {/* <MiniMap />
          <Controls />
          <Background color="#fff" gap={16} /> */}
    </ReactFlow>
  );
};

export default PanoramicTopologyFlow;
