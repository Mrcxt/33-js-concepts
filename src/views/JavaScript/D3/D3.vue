<template>
  <div>
    <div id="graph"></div>
    <svg></svg>
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
    this.forceInit();
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
    },
    forceInit() {
      var width = 500;
      var height = 500;
      var svg = d3.select("svg");
      svg
        .attr("x", 300)
        .attr("y", 300)
        .attr("width", 1000)
        .attr("height", 1000);

      var nodes = [
        { name: "桂林" },
        { name: "广州" },
        { name: "厦门" },
        { name: "杭州" },
        { name: "上海" },
        { name: "青岛" },
        { name: "天津" }
      ];

      var edges = [
        { source: 0, target: 1 },
        { source: 0, target: 2 }, //试了下，source和target不能换名字的
        { source: 0, target: 3 },
        { source: 1, target: 4 },
        { source: 1, target: 5 },
        { source: 1, target: 6 }
      ];
      /*初始化force*/

      var forceSimulation = d3.layout
        .forceSimulation()
        .nodes(nodes)
        .links(edges)
        .size([300, 300]) //作用力的中心区域
        .linkDistance(100) //连线的长度
        .charge([-100]); //负数为排斥 正数为吸引
      /*很关键 启动force*/
      forceSimulation.start();
      /*添加连线*/
      var svg_edges = svg
        .selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("dx", function(d, i) {
          return i * 20;
        })
        .attr("dy", function(d, i) {
          return i * 30;
        })
        .style("stroke", "#ccc") //线条的颜色
        .style("stroke-width", 1); //线条的宽度
      /*颜色*/
      var color = d3.scale.category20();
      /*添加节点*/
      var svg_nodes = svg
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {
          return i * 20;
        })
        .attr("cy", function(d, i) {
          return i * 30;
        })
        .attr("r", 20)
        .style("fill", function(d, i) {
          return color(i);
        })
        .call(forceSimulation.drag);
      //调用drag函数使节点能被拖动
      /*添加描述节点的文字*/
      var svg_texts = svg
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "good")
        .style("fill", "black")
        .attr("dx", -10) //文字相对node中心的移动
        .attr("dy", 10)
        .text(function(d, i) {
          //返回节点的名字
          return d.name;
        })
        .style("fill", "white");

      forceSimulation.on("tick", function() {
        //对于每一个时间间隔  将之前通过force活着
        //更新连线坐标
        svg_edges
          .attr("x1", function(d) {
            return d.source.x;
          })
          .attr("y1", function(d) {
            return d.source.y;
          })
          .attr("x2", function(d) {
            return d.target.x;
          })
          .attr("y2", function(d) {
            return d.target.y;
          });

        //更新节点坐标
        svg_nodes
          .attr("cx", function(d) {
            return d.x;
          })
          .attr("cy", function(d) {
            return d.y;
          });

        //更新文字坐标
        svg_texts
          .attr("x", function(d) {
            return d.x;
          })
          .attr("y", function(d) {
            return d.y;
          });
      });
    }
  }
};
</script>

<style scoped>
</style>