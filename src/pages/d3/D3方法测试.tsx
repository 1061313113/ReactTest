// 你的路径数据
.attr("opacity", 0.1)
// 使用D3的过渡（transition）API来逐渐改变stroke-dashoffset属性，从而实现路径的动态显示效果
.transition()
.duration(2000)
.ease(d3.easeLinear)
.attrTween("stroke-dashoffset", (d, i, a) => {
  const interpolate = d3.interpolate(0, 8);
  return function (t) {
    return interpolate(t);
  };
})
// 设置链接样式和颜色
.attr("stroke", "rgba(76, 83, 110, 0.5)")
.attr("fill", "none")
.attr("stroke-width", 2.00002)
.attr("stroke-opacity", 1)
// 更新链接样式
.attr("stroke", (d) => {
  // 根据数据动态设置链接颜色
  return "blue";
  // return d.value > 5 ? "red" : "blue";
});

    // console.log("totalLength0", totalLength);
    // const totalLength = link.node().getTotalLength();

    // link
    //   .attr("stroke-dasharray", totalLength + " " + totalLength)
    //   .attr("stroke-dashoffset", totalLength)
    //   .transition()
    //   .duration(2000)
    //   .ease(d3.easeLinear)
    //   .attr("stroke-dashoffset", 0);