import * as d3 from "d3";
import React from "react";

class SelectDemo extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    // const data = [12, 5, 6, 6, 9, 10];
    // const svg = d3
    //   .select("body")
    //   .append("svg")
    //   .attr("width", 700)
    //   .attr("height", 300)
    //   .attr("fill", "#adc6ff");

    // svg
    //   .selectAll("rect")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("x", (d, i) => i * 70)
    //   .attr("y", (d) => 300 - 10 * d)
    //   .attr("width", 65)
    //   .attr("height", (d) => d * 10)
    //   .attr("fill", "#adc6ff");

    // d3.select("body")
    //   .append("svg")
    //   .attr("width", 300)
    //   .attr("height", 200)
    //   .attr("fill", "#adc6ff")
    //   .append("g")
    //   .attr("transform", "translate(20,20)")
    //   .attr("fill", "#adc6ff")
    //   .append("rect")
    //   .attr("width", 920)
    //   .attr("height", 460)
    //   .attr("fill", "#adc6ff");

    // const matrix = [
    //   [11975, 5871, 8916, 2868],
    //   [1951, 10048, 2060, 6171],
    //   [8010, 16145, 8090, 8045],
    //   [1013, 990, 940, 6907],
    // ];

    // d3.select("body")
    //   .append("table")
    //   .selectAll("tr")
    //   .data(matrix)
    //   .join("tr")
    //   .selectAll("td")
    //   .data((d) => d)
    //   .join("td")
    //   .text((d) => d);

    // const data1 = [
    //   { name: "Locke", number: 4 },
    //   { name: "Reyes", number: 8 },
    //   { name: "Ford", number: 15 },
    //   { name: "Jarrah", number: 16 },
    //   { name: "Shephard", number: 23 },
    //   { name: "Kwon", number: 42 },
    // ];

    // d3.selectAll("div")
    //   .data(data1, function (d) {
    //     return d ? d.name : this.id;
    //   })
    //   .text((d) => d.number);

    const data = [
      { date: "2022-01-01", value: 10 },
      { date: "2022-01-02", value: 20 },
      { date: "2022-01-03", value: 15 },
      { date: "2022-01-04", value: 25 },
      { date: "2022-01-05", value: 18 },
    ];

    const svg = d3
      .select(this.refs.chart)
      .append("svg")
      .attr("width", 400)
      .attr("height", 200);

    const xScale = d3
      .scaleTime()
      .domain([new Date("2022-01-01"), new Date("2022-01-05")])
      .range([0, 400]);

    const yScale = d3.scaleLinear().domain([0, 25]).range([200, 0]);

    const line = d3
      .line()
      .x((d) => xScale(new Date(d.date)))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX); // 使用curve函数来创建平滑的曲线

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
  }

  render() {
    return (
      <>
        <div id="d3"></div>
        <div ref="chart"></div>
        <div id="Ford"></div>
        <div id="Jarrah"></div>
        <div id="Kwon"></div>
        <div id="Locke"></div>
        <div id="Reyes"></div>
        <div id="Shephard"></div>
      </>
    );
  }
}

export default SelectDemo;
