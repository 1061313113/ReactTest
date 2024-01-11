import * as d3 from "d3";
import React from "react";
import { get, isEmpty } from "lodash";

class D3Arcs extends React.Component {
  componentDidMount() {
    let object = { name: null };
    let result = get(object, "name", {});
    console.log("isEmpty", isEmpty(result));
    console.log("result", result);
    let list = null;
    list = get(result, "list", []) || [];
    list.map((item) => item);
    this.drawArcLine();
  }

  drawArcLine() {
    const svg = d3.select(this.refs.arcLine);
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    // const arc = d3
    //   .arc()
    //   .innerRadius(radius - 100)
    //   .outerRadius(radius - 50)
    //   .startAngle(0)
    //   .endAngle(Math.PI);
    // const arc = d3
    //   .arc()
    //   .innerRadius(0)
    //   .outerRadius(100)
    //   .startAngle(0)
    //   .endAngle(Math.PI / 2);
    // 创建一个弯曲的曲线
    const arc = d3.arc()({
      innerRadius: 0,
      outerRadius: 100,
      startAngle: Math.PI, // 从180度开始
      endAngle: Math.PI * 2, // 到360度结束
    });

    svg
      .append("path")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2},${height / 2})`)
      .attr("fill", "lightblue")
      .attr("stroke-width", 3.88209);
  }

  render() {
    return <svg ref="arcLine" width="500" height="500"></svg>;
  }
}

export default D3Arcs;
