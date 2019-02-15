<template>
  <div>
    <div id="graph"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    this.d3init();
  },
  methods: {
    d3init() {
      let width = 100;
      let height = width;
      let radius = width / 2;

      // 绘制 svg面板
      let svg = d3
        .select("#graph")
        .append("svg")
        .attr("width", 400)
        .attr("height", 300);
      // 绘制 rect
      svg
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#2ecc71");
      // 绘制 circle
      svg
        .append("circle")
        .attr("r", radius)
        .attr("cx", width + radius)
        .attr("cy", height / 2)
        .attr("fill", "#3498db");
      // 绘制 line
      svg
        .append("line")
        .attr("x1", width * 2)
        .attr("y1", 0)
        .attr("x2", width * 3)
        .attr("y2", height)
        .attr("stroke-width", 2)
        .attr("stroke", "#e74c3c");
      // 创建 arc
      var arc = d3
        .arc()
        .innerRadius(radius - 20)
        .outerRadius(radius)
        .startAngle(0)
        .endAngle(1.2 * Math.PI);
      // 使用 arc 创建 path
      svg
        .append("g")
        .attr("transform", `translate(${width * 3 + radius},${radius})`)
        .append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("fill", "#ecf0f1");
    }
  }
};
</script>

<style scoped>
</style>