import React, { memo, ReactNode } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { FiCloud } from "react-icons/fi";
// import styles from './reactFlowIndex.css';

const TurboNode = ({ data, isConnectable = true, width, height }) => {
  return (
    <>
      <div className="cloud gradient">
        <div>
          <FiCloud />
        </div>
      </div>
      <div className="wrapper gradient">
        <div className="inner">
          <div className="body">
            {data.icon && <div className="icon">{data.icon}</div>}
            <div>
              <div className="title">{data.title}</div>
              {data.subline && <div className="subline">{data.subline}</div>}
            </div>
          </div>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </div>
      </div>
    </>
  );
};

export default React.memo(TurboNode);
