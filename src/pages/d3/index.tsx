import React, { Component } from "react";
import _, { isEmpty } from "lodash";
import { Button, Col, Input, Row } from "antd";
import * as d3 from "d3";

require("./style.css");

const width = 1000;
const height = 600;

const raw222 = [
  {
    areaName: "ceshiyixia",
    children: [
      {
        regionName: "前海-AZ03QH--",
        children: [
          {
            azName: "DMZ",
            children: [
              {
                muName: "qhaz01m01",
              },
            ],
          },
          {
            azName: "BIZ",
            children: [
              {
                muName: "qhaz01m04",
              },
              {
                muName: "qhaz01m02",
              },
            ],
          },
        ],
      },
      // {
      //   regionName: '蛇口-AZ04SK',
      //   children: [
      //     {
      //       azName: 'DMZ',
      //       children: [
      //         {
      //           muName: 'skaz01m01',
      //         },
      //       ],
      //     },
      //     {
      //       azName: 'BIZ',
      //       children: [
      //         {
      //           muName: 'skaz01m04',
      //         },
      //         {
      //           muName: 'skaz01m02',
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        regionName: "西丽-AZ05XL",
        children: [
          {
            azName: "BIZ",
            children: [
              {
                muName: "xlaz01m02",
              },
              {
                muName: "xlaz01m04",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    areaName: "深圳平湖",
    children: [
      {
        regionName: "平湖东-AZ11PH",
        children: [
          {
            azName: "DMZ",
            children: [
              {
                muName: "phaz11m01",
              },
              {
                muName: "phaz11m03",
              },
            ],
          },
          {
            azName: "BIZ",
            children: [
              {
                muName: "phaz11m02",
              },
              {
                muName: "phaz11m04",
              },
              {
                muName: "phaz11m08",
              },
            ],
          },
        ],
      },
      {
        regionName: "平湖西-AZ12PH",
        children: [
          {
            azName: "DMZ",
            children: [
              {
                muName: "phaz12m01",
              },
              {
                muName: "phaz12m03",
              },
            ],
          },
          {
            azName: "BIZ",
            children: [
              {
                muName: "phaz12m02",
              },
              {
                muName: "phaz12m04",
              },
              {
                muName: "phaz12m08",
              },
            ],
          },
        ],
      },
      {
        regionName: "吉华-AZ13JH",
        children: [
          {
            azName: "BIZ",
            children: [
              {
                muName: "jhaz13m02",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    areaName: "上海",
    children: [
      {
        regionName: "上海-AZ21SH",
        // children: [
        //   {
        //     azName: 'DMZ',
        //     children: [
        //       {
        //         muName: 'shaz21m03',
        //       },
        //       {
        //         muName: 'shaz21m01',
        //       },
        //     ],
        //   },
        //   {
        //     azName: 'BIZ',
        //     children: [
        //       {
        //         muName: 'shaz21m02',
        //       },
        //     ],
        //   },
        // ],
      },
      {
        regionName: "上海-AZ22SH",
        children: [
          {
            azName: "DMZ",
            children: [
              {
                muName: "shaz22m01",
              },
              {
                muName: "shaz22m03",
              },
            ],
          },
          {
            azName: "BIZ",
            children: [
              {
                muName: "shaz22m02",
              },
            ],
          },
        ],
      },
      {
        regionName: "锦绣-AZ23JX",
        children: [
          {
            azName: "BIZ",
            children: [
              {
                muName: "jxaz23m02",
              },
            ],
          },
        ],
      },
    ],
  },
];

const raw = [
  {
    areaName: "深圳研发",
    children: [
      {
        regionName: "前海-AZ03QH",
        children: [
          {
            azName: "DMZ",
            children: [
              {
                muName: "qhaz01m01",
              },
            ],
          },
          {
            azName: "BIZ",
            children: [
              {
                muName: "qhaz01m04",
              },
              {
                muName: "qhaz01m02",
              },
            ],
          },
        ],
      },
      {
        regionName: "蛇口-AZ04SK",
        children: [
          {
            azName: "DMZ",
            children: [
              {
                muName: "skaz01m01",
              },
            ],
          },
          {
            azName: "BIZ",
            children: [
              {
                muName: "skaz01m04",
              },
              {
                muName: "skaz01m02",
              },
            ],
          },
        ],
      },
      {
        regionName: "西丽-AZ05XL",
        children: [
          {
            azName: "BIZ",
            children: [
              {
                muName: "xlaz01m02",
              },
              {
                muName: "xlaz01m04",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    areaName: "深圳平湖",
    children: [
      {
        regionName: "平湖东-AZ11PH",
        children: [
          {
            azName: "DMZ",
            children: [
              {
                muName: "phaz11m01",
              },
              {
                muName: "phaz11m03",
              },
            ],
          },
          {
            azName: "BIZ",
            children: [
              {
                muName: "phaz11m02",
              },
              {
                muName: "phaz11m04",
              },
              {
                muName: "phaz11m08",
              },
            ],
          },
        ],
      },
      {
        regionName: "平湖西-AZ12PH",
        children: [
          {
            azName: "DMZ",
            children: [
              {
                muName: "phaz12m01",
              },
              {
                muName: "phaz12m03",
              },
            ],
          },
          {
            azName: "BIZ",
            children: [
              {
                muName: "phaz12m02",
              },
              {
                muName: "phaz12m04",
              },
              {
                muName: "phaz12m08",
              },
            ],
          },
        ],
      },
      {
        regionName: "吉华-AZ13JH",
        children: [
          {
            azName: "BIZ",
            children: [
              {
                muName: "jhaz13m02",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    areaName: "上海",
    children: [
      {
        regionName: "上海-AZ21SH",
        children: [
          {
            azName: "DMZ",
            children: [
              {
                muName: "shaz21m03",
              },
              {
                muName: "shaz21m01",
              },
            ],
          },
          {
            azName: "BIZ",
            children: [
              {
                muName: "shaz21m02",
              },
            ],
          },
        ],
      },
      {
        regionName: "上海-AZ22SH",
        children: [
          {
            azName: "DMZ",
            children: [
              {
                muName: "shaz22m01",
              },
              {
                muName: "shaz22m03",
              },
            ],
          },
          {
            azName: "BIZ",
            children: [
              {
                muName: "shaz22m02",
              },
            ],
          },
        ],
      },
      {
        regionName: "锦绣-AZ23JX",
        children: [
          {
            azName: "BIZ",
            children: [
              {
                muName: "jxaz23m02",
              },
            ],
          },
        ],
      },
    ],
  },
];

const label = "selectLinks";

class BasicForm extends Component {
  state = {
    data: {
      nodes: [
        {
          id: "sz",
          group: 1,
          name: "深圳研发",
          width: 36,
        },
        {
          id: "qh",
          group: 2,
          name: "前海AZ1",
          width: 30,
        },
        {
          id: "sk",
          group: 2,
          name: "蛇口AZ1",
          width: 30,
        },
        {
          id: "xl",
          group: 2,
          name: "西丽AZ1",
          width: 30,
        },
        {
          id: "qh-dmz",
          group: 3,
          name: "DMZ",
          width: 24,
        },
        {
          id: "qh-dmz-mu1",
          group: 4,
          name: "qhza01m01",
          width: 20,
        },
        {
          id: "qh-biz",
          group: 3,
          name: "BIZ",
          width: 24,
        },

        {
          id: "qh-biz-mu1",
          group: 4,
          name: "qhza01m02",
          width: 20,
        },

        {
          id: "qh-biz-mu2",
          group: 4,
          name: "qhza01m03",
          width: 20,
        },

        {
          id: "sk-dmz",
          group: 3,
          name: "DMZ",
          width: 24,
        },
        {
          id: "sk-biz",
          group: 3,
          name: "BIZ",
          width: 24,
        },
        {
          id: "xl-dmz",
          group: 3,
          name: "DMZ",
          width: 24,
        },
        {
          id: "xl-biz",
          group: 3,
          name: "BIZ",
          width: 24,
        },
      ],
      links: [
        {
          source: "sz",
          target: "qh",
          value: 1,
        },
        {
          source: "qh",
          target: "qh-dmz",
          value: 1,
        },

        {
          source: "qh-dmz",
          target: "qh-dmz-mu1",
          value: 1,
        },
        {
          source: "qh",
          target: "qh-biz",
          value: 1,
        },
        {
          source: "qh-biz",
          target: "qh-biz-mu1",
          value: 1,
        },
        {
          source: "qh-biz",
          target: "qh-biz-mu2",
          value: 1,
        },
        {
          source: "sz",
          target: "sk",
          value: 1,
        },
        {
          source: "sk",
          target: "sk-dmz",
          value: 1,
        },
        {
          source: "sk",
          target: "sk-biz",
          value: 1,
        },
        {
          source: "sz",
          target: "xl",
          value: 1,
        },
        {
          source: "xl",
          target: "xl-dmz",
          value: 1,
        },
        {
          source: "xl",
          target: "xl-biz",
          value: 1,
        },
      ],
    },
    rawData: raw,
    addLinks: [],
  };

  componentDidMount() {
    this.svg = d3
      .select(this.d3Node)
      .append("svg")
      // .attr('width', width)
      // .attr('height', height)
      .attr("viewBox", `0 0 ${width} ${height}`);
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    // https://cloud.tencent.com/developer/ask/sof/541094/answer/829691   防止节点重叠

    this.graphGroup = this.svg.append("g").attr("class", "graphGroup");

    this.linksGroup = this.graphGroup.append("g");
    this.nodesGroup = this.graphGroup.append("g");

    var zoom = d3
      .zoom()
      .scaleExtent([0.1, 10]) // 鼠标缩放的距离, 范围
      .on("start", () => {
        // zoom 事件发生前 将变小手
        console.log("start");
        this.svg.style("cursor", "pointer");
      })
      .on("zoom", (e) => {
        let scale = e.transform.k;
        // if (scale > 1.3) {
        //   // this.svg.selectAll('.nodessvg').remove();
        //   this.setState(
        //     {
        //       rawData: raw222,
        //     }
        //     // this.updateDiagrarm,
        //   );
        //   this.svg
        //     .selectAll("g.graphGroup")
        //     .attr(
        //       "transform",
        //       "translate(" +
        //         e.transform.x +
        //         "," +
        //         e.transform.y +
        //         ") scale(" +
        //         1.3 +
        //         ")"
        //     );
        //   return;
        // }
        console.log("zoom", e);
        // this.svg.selectAll('circle').attr('transform',
        //     'translate(' + e.transform.x + ',' + e.transform.y + ') scale(' + e.transform.k + ')'
        // )
        // this.svg.selectAll('line').attr('transform',
        //     'translate(' + e.transform.x + ',' + e.transform.y + ') scale(' + e.transform.k + ')'
        // )
        // 获取整个图的container <g>
        this.svg
          .selectAll("g.graphGroup")
          .attr(
            "transform",
            "translate(" +
              e.transform.x +
              "," +
              e.transform.y +
              ") scale(" +
              e.transform.k +
              ")"
          );
      })
      .on("end", () => {
        this.svg.style("cursor", "default");
      });
    this.svg.call(zoom).call(zoom.transform, d3.zoomIdentity.scale(1));

    this.simulation = d3
      .forceSimulation()
      // .alphaDecay(0.1)
      //   .force('link')
      // .id(d => d.id)
      // .distance(0)
      // .strength(1)
      // .iterations(1)
      .force(
        "link",
        d3
          .forceLink()
          // .links([])
          .id((d) => {
            // console.log("force.id", d);
            return d.id;
          })
          .distance((d) => {
            // console.log("force.distance", d);
            return d.distance || 30;
          })
      )
      // .force(
      //   "link",
      //   d3
      //     .forceLink()
      //     .id((d) => {
      //       console.log("force.d", d);
      //       return d.id;
      //     })
      //     .distance(1000)
      //     .strength(0.5)
      // )
      .force(
        "collide",
        d3
          .forceCollide((d) => {
            return d.width + 8;
          })
          .iterations(1)
      )
      .force("charge", d3.forceManyBody().strength(-10))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // this.nodesGroup = this.svg.append('g');
    // this.labelGroup = this.svg.append('g');

    this.updateDiagrarm({});
  }

  generateNode = ({ addLinks = [] }) => {
    let nodes = [
      // {
      //   id: 'root',
      //   group: 0,
      //   name: '',
      //   width: 10,
      //   fixed: true,
      //   x: width / 2,
      //   y: height / 2,
      // },
    ];
    const positionMap = {
      0: {
        fixedX: 150,
        fixedY: 150,
      },
      1: {
        fixedX: 700,
        fixedY: 150,
      },
      2: {
        fixedX: 450,
        fixedY: 450,
      },
    };
    let customLinks = [
      // {
      //   source: '0-1',
      //   target: '1-1-1',
      //   value: 1,
      //   distance: 100,
      //   type: 'net'
      // },
      // {
      //   source: '1-1',
      //   target: '2-1-1',
      //   value: 1,
      //   distance: 100,
      //   type: 'net'
      // }
    ];
    const { rawData } = this.state;
    rawData.forEach((area, index1) => {
      const { children, areaName } = area;
      nodes.push({
        id: index1,
        group: 1,
        name: areaName,
        width: 32,
        fixed: true,
        ...positionMap[index1],
      });

      // links.push({
      //   source: 'root',
      //   target: index1,
      //   value: 1,
      //   distance: 120,
      // });

      (children || []).forEach((region, index2) => {
        const { children, regionName } = region;
        nodes.push({
          id: index1 + "-" + index2,
          group: 2,
          name: regionName,
          width: 24,
        });
        customLinks.push({
          source: index1,
          target: index1 + "-" + index2,
          value: 1,
          distance: 36,
        });

        (children || []).forEach((az, index3) => {
          const { children, azName } = az;
          nodes.push({
            id: index1 + "-" + index2 + "-" + index3,
            group: 3,
            name: azName,
            width: 16,
          });
          customLinks.push({
            source: index1 + "-" + index2,
            target: index1 + "-" + index2 + "-" + index3,
            value: 1,
            distance: 24,
          });

          (children || []).forEach((mu, index4) => {
            const { muName } = mu;
            nodes.push({
              id: index1 + "-" + index2 + "-" + index3 + "-" + index4,
              group: 4,
              name: muName,
              width: 10,
            });
            customLinks.push({
              source: index1 + "-" + index2 + "-" + index3,
              target: index1 + "-" + index2 + "-" + index3 + "-" + index4,
              value: 1,
              distance: 10,
            });
          });
        });
      });
    });
    if (!isEmpty(addLinks)) {
      customLinks = customLinks.concat(addLinks);
    }
    console.log("generateNode.customLinks", customLinks);
    console.log("generateNode.addLinks", addLinks);
    // links2.push({
    //   source: {
    //     // group: 4,
    //     // id: "1-2-0-0",
    //     // index: 36,
    //     // name: "jhaz13m02",
    //     // vx: -0.002500783353980384,
    //     // vy: -0.004214864708575957,
    //     // width: 10,
    //     x: 737.3661074775405,
    //     y: 194.37301320916268,
    //   },
    //   target: {
    //     // group: 4,
    //     // id: "2-2-0-0",
    //     // index: 52,
    //     // name: "jxaz23m02",
    //     // vx: 0,
    //     // vy: 0,
    //     // width: 10,
    //     x: 547.4415016904237,
    //     y: -55.17563481410839,
    //   },
    //   value: 1,
    //   distance: 24,
    // });

    // links2.push({
    //   source: "2-1-0-0",
    //   target: "2-2-0-0",
    //   value: 1,
    //   distance: 10000,
    // });
    // links2.push({
    //   source: "1-0-0",
    //   target: "2-2-0-0",
    //   value: 1,
    // });
    // links2.push({
    //   source: "1-0-0",
    //   target: "2-2-0-0",
    //   value: 1,
    // });
    // links2.push({
    //   source: "0-1",
    //   target: "2-2-0-0",
    //   value: 1,
    // });
    // links2.push({
    //   source: 0,
    //   target: "2-2-0-0",
    //   value: 1,
    // });
    // links2.push({
    //   source: 1,
    //   target: 2,
    //   value: 1,
    // });

    // console.log("generate.links", links[0]);
    // console.log("generate.JSONlinks", JSON.stringify(links2));

    // debugger;
    return {
      nodes,
      links: customLinks,
    };
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log("componentDidUpdate.prevProps", prevProps);
    // console.log("componentDidUpdate.prevState", prevState);
    const { addLinks } = this.state;
    if (this.state.rawData !== prevState.rawData || !isEmpty(addLinks)) {
      // console.log("componentDidUpdate");
      this.updateDiagrarm({ addLinks });
    }
  }

  updateDiagrarm({ addLinks = [] }) {
    // const { data } = this.state;
    const data = this.generateNode({ addLinks });
    this.setState({ data });
    // debugger;
    console.log("generateNode", data);
    console.log("updateDiagrarm.this", this);
    console.log("updateDiagrarm.this.linksGroup", this.linksGroup);
    let link = this.linksGroup
      .selectAll("path")
      .attr("class", "links")
      .data(data.links)
      .join((enter) => enter.append("path").attr("fill", "none"));
    // link.exit().remove();
    // link = link
    //   .enter()
    //   .append("path")
    //   .attr("fill", "none")
    //   // .attr('stroke-width', function (d) {
    //   //   return Math.sqrt(d.value);
    //   // })
    //   // .attr("class", "links")
    //   // 将连线加粗并改为虚线
    //   .merge(link); // 合并新旧数据

    const line = d3
      .line()
      .x((d) => d.pageX)
      .y((d) => d.pageY)
      .curve(d3.curveMonotoneX); // 使用curve函数来创建平滑的曲线

    link
      .filter((item) => {
        console.log("link.filter.item", item);
        return item.label ? true : false;
      })
      .attr("stroke", "rgba(76, 83, 110, 0.5)")
      .attr("stroke-width", 3.88209)
      .attr("stroke-opacity", 1)
      .attr("stroke-dashoffset", (item) => {
        console.log("link.attr.item", item);
        return 8;
      })
      .attr("stroke-dasharray", "8, 2")
      .on("click", (d) => {
        console.log("link.click.d", d);
      })
      .attr("d", line);

    // .remove()
    // // 添加过渡效果
    // .transition() // First fade to green.
    // .style("fill", "green")
    // .transition() // Then red.
    // .style("fill", "red")
    // .transition() // Wait one second. Then brown, and remove.
    // .delay(1000)
    // .style("fill", "brown")
    // .remove()
    // .duration(1000) // 过渡持续时间
    // .attr("stroke", "blue") // 修改连线颜色为蓝色
    // .attr("stroke-width", 2); // 修改连线宽度为2像素
    console.log("updateDiagrarm.link", link);

    // let node = this.nodesGroup.attr('class', 'nodes').selectAll('circle').data(data.nodes);
    // node.exit().remove();
    let node = this.nodesGroup
      .attr("class", "nodesGroup")
      // .append('g')
      .selectAll("g")
      .data(data.nodes);
    // .join('g')
    // .call(
    //   d3.drag().on('start', this.dragstarted).on('drag', this.dragged).on('end', this.dragended),
    // );

    node.exit().remove();
    console.log("node", node);

    node = node
      .enter()
      .append("g")
      .call(
        d3
          .drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended)
      )
      .merge(node);

    console.log("node2", node);
    node.selectAll(".nodeCircle").remove();
    node.selectAll(".nodeLabel").remove();
    node
      .attr("class", "nodessvg")
      .append("circle")
      .attr("r", (d) => d.width)
      .attr("class", "nodeCircle")
      .attr("fill", (d) => {
        return this.color(d.group);
      })
      // .style('display', (d) => (d.group === 1 ? 'inline' : 'none'))
      .call(
        d3
          .drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended)
      );
    // .on('click', click)
    // .merge(node);

    // function click(d) {
    //   console.log('click', d);
    //   if (!d3.event.defaultPrevented) {
    //     // if there children, move them to _children and clear data in children
    //     if (d.children) {
    //       d._children = d.children;
    //       d.children = null;
    //     } else {
    //       // if no children, move data from _children to children and clear data in _children
    //       d.children = d._children;
    //       d._children = null;
    //     }
    //   }
    // }

    node
      .append("text")
      .attr("class", "nodeLabel")
      .attr("x", (d) => -d.width / 2)
      .attr("y", "0.31em")
      .attr("font-size", "8")
      .text((d) => d.name)
      .clone(true)
      .lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // node = node
    //   .enter()
    //   .append('circle')
    //   .attr('r', (d) => (d.id === 'id1' ? 24 : 16))
    //   .attr('fill', (d) => {
    //     return this.color(d.group);
    //   })
    //   .call(
    //     d3.drag().on('start', this.dragstarted).on('drag', this.dragged).on('end', this.dragended),
    //   )
    //   .merge(node);

    // node = node
    //   .enter()
    //   .append('circle')
    //   .attr('r', (d) => (d.id === 'id1' ? 24 : 16))
    //   .attr('fill', (d) => {
    //     return this.color(d.group);
    //   })
    //   .call(
    //     d3.drag().on('start', this.dragstarted).on('drag', this.dragged).on('end', this.dragended),
    //   )
    //   .merge(node);

    // node
    //   .append('text')
    //   .attr('x', 8)
    //   .attr('y', '0.31em')
    //   .text((d) => d.name)
    //   .clone(true)
    //   .lower()
    //   .attr('fill', 'none')
    //   .attr('stroke', 'white')
    //   .attr('stroke-width', 3);

    // let label = this.labelGroup.attr('class', 'label').selectAll('text').data(data.nodes);
    // label.exit().remove();
    // label = label
    //   .append('g')
    //   .style('font', '10px sans-serif')
    //   .attr('pointer-events', 'none')
    //   .attr('text-anchor', 'middle')
    //   .selectAll('text')
    //   .data(data.nodes)
    //   .join('text')
    //   .style('fill-opacity', 1)
    //   .style('display', 'inline')
    //   .text((d) => d.name)
    //   .merge(label);

    // label = this.svg
    //   .append('g')
    //   .style('font', '10px sans-serif')
    //   .attr('pointer-events', 'none')
    //   .attr('text-anchor', 'middle')
    //   .selectAll('text')
    //   .data(data.nodes)
    //   .join('text')
    //   .style('fill-opacity', 1)
    //   .style('display', 'inline')
    //   .text((d) => d.name);
    //   console.log(this.label)

    this.simulation.nodes(data.nodes).on("tick", ticked);

    this.simulation
      // .force("link")
      .force(
        "link",
        d3
          .forceLink(data.links)
          // .forceLink(
          //   data.links.filter((item) => {
          //     console.log("forceLink.item", item);
          //     return item.distance < 1000;
          //   })
          // )
          // .links(data.links.filter((item) => item.distance < 1000))
          .links(data.links)
          .id((d) => {
            // console.log("force.d", d);
            return d.id;
          })
          .distance(40)
          // .distance((d) => {
          //   console.log("force.distance", d);
          //   return d.distance || 40;
          // })
          // .distance(40)
          .strength((item) => {
            console.log("strength.item", item);
            return item.label === label ? 0 : 1;
          }) // 连接力强度 0 ~ 1
          .iterations(1)
        // .style((item) => {
        //   return "red";
        // })
      ); // 迭代次数

    this.simulation.alpha(1).restart();

    function ticked() {
      // link
      //   .attr('stroke', '#c7c7c7')
      //   .attr('x1', (d) => d.source.x)
      //   .attr('y1', (d) => d.source.y)
      //   .attr('x2', (d) => d.target.x)
      //   .attr('y2', (d) => d.target.y);

      // node.attr("transform", d => `translate(${d.fixed?d.x:validateXY(d.x,'x')},${d.fixed?d.fixedY:validateXY(d.y,'y')})`);
      node.attr("transform", (d) => {
        if (d.fixed) {
          d.fx = d.fixedX;
          d.fy = d.fixedY;
        }
        return `translate(${d.x},${d.y})`;
      });
      console.log("tick link", link);
      link
        .attr("stroke", "#c7c7c7")
        // .attr('x1', (d) => validateXY(d.source.x, 'x'))
        // .attr('y1', (d) => validateXY(d.source.y, 'y'))
        // .attr('x2', (d) => validateXY(d.target.x, 'x'))
        // .attr('y2', (d) => validateXY(d.target.y, 'y'))
        .attr("d", (d) => generateArc(d));

      // node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

      // node.attr("transform", d => `translate(${d.x},${d.y})`);
      // node.attr("cx",function(d){ return validateXY(d.x,'x'); })
      //                .attr("cy",function(d){ return validateXY(d.y,'y'); });
      // node
      //   .attr('cx', function (d) {
      //     return d.x;
      //   })
      //   .attr('cy', function (d) {
      //     return d.y;
      //   });
    }

    function generateArc(d) {
      let arc = 0;
      if (d.type === "net") {
        arc = 0.1;
      }
      return (
        "M" +
        d.source.x +
        "," +
        d.source.y +
        "A" +
        arc +
        "," +
        arc +
        " 0 0," +
        1 +
        " " +
        d.target.x +
        "," +
        d.target.y
      );
    }

    function validateXY(val, type) {
      // var r = 30;
      // if (val < r) return r;
      // if (type == 'x') {
      //   if (val > width - r) return width - r;
      // } else {
      //   if (val > height - r) return height - r;
      // }
      return val;
    }
  }

  // redraw = () => {
  //   return this.svg.attr(
  //     "transform",
  //     "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")"
  //   );
  // };

  dragstarted = (event, d) => {
    console.log("dragstarted.event", event);
    console.log("dragstarted.d", d);
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  };
  dragged = (event, d) => {
    d.fx = event.x;
    d.fy = event.y;
  };
  dragended = (event, d) => {
    if (!event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  };

  handleAddNode = () => {
    const id = `id${new Date().getTime()}`;
    const node = { id, group: _.random(1, 9) };
    this.setState({
      data: {
        nodes: [...this.state.data.nodes, node],
        links: [
          ...this.state.data.links,
          { source: "id1", target: id, value: 1 },
        ],
      },
    });
  };

  handleButtonClick = () => {
    // console.log("handleButtonClick.state", this.state);
    const addLinks = [
      {
        source: "2-1-0-0",
        target: "2-2-0-0",
        value: 1,
        label: label,
        style: { color: "red" },
      },
      {
        source: "1-0-0",
        target: "2-2-0-0",
        value: 1,
        label: label,
      },
      {
        source: "1-0-0",
        target: "2-2-0-0",
        value: 1,
        label: label,
      },
      {
        source: "0-1",
        target: "2-2-0-0",
        value: 1,
        label: label,
      },
      {
        source: 0,
        target: "2-2-0-0",
        value: 1,
        label: label,
      },
    ];
    this.updateDiagrarm({ addLinks });
    // this.setState({
    //   addLinks,
    // });
  };

  render() {
    return (
      <>
        {/* <Row>
          <Col span={12}>
            客户端<Input></Input>
          </Col>
          <Col span={12}>
            服务端<Input></Input>
          </Col>
        </Row> */}
        <Button onClick={this.handleButtonClick}>连线</Button>
        <div className="d3-sample">
          {/* <div style={{ margin: "0 0 20px 0" }}>
        <Button onClick={this.handleAddNode}>Add node</Button>
      </div> */}
          <div className="d3-node" ref={(node) => (this.d3Node = node)} />
        </div>
      </>
    );
  }
}

export default BasicForm;
