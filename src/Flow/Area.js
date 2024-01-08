import React from "react";
import {
  Handle,
  Position,
  useReactFlow,
  useStore,
  useStoreApi,
} from "react-flow-renderer";
import { get } from "lodash";
import { shallow } from "zustand/shallow";
// import Ellipsis from "@/components/Ellipsis";
import {
  ExpandAltOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./MarqueeBorder copy 4.css";

const labelToDivSizeMap = {
  area: 400,
  region: 170,
  az: 150,
  mu: 100,
};

const labelToFontSizeMap = {
  area: 70,
  region: 30,
  az: 25,
  mu: 15,
};

const Area = ({ data, isConnectable = true, width, height }) => {
  const label = get(data, "label", 0);
  const zoomSelector = (s) => {
    if (label === "area" && s.transform[2] >= 0.5 && s.transform[2] < 0.58) {
      return true;
    }
    if (label === "region" && s.transform[2] >= 0.58 && s.transform[2] < 0.69) {
      return true;
    }
    if (label === "az" && s.transform[2] >= 0.69 && s.transform[2] < 0.8) {
      return true;
    }
    if (label === "mu" && s.transform[2] >= 0.8) {
      return true;
    }
    return false;
  };
  const showContent = useStore(zoomSelector);

  return (
    <>
      {showContent && (
        <div>
          <div
            className="box"
            style={{
              width: get(labelToDivSizeMap, label, 100),
              height: get(labelToDivSizeMap, label, 100),
            }}
          >
            <span>
              {get(data, "labelName", "")
                .split("-")
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{ fontSize: get(labelToFontSizeMap, label, 100) }}
                    >
                      {item}
                    </div>
                  );
                })}
            </span>
          </div>
          {/* <div className="wrapper gradient">
            <div className="inner">
              <div className="body">
                {data.icon && <div className="icon">{data.icon}</div>}
                <div>
                  <div className="title">{data.title}</div>
                  {data.labelName && (
                    <div className="subline">{data.labelName}</div>
                  )}
                </div>
              </div>
              <Handle type="target" position={Position.Left} />
              <Handle type="source" position={Position.Right} />
            </div>
          </div> */}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{
          top: height / 2,
          left: width,
          background: "#262626",
          width: 4,
          height: 4,
          border: "#262626",
        }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{
          top: height / 2,
          left: width,
          background: "#262626",
          width: 4,
          height: 4,
          border: "#262626",
        }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default React.memo(Area);
