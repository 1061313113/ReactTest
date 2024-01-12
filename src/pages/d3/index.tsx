import React, { Component } from "react";
import _, { isEmpty, get } from "lodash";
import { Button, Col, Input, Row } from "antd";
import * as d3 from "d3";
const { Search } = Input;

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
  // state = {

  // };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      searchValue: null, // 添加一个新的状态来存储搜索的节点ID
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
  }

  handleSearch = (value) => {
    console.log("handleSearch.value", value);
    d3.selectAll(".nodessvg") // 选择所有class为'nodessvg'的g元素
      .selectAll("circle") // 在每个g元素中选择所有的circle元素
      .filter((d) => {
        return d.name === value ? true : false;
      })
      .transition()
      .duration(2000) // 设置整个动画的持续时间
      .ease(d3.easeLinear) // 设置动画的缓动函数
      .attr("r", 50) // 修改圆环的半径，实现波纹效果
      .style("stroke-opacity", 0) // 设置圆环的边框透明度
      .style("fill-opacity", 0) // 设置圆环的填充透明度
      .transition()
      .duration(2000) // 设置整个动画的持续时间
      .ease(d3.easeLinear) // 设置动画的缓动函数
      .attr("r", 10) // 恢复原始半径
      .style("stroke-opacity", 1) // 恢复原始边框透明度
      .style("fill-opacity", 1); // 恢复原始填充透明度
    // .on("end", function () {
    //   d3.select(this).apply(rippleEffect(value)); // 循环播放动画
    // });
    this.setState({ searchValue: value });

    // 使用transition的on方法来实现循环播放动画
    function rippleEffect(value) {
      d3.selectAll(".nodesvg")
        .selectAll("circle") // 在每个g元素中选择所有的circle元素
        .filter((d) => {
          return d.name === value ? true : false;
        })
        .transition()
        .duration(2000) // 设置整个动画的持续时间
        .ease(d3.easeLinear) // 设置动画的缓动函数
        .attr("r", 50) // 修改圆环的半径，实现波纹效果
        .style("stroke-opacity", 0) // 设置圆环的边框透明度
        .style("fill-opacity", 0) // 设置圆环的填充透明度
        .transition()
        .duration(2000) // 设置整个动画的持续时间
        .ease(d3.easeLinear) // 设置动画的缓动函数
        .attr("r", 10) // 恢复原始半径
        .style("stroke-opacity", 1) // 恢复原始边框透明度
        .style("fill-opacity", 1) // 恢复原始填充透明度
        .on("end", function () {
          d3.select(this).call(rippleEffect); // 循环播放动画
        });
    }
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
        // console.log("start");
        this.svg.style("cursor", "pointer");
      })
      .on("zoom", (e) => {
        let scale = e.transform.k;
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
    const data = this.generateNode({ addLinks });
    this.setState({ data });

    // // 选择所有的路径元素
    // let link = this.linksGroup
    //   .selectAll("path")
    //   .attr("class", "links")
    //   .data(data.links);
    // // 移出多余的路径元素
    // link.exit().remove();
    // // 为新数据创建路径元素
    // link = link.enter().append("path").attr("fill", "none").merge(link);

    // 使用join方法将连线修改为<g>元素，并在其中添加多个<path>
    let linkGroup = this.linksGroup
      .selectAll("g") // 选择所有的<g>元素
      .data(data.links) // 绑定数据
      .join(
        (enter) =>
          enter
            .append("g") // 在enter选择集中添加<g>元素
            .attr("class", "link-group")
            .each(function (d) {
              // 在每个<g>元素中添加多个<path>
              d3.select(this)
                .append("path")
                .attr("class", "link")
                .attr("fill", "none");
            }),
        (update) => update, // 处理更新的情况
        (exit) => exit.remove() // 处理退出的情况
      );
    console.log("linkGroup", linkGroup);

    if (!isEmpty(addLinks)) {
      debugger;
      // 在<g>元素中添加多个<path>，并设置样式和属性
      linkGroup
        .selectAll("path")
        .filter((item) => item.label) // 过滤出带有label的元素
        .each(function (d) {
          // 在每个符合条件的连线周围添加透明矩形
          const parent = d3.select(this.parentNode); // 选择父元素（<g>元素）
          const line = d3.select(this); // 选择连线元素

          // 创建一个表示连线的路径
          const lineGenerator = d3
            .line()
            .x((d) => d.x)
            .y((d) => d.y);
          const pathData = lineGenerator([d.source, d.target]);

          // 获取包围这个路径的最小矩形
          const bbox = line.node().getBBox();

          parent
            .append("rect") // 在父元素中添加矩形
            .attr("x", bbox.x)
            .attr("y", bbox.y)
            .attr("width", bbox.width)
            .attr("height", bbox.height)
            .attr("fill", "transparent")
            .on("click", () => {
              console.log("Line clicked!");
            });
        })
        // .attr("d", (d) => buildSelectLinks(d))
        .attr("stroke", "rgba(76, 83, 110, 0.5)")
        .attr("stroke-width", 3.88209)
        .attr("stroke-opacity", 1)
        // .attr("stroke-dashoffset", (item) => {
        //   console.log("link.attr.item", item);
        //   return 8;
        // })
        .attr("stroke-dasharray", "8, 3")
        .on("mouseover", function () {
          // 鼠标移入时的操作
          d3.select(this).attr("fill", "lightgray");
        })
        .on("mouseout", function () {
          // 鼠标移出时的操作
          d3.select(this).attr("fill", "transparent");
        })
        .on("click", (d) => {
          console.log("link.click.d", d);
        })
        .transition()
        .duration(100000) // 过渡持续时间为1秒
        .ease(d3.easeLinear) // 使用线性缓动函数
        .attr("stroke-dashoffset", (item) => {
          // 在这里计算新的dashoffset值
          const newDashOffset = calculateNewDashOffset(item);
          return newDashOffset;
        });
    }
    // if (!isEmpty(addLinks)) {
    //   debugger;
    //   link
    //     .filter((item) => {
    //       return item.label ? true : false;
    //     })
    //     // .attr("d", (d) => buildSelectLinks(d))
    //     .attr("stroke", "rgba(76, 83, 110, 0.5)")
    //     .attr("stroke-width", 3.88209)
    //     .attr("stroke-opacity", 1)
    //     // .attr("stroke-dashoffset", (item) => {
    //     //   console.log("link.attr.item", item);
    //     //   return 8;
    //     // })
    //     .attr("stroke-dasharray", "8, 3")
    //     .on("click", (d) => {
    //       console.log("link.click.d", d);
    //     })
    //     .transition()
    //     .duration(100000) // 过渡持续时间为1秒
    //     .ease(d3.easeLinear) // 使用线性缓动函数
    //     .attr("stroke-dashoffset", (item) => {
    //       // 在这里计算新的dashoffset值
    //       const newDashOffset = calculateNewDashOffset(item);
    //       return newDashOffset;
    //     });
    // }
    //     .append("rect")
    //     .attr("x", 0)
    //     .attr("y", 0)
    //     .attr("width", 200)
    //     .attr("height", 10)
    //     .attr("fill", "transparent")
    //     .on("click", () => {
    //       console.log("Line clicked!");
    //     })

    function calculateNewDashOffset(item) {
      // 基于当前状态计算新的dashoffset值
      // 这里可以根据具体的逻辑和需求进行计算
      // 例如根据时间、数据等来决定新的dashoffset值
      const newDashOffset = Math.random() * 10000; // 举例：随机生成一个新的dashoffset值
      return newDashOffset;
    }

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
    console.log("updateDiagrarm.link", linkGroup);

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
            // console.log("strength.item", item);
            return item.label === label ? 0 : 1;
          }) // 连接力强度 0 ~ 1
          .iterations(1)
        // .style((item) => {
        //   return "red";
        // })
      ); // 迭代次数

    this.simulation.alpha(1).restart();
    // 深圳研发
    function ticked() {
      node.attr("transform", (d) => {
        if (d.fixed) {
          d.fx = d.fixedX;
          d.fy = d.fixedY;
        }
        return `translate(${d.x},${d.y})`;
      });

      // 高亮显示搜索到的节点
      // node.selectAll("circle").style("fill", (d, i) => {
      //   // console.log("search.d", d);
      //   // console.log("search.i", i);
      //   // console.log("search.searchValue", get(this.state, "searchValue", ""));
      //   if (get(this.state, "searchValue", "")) {
      //     return d.name === this.state.searchValue ? "red" : "black";
      //   }
      //   // return "none";
      // });

      linkGroup
        .selectAll("path")
        .attr("stroke", "#c7c7c7")
        .attr("d", (d) => generateArc(d));
    }

    function generateArc(d) {
      // console.log("generateArc.d", d);
      let arc = 0;
      if (d.label) {
        const SX = d.source.x;
        const SY = d.source.y;
        const TX = d.target.x;
        const TY = d.target.y;
        let QX = d.source.x;
        let QY = d.target.y;
        if (SY === TY) {
          QX = SX + (TX - SX) / 2;
        } else if (SX === TX) {
          QY = SY + (TY - SY) / 2;
        } else if (SX < TX && SY < TY) {
          QX = (SX + (TX - SX) / 2) * 0.9;
          QY = (SY + (TY - SY) / 2) * 1.1;
        } else if (SX > TX && SY > TY) {
          QX = (TX + (SX - TX) / 2) * 0.9;
          QY = (TY + (SY - TY) / 2) * 1.1;
        } else if (SX < TX && SY > TY) {
          QX = (SX + (TX - SX) / 2) * 1.1;
          QY = (TY + (SY - TY) / 2) * 1.1;
        } else {
          QX = (TX + (SX - TX) / 2) * 1.1;
          QY = (SY + (TY - SY) / 2) * 1.1;
        }
        return (
          "M" +
          d.source.x +
          "," +
          d.source.y +
          "Q" +
          QX +
          // (d.target.x - d.source.x) / 2 +
          "," +
          QY +
          // (d.target.y - d.source.y) / 2 +
          "," +
          d.target.x +
          "," +
          d.target.y
        );
      }
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
        <Search
          placeholder="input search text"
          onSearch={this.handleSearch}
          enterButton
        />
        <svg ref={this.myRef} />
      </>
    );
  }
}

export default BasicForm;
