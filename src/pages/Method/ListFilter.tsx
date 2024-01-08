import { CLUSTER_META_DATA_NEW } from "../constants.ts";
import React, { Component } from "react";

let number = 1;

class ListFilter extends Component {
  componentDidMount(): void {
    this.setId();
    console.log("method", CLUSTER_META_DATA_NEW);
    const resultMap = this.buildMap();
    this.setState({
      resultMap,
    });
    this.findParentFromMap([90], resultMap);
  }

  listFilter = (data = CLUSTER_META_DATA_NEW, targetNodes, level, result) => {
    data
      .filter((node, index) => {
        if (targetNodes[level]) {
          return node.enName === targetNodes[level] ? true : false;
        }
        return true;
      })
      .forEach((node, index) => {
        if (node.type === "mu") {
          result.push(node.enName);
          return;
        }
        // 如果不是最后一级，则继续对子节点进行递归调用
        this.listFilter(node.children, targetNodes, level + 1, result);
      });
  };

  findParentFromMap = (param, resultMap) => {
    let paramArray = [];
    console.log("findParentFromMap.param", param);
    console.log("findParentFromMap.resultMap", resultMap);
    function judgeAndConcat(paramObject) {
      if (paramObject.parentId) {
        const parentObject = resultMap[paramObject.parentId];
        paramArray = [parentObject.id, ...paramArray];
        judgeAndConcat(parentObject);
      }
    }

    paramArray = paramArray.concat(param);
    const paramObject = resultMap[param];
    judgeAndConcat(paramObject);
    console.log("findParentFromMap.paramArray", paramArray);
  };

  buildMap = () => {
    // 创建一个空对象，用于存储转换后的数据
    const resultMap = {};

    // 创建递归函数来构建 map 样式
    function buildMapStyle(data, parentId) {
      // 遍历每个节点
      data.forEach((node, index) => {
        // 创建包含 id、title 和 childIds 的对象
        resultMap[node.id] = {
          id: node.id,
          parentId: parentId,
          type: node.type,
          enName: node.enName,
          name: node.name,
          childIds: [],
        };
        console.log("buildMap.resultMap", resultMap);

        // 如果存在父节点，则将当前节点的 id 添加到父节点的 childIds 数组中
        if (parentId) {
          resultMap[parentId].childIds.push(node.id);
        }

        // 递归处理子节点
        if (node.children) {
          buildMapStyle(node.children, node.id);
        }
      });
    }

    // 调用递归函数并传入初始数据
    buildMapStyle(CLUSTER_META_DATA_NEW, null);

    // 输出转换后的 map 样式对象
    console.log("buildMap.resultFinal", resultMap);
    console.log("buildMap.resultFinal", JSON.stringify(resultMap));
    return resultMap;
  };

  setId = () => {
    function addRandomId(node) {
      // 生成一个随机ID
      const randomId = number++;

      // 更新节点的名称，将随机ID添加到名称中
      node.id = randomId;

      // 如果节点有子节点，则对每个子节点调用递归函数
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          addRandomId(node.children[i]);
        }
      }
    }

    // 生成随机ID的函数
    function generateRandomId() {
      // 生成随机数作为ID
      return Math.random().toString(36).substr(2, 9);
    }

    // 对每个区域的根节点调用递归函数
    for (let i = 0; i < CLUSTER_META_DATA_NEW.length; i++) {
      addRandomId(CLUSTER_META_DATA_NEW[i]);
    }
  };

  render() {
    // 入参为 ['SZYF', 'QH-AZ03QH', 'DMZ', 'qhaz01m01', 'qh-dmz-paas-migrate-1']
    let targetNodes1 = [
      "SZYF",
      "QH-AZ03QH",
      "DMZ",
      "qhaz01m01",
      "qh-dmz-paas-migrate-1",
    ];
    let targetNodes2 = ["SZYF", "XL-AZ05XL"];
    let targetNodes3 = ["SH", "SH-AZ21SH"];
    let targetNodes4 = ["SZPH"];
    let result1 = [];
    this.listFilter(CLUSTER_META_DATA_NEW, targetNodes1, 0, result1);
    console.log("result1", result1);
    let result2 = [];
    this.listFilter(CLUSTER_META_DATA_NEW, targetNodes4, 0, result2);
    console.log("result2", result2);
    return (
      <>
        {() => {
          return result1.map((item) => <div>{item}</div>);
        }}
      </>
    );
  }
}

export default ListFilter;
