<template>
  <div>
    <div id="graph"></div>
    <div id="force"></div>
    <div id="force01"></div>
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
    this.forceInit01();
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
      let arc = d3
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
      let svg = d3
        .select("#force")
        .append("svg")
        .attr("width", 400)
        .attr("height", 300);
      let width = svg.attr("width");
      let height = svg.attr("height");
      let g = svg.append("g");

      //准备数据
      let nodes = [
        { name: "湖南邵阳" },
        { name: "山东莱州" },
        { name: "广东阳江" },
        { name: "山东枣庄" },
        { name: "泽" },
        { name: "恒" },
        { name: "鑫" },
        { name: "明山" },
        { name: "班长" }
      ];

      let edges = [
        { source: 0, target: 4, relation: "123", value: 1.3 },
        { source: 4, target: 5, relation: "舍友", value: 1 },
        { source: 4, target: 6, relation: "舍友", value: 1 },
        { source: 4, target: 7, relation: "舍友", value: 1 },
        { source: 1, target: 6, relation: "籍贯", value: 2 },
        { source: 2, target: 5, relation: "籍贯", value: 0.9 },
        { source: 3, target: 7, relation: "籍贯", value: 1 },
        { source: 5, target: 6, relation: "同学", value: 1.6 },
        { source: 6, target: 7, relation: "朋友", value: 0.7 },
        { source: 6, target: 8, relation: "职责", value: 2 }
      ];
      //设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
      let colorScale = d3
        .scaleOrdinal()
        .domain(d3.range(nodes.length))
        .range(d3.schemeCategory10);

      //新建一个力导向图
      let forceSimulation = d3
        .forceSimulation()
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());

      //初始化力导向图，也就是传入数据
      //生成节点数据
      forceSimulation.nodes(nodes).on("tick", ticked); //这个函数很重要，后面给出具体实现和说明
      //生成边数据
      forceSimulation
        .force("link")
        .links(edges)
        .distance(function(d) {
          //每一边的长度
          return d.value * 100;
        });
      //设置图形的中心位置
      forceSimulation
        .force("center")
        .x(width / 2)
        .y(height / 2);
      //在浏览器的控制台输出
      console.log(nodes);
      console.log(edges);

      //有了节点和边的数据后，我们开始绘制
      //绘制边
      let links = g
        .append("g")
        .selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("stroke", function(d, i) {
          return colorScale(i);
        })
        .attr("stroke-width", 1);
      let linksText = g
        .append("g")
        .selectAll("text")
        .data(edges)
        .enter()
        .append("text")
        .text(function(d) {
          return d.relation;
        });

      //绘制节点
      //老规矩，先为节点和节点上的文字分组
      let gs = g
        .selectAll(".circleText")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          let cirX = d.x;
          let cirY = d.y;
          return "translate(" + cirX + "," + cirY + ")";
        })
        .call(
          d3
            .drag()
            .on("start", started)
            .on("drag", dragged)
            .on("end", ended)
        );

      //绘制节点
      gs.append("circle")
        .attr("r", 10)
        .attr("fill", function(d, i) {
          return colorScale(i);
        });
      //文字
      gs.append("text")
        .attr("x", -10)
        .attr("y", -20)
        .attr("dy", 10)
        .text(function(d) {
          return d.name;
        });

      function ticked() {
        links
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

        linksText
          .attr("x", function(d) {
            return (d.source.x + d.target.x) / 2;
          })
          .attr("y", function(d) {
            return (d.source.y + d.target.y) / 2;
          });

        gs.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      }
      function started(d) {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0.8).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function ended(d) {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }
    },
    forceInit01() {
      let rect_data = [250, 210, 170, 130, 90];

      let svg = d3
        .select("#force01")
        .append("svg")
        .attr("width", 500)
        .attr("height", "300");

      let g = svg.append("g");

      g.selectAll("rect")
        .data(rect_data)
        .enter()
        .append("rect")
        .attr("x", 20)
        .attr("y", function(d, i) {
          return i * 30;
        })
        .attr("width", function(d) {
          return d;
        })
        .attr("height", 25)
        .attr("fill", "blue");
    }
  }
};
</script>

<style scoped>
</style>