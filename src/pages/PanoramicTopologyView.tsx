import TurboNode from "./TurboNode.tsx";
import TurboEdge from "./TurboEdge.tsx";
import FunctionIcon from "./FunctionIcon.tsx";
import styles from "./index.less";
import {
  Row,
  Col,
  Button,
  DatePicker,
  Cascader,
  message,
  Drawer,
  Tabs,
} from "antd";
import { get, isEmpty } from "lodash";
import locale from "umi-plugin-react/locale";
import moment from "moment";
// import { connect as dvaConnect } from "dva";
import { TabPane } from "semantic-ui-react";
import ClusterMetaDataChart from "./ClusterMetaDataChart";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlowProvider,
} from "react-flow-renderer";
import EdgeWithLabel from "../Flow/EdgeWithLabel.js";
import Area from "../Flow/Area.js";
import React from "react";
import { CLUSTER_META_DATA } from "./constants.ts";
import PanoramicTopologyFlow from "./PanoramicTopologyFlow.js";
import { Provider } from "react-flow-renderer/dist/esm/store/index.js";

const { RangePicker } = DatePicker;

const snapGrid = [20, 20];
const nodeTypes = {
  area: Area,
  turboNode: TurboNode,
};
const edgeTypes = {
  // edgeWithLabel: EdgeWithLabel,
  turboEdge: TurboEdge,
};
const zoomHidden = {
  area: true,
  region: false,
  az: false,
  mu: false,
};

// const zoomSelector = (s) => {
//   console.log("zoomSelector", s);
//   return s.transform[2] >= 1.5;
// };

// function ZoomChange(){
//   const store = useStore();
//   return store;
// }

let preZoom = 0;

class PanoramicTopologyView extends React.PureComponent {
  state = {
    nodes: [],
    clientEdge: {},
    serverEdge: {},
    clientParam: undefined,
    serverParam: undefined,
    queryLoading: false,
    searchFromTime: moment().subtract(10, "minutes"),
    searchToTime: moment(),
    cascaderOptions: [],
    muDrawerVisible: false,
    reactFlowVisible: true,
    allNodes: [],
    areaHidden: false,
    regionHidden: false,
    azHidden: false,
    areaGroupHiddenArray: [],
    regionGroupHiddenArray: [],
    azGroupHiddenArray: [],
    clientBlurId: "",
    serverBlurId: "",
    clientSelected: [],
    serverSelected: [],
  };

  componentDidMount(): void {
    this.convertClusterMetaToReactFlowNodes({
      clusterMetaData: CLUSTER_META_DATA,
    });
    this.setState({
      cascaderOptions:
        this.convertClusterMetaToCascaderOptions(CLUSTER_META_DATA),
    });
  }

  isBlur = (id, clientBlurId, serverBlurId) => {
    if (
      !clientBlurId ||
      !serverBlurId ||
      id === clientBlurId ||
      id === serverBlurId
    ) {
      return false;
    }
    return true;
  };

  onZoomChange = (s) => {
    // console.log("zoomSelector.s", s.transform[2]);
    // console.log("zoomSelector.preZoom", preZoom);
    if (preZoom === s.transform[2]) {
      return;
    }
    preZoom = s.transform[2];
    let muWidth = 100;
    let azWidth = 250;
    let regionWidth = 500;
    let areaWidth = 1000;
    console.log("onZoomChange.s", s.transform[2]);
    if (s.transform[2] >= 0.5 && s.transform[2] < 0.58) {
      muWidth = 100;
      azWidth = 150;
      regionWidth = 180;
      areaWidth = 600;
    }
    if (s.transform[2] >= 0.58 && s.transform[2] < 0.69) {
      muWidth = 100;
      azWidth = 150;
      regionWidth = 180;
      areaWidth = 600;
    }
    if (s.transform[2] >= 0.69 && s.transform[2] < 0.8) {
      muWidth = 100;
      azWidth = 150;
      regionWidth = 300;
      areaWidth = 750;
    }
    if (s.transform[2] >= 0.8 && s.transform[2] < 1) {
      muWidth = 100;
      azWidth = 300;
      regionWidth = 600;
      areaWidth = 1500;
    }
    this.convertClusterMetaToReactFlowNodes({
      clusterMetaData: CLUSTER_META_DATA,
      muWidth,
      azWidth,
      regionWidth,
      areaWidth,
    });
  };

  calculatePosition = ({ index, width, height, type = "area", count = 3 }) => {
    if (index === 0) {
      return { x: 0, y: 0 };
    }
    if (index === 1) {
      if (type === "az") {
        return { x: width * (count - 2 > 0 ? count - 2 : 1), y: 0 };
      }
      return {
        x: width * (count - 2 > 0 ? count - 2 : 1),
        y: height * (count - 2 > 0 ? count - 2 : 1),
      };
    }
    if (index === 2) {
      return { x: width * (count - 1 ? count - 1 : 2), y: 0 };
    }
    if (index === 3) {
      return { x: 0, y: height * (count - 1 ? count - 1 : 2) };
    }
    if (index === 4) {
      return {
        x: width * (count - 1 ? count - 1 : 2),
        y: height * (count - 1 ? count - 1 : 2),
      };
    }
    if (index === 5) {
      return { x: width * count, y: height * (count - 2 > 0 ? count - 2 : 1) };
    }
    if (index === 6) {
      return { x: width * (count - 2 > 0 ? count - 2 : 1), y: height * count };
    }
    if (index === 7) {
      return { x: width * count, y: height * count };
    }
    return { x: 0, y: 0 };
  };

  convertClusterMetaToReactFlowNodes({
    clusterMetaData,
    muWidth = 100,
    azWidth = 300,
    regionWidth = 600,
    areaWidth = 1500,
  }) {
    let allNodes = [];

    const muHeight = 100;
    const azHeight = 200;
    const regionHeight = 200;
    const areaHeight = 400;

    clusterMetaData.forEach((item, areaIndex) => {
      const area = get(item, "areaName", "");

      get(item, "children", []).forEach((regionItem, regionIndex) => {
        const region = get(regionItem, "regionName", "");

        get(regionItem, "children", []).forEach((azItem, azIndex) => {
          const az = get(azItem, "azName", "");

          get(azItem, "children", []).forEach((muItem, muIndex) => {
            const mu = get(muItem, "muName", "");
            const muId = `${area}-${region}-${az}-${mu}`;
            const muPosition = this.calculatePosition({
              index: muIndex,
              width: muWidth,
              height: muHeight,
            });
            allNodes.push({
              id: muId,
              type: "area",
              data: {
                label: "mu",
                labelName: `${az}-${mu}`,
                index: muIndex,
                width: muWidth,
                height: muHeight,
              },
              parentNode: `${area}-${region}-${az}`,
              position: muPosition,
              sourcePosition: "right",
              targetPosition: "left",
              // style: {
              //   width: muWidth,
              //   height: muHeight,
              //   border: "1px dotted #777",
              //   boxShadow: "5px 5px 3px 1px rgba(100, 100, 100, 0.3)",
              // },
            });
          });

          const azId = `${area}-${region}-${az}`;
          const muCount = get(azItem, "children", []).length;
          // azWidth = muCount * muWidth;
          const azPosition = this.calculatePosition({
            index: azIndex,
            width: azWidth,
            height: azHeight,
            type: "az",
            count: muCount,
          });
          // console.log("azId-azPosition-index", azId, azPosition, azIndex);

          allNodes = [
            {
              id: azId,
              type: "area",
              data: {
                label: "az",
                labelName: `${region}-${az}`,
                index: azIndex,
                width: azWidth,
                height: azHeight,
              },
              parentNode: `${area}-${region}`,
              position: azPosition,
              sourcePosition: "right",
              targetPosition: "left",
              // style: {
              //   width: azWidth,
              //   height: azHeight,
              //   border: "1px dotted #777",
              //   boxShadow: "5px 5px 3px 1px rgba(100, 100, 100, 0.3)",
              // },
            },
            ...allNodes,
          ];
        });

        const regionId = `${area}-${region}`;
        const azCount = get(regionItem, "children", []).length;
        // regionWidth = azCount * azWidth;
        const regionPosition = this.calculatePosition({
          index: regionIndex,
          width: regionWidth,
          height: regionHeight,
          count: azCount,
        });

        allNodes = [
          {
            id: regionId,
            type: "area",
            data: {
              label: "region",
              labelName: regionId,
              index: regionIndex,
              width: regionWidth,
              height: regionHeight,
            },
            parentNode: `${area}`,
            position: regionPosition,
            sourcePosition: "right",
            targetPosition: "left",
            style: {
              width: regionWidth,
              height: regionHeight,
              border: false ? undefined : "2px dashed #777",
              // boxShadow: "5px 5px 3px 1px rgba(100, 100, 100, 0.3)",
            },
          },
          ...allNodes,
        ];
      });

      const areaId = `${area}`;
      const regionCount = get(item, "children", []).length;
      // areaWidth = regionCount * regionWidth;
      const areaPosition = this.calculatePosition({
        index: areaIndex,
        width: areaWidth,
        height: areaHeight,
        count: regionCount,
      });

      allNodes = [
        {
          id: areaId,
          type: "area",
          data: {
            label: "area",
            labelName: area,
            width: areaWidth,
            height: areaHeight,
          },
          position: areaPosition,
          sourcePosition: "right",
          targetPosition: "left",
          // style: {
          //   width: areaWidth,
          //   height: areaHeight,
          //   border: "1px dotted #777",
          //   boxShadow: "5px 5px 3px 1px rgba(100, 100, 100, 0.3)",
          // },
        },
        ...allNodes,
      ];
    });

    this.setState({
      allNodes,
    });
  }

  convertClusterMetaToCascaderOptions(clusterMetaData) {
    return (isEmpty(clusterMetaData) ? [] : clusterMetaData).map((item) => {
      return {
        value: get(item, "areaName", ""),
        label: get(item, "areaName", ""),
        children: this.regionNameMap(item),
      };
    });
  }

  regionNameMap = (item) => {
    return get(item, "children", []).map((children1Item) => {
      return {
        value: get(children1Item, "regionName", ""),
        label: get(children1Item, "regionName", ""),
        children: get(children1Item, "children", []).map((children2Item) => {
          return {
            value: get(children2Item, "azName", ""),
            label: get(children2Item, "azName", ""),
            children: get(children2Item, "children", []).map(
              (children3Item) => {
                return {
                  value: get(children3Item, "muName", ""),
                  label: get(children3Item, "muName", ""),
                };
              }
            ),
          };
        }),
      };
    });
  };

  onClientCascaderChange = (value, options) => {
    if (isEmpty(value)) {
      return;
    }
    const id = value.join("-");
    this.setState(
      {
        clientParam: this.flatten(value, options),
        clientEdge: {
          id: id,
          source: id,
        },
        clientBlurId: id,
        clientSelected: value,
      },
      () => {
        this.convertClusterMetaToReactFlowNodes({
          clusterMetaData: CLUSTER_META_DATA,
        });
      }
    );
  };

  onServerCascaderChange = (value, options) => {
    if (isEmpty(value)) {
      return;
    }
    const id = value.join("-");
    this.setState(
      {
        serverParam: this.flatten(value, options),
        serverEdge: {
          id: id,
          target: id,
        },
        serverBlurId: id,
        serverSelected: value,
      },
      () => {
        this.convertClusterMetaToReactFlowNodes({
          clusterMetaData: CLUSTER_META_DATA,
        });
      }
    );
  };

  // 定义一个递归函数来动态地打平数组的一级、二级、三级和四级数据
  flatten = (value, options) => {
    const buildArray = [];
    const length = value.length;
    if (length < 1) {
      return;
    }
    if (length === 1) {
      const area = get(value, "0", "");
      options.forEach((item) => {
        this.regionForEach(item, buildArray, area);
      });
    }
    if (length === 2) {
      const area = get(value, "0", "");
      const region = get(value, "1", "");
      get(get(options, "1", []), "children", []).forEach((azItem) => {
        const az = get(azItem, "value", "");
        get(azItem, "children", "").forEach((muItem) => {
          const mu = get(muItem, "value", "");
          buildArray.push({
            muName: mu,
          });
        });
      });
    }
    if (length === 3) {
      const area = get(value, "0", "");
      const region = get(value, "1", "");
      const az = get(value, "2", "");
      get(get(options, "2", []), "children", []).forEach((muItem) => {
        const mu = get(muItem, "value", "");
        buildArray.push({
          muName: mu,
        });
      });
    }
    if (length === 4) {
      const area = get(value, "0", "");
      const region = get(value, "1", "");
      const az = get(value, "2", "");
      const mu = get(value, "3", "");
      buildArray.push({
        muName: mu,
      });
    }
    return buildArray;
  };

  regionForEach(item, buildArray, area) {
    get(item, "children", []).forEach((regionItem) => {
      const region = get(regionItem, "value", "");
      get(regionItem, "children", []).forEach((azItem) => {
        const az = get(azItem, "value", "");
        get(azItem, "children", []).forEach((muItem) => {
          const mu = get(muItem, "value", "");
          buildArray.push({
            muName: mu,
          });
        });
      });
    });
  }

  handleClickQuery = () => {
    const { clientParam, serverParam } = this.state;
    if (isEmpty(clientParam) && isEmpty(serverParam)) {
      message.warning("请选择两端信息再查询!");
      return;
    }
    this.setState({
      muDrawerVisible: true,
    });
  };

  handleClickReset = () => {
    this.setState(
      {
        clientBlurId: "",
        serverBlurId: "",
        clientEdge: {},
        serverEdge: {},
        clientSelected: [],
        serverSelected: [],
      },
      () => {
        this.convertClusterMetaToReactFlowNodes({
          clusterMetaData: CLUSTER_META_DATA,
        });
      }
    );
  };

  handleDatePickerChange = (date) => {
    const start = date[0];
    const end = date[1];
    if (end.diff(start, "hours") > 1) {
      message.warn("最大查询间隔为1小时，请重新选择");
      return;
    }
    this.setState({
      searchFromTime: date[0],
      searchToTime: date[1],
    });
  };

  onEdgeClick = (event, target) => {
    this.setState({
      muDrawerVisible: true,
    });
  };

  onNodeClick = (event, target) => {
    const {
      areaHidden,
      regionHidden,
      azHidden,
      areaGroupHiddenArray,
      regionGroupHiddenArray,
      azGroupHiddenArray,
    } = this.state;
    const id = get(target, "id", "");
    const length = id.split("-").length - 1;
    if (length === 0) {
      this.setState({
        areaHidden: !areaHidden,
        areaGroupHiddenArray: this.buildHiddenArray(
          areaHidden,
          areaGroupHiddenArray,
          id
        ),
      });
    }
    if (length === 2) {
      this.setState({
        regionHidden: !regionHidden,
        regionGroupHiddenArray: this.buildHiddenArray(
          regionHidden,
          regionGroupHiddenArray,
          id
        ),
      });
    }
    if (length === 3) {
      this.setState({
        azHidden: !azHidden,
        azGroupHiddenArray: this.buildHiddenArray(
          azHidden,
          azGroupHiddenArray,
          id
        ),
      });
    }
    this.convertClusterMetaToReactFlowNodes({
      clusterMetaData: CLUSTER_META_DATA,
    });
  };

  private buildHiddenArray(hidden: boolean, hiddenArray, id: string) {
    return !hidden
      ? [...hiddenArray, id]
      : hiddenArray.filter((value) => value !== id);
  }

  onDrawerClose = () => {
    this.setState({
      muDrawerVisible: false,
    });
  };

  buildEdges(source, target, clientEdge: {}, serverEdge: {}) {
    let edges = [];
    if (source && target) {
      edges.push({
        id: get(clientEdge, "id", "") + get(serverEdge, "id", ""),
        // type: "turboEdge",
        source: get(clientEdge, "source", ""),
        target: get(serverEdge, "target", ""),
        animated: true,
        style: {
          strokeWidth: 8,
          stroke: "#02ff34",
        },
        markerEnd: {
          type: MarkerType.Arrow,
        },
      });
      return edges;
    }
    return edges;
  }

  render() {
    const {
      clientEdge,
      serverEdge,
      clientParam,
      serverParam,
      queryLoading,
      searchFromTime,
      searchToTime,
      cascaderOptions,
      muDrawerVisible,
      reactFlowVisible,
      allNodes,
      clientSelected,
      serverSelected,
    } = this.state;
    const source = get(clientEdge, "source", "");
    const target = get(serverEdge, "target", "");
    let edges = this.buildEdges(source, target, clientEdge, serverEdge);
    console.log("edges", edges);
    // let edges = [];
    return (
      <>
        <Row gutter={[8, 8]} style={{ marginBottom: 10 }}>
          <Col span={6}>
            <div style={{ display: "inline-flex" }}>
              <div style={{ width: 60, marginTop: 6 }}>客户端:</div>
              <Cascader
                style={{ width: 300, marginInlineEnd: 15 }}
                options={cascaderOptions}
                value={clientSelected}
                onChange={this.onClientCascaderChange}
                placeholder="请选择区域类型"
                changeOnSelect
                allowClear={true}
              />
            </div>
          </Col>
          <Col span={6}>
            <div style={{ display: "inline-flex" }}>
              <div style={{ width: 60, marginTop: 6 }}>服务端:</div>
              <Cascader
                style={{ width: 300 }}
                options={cascaderOptions}
                value={serverSelected}
                onChange={this.onServerCascaderChange}
                placeholder="请选择区域类型"
                changeOnSelect
                allowClear={true}
              />
            </div>
          </Col>
          <Col span={12}></Col>
        </Row>
        {/* <Row gutter={[8, 8]}>
          <Col span={7}>
            时间：
            <RangePicker
              locale={locale}
              style={{ width: "88%" }}
              placeholder={["开始时间", "结束时间"]}
              showTime
              allowClear={false}
              value={[searchFromTime, searchToTime]}
              format="YYYY-MM-DD HH:mm:ss"
              onChange={this.handleDatePickerChange}
              ranges={{
                近15分钟: [moment().subtract("hours", 0.25), moment()],
                近30分钟: [moment().subtract("hours", 0.5), moment()],
                近一小时: [moment().subtract("hours", 1), moment()],
                近三小时: [moment().subtract("hours", 3), moment()],
                近六小时: [moment().subtract("hours", 6), moment()],
              }}
            />
          </Col>
          <Col span={12}>
            <Button
              onClick={this.handleClickQuery}
              type="primary"
              loading={queryLoading}
            >
              查询
            </Button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <Button
              onClick={this.handleClickReset}
              type="primary"
              loading={queryLoading}
            >
              重置
            </Button>
          </Col>
        </Row> */}
        {reactFlowVisible && (
          //   <div className={styles.reactFlowPage}>
          <div
            style={{
              width: "100%",
              height: "calc(100vh - 10px)",
              border: "0px",
              backgroundColor: "#30303d",
            }}
          >
            <ReactFlowProvider>
              <PanoramicTopologyFlow
                allNodes={allNodes}
                allEdges={edges}
                onEdgeClick={this.onEdgeClick}
                onNodeClick={this.onNodeClick}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onZoomChange={this.onZoomChange}
              />
            </ReactFlowProvider>
          </div>
        )}
        {/* <Drawer
          placement="left"
          width={1600}
          title={"指标明细"}
          visible={muDrawerVisible}
          onClose={this.onDrawerClose}
          destroyOnClose
        >
          <TabPane key="dialCollection" tab="拨测功能">
            <Tabs size="small">
              <TabPane key="dial" tab="元数据信息">
                <ClusterMetaDataChart
                  searchFromTime={searchFromTime}
                  searchToTime={searchToTime}
                  clientParam={clientParam}
                  serverParam={serverParam}
                  muDrawerVisible={muDrawerVisible}
                />
              </TabPane>
            </Tabs>
          </TabPane>
        </Drawer> */}
      </>
    );
  }
}

export default PanoramicTopologyView;
