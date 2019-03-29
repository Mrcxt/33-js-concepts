<template>
  <div id="d3_demo">
    <p>131231231</p>
    <p>131231231</p>
    <p>131231231</p>
    <svg>
      <rect x="60" y="10" rx="5" ry="5" width="30" height="30" />
      <polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145" />
      <circle cx="25" cy="75" r="20" />
    </svg>
    <svg>
      <ellipse cx="75" cy="75" rx="20" ry="5" />
      <line x1="10" x2="50" y1="110" y2="150" />
      <polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180" />
      <!-- <path d="M 20 230 Q 40 205, 50 230 T 90230" /> -->
    </svg>

  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    // this.init1();
    // this.init2();
    // this.rect();
    // this.init4();
    // this.pie();
    this.Force();
  },
  methods: {
    init1() {
      let str = ["china", "jan", "Amara"];

      let body = d3.select("#d3_demo");
      let p = body.selectAll("p");
      p.data(str);

      p.text((d, i) => {
        return `第${i}个元素绑定的数据是：${d}`;
      });
    },
    init2() {
      let p = d3.select("#d3_demo").selectAll("p");
      p.style("color", "red");
    },
    rect() {
      let w = 300;
      let h = 300;

      let svg = d3
        .select("#d3_demo")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      let dataset = [250, 210, 170, 100, 90];

      let rectH = 25;

      svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .remove()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => {
          return i * (rectH + 10);
        })
        .attr("width", (d, i) => {
          return d;
        })
        .attr("height", rectH)
        .attr("fill", "steelblue");

      /* 比例尺 */

      //   线性比例尺
      const min = d3.min(dataset);
      const max = d3.max(dataset);

      let linear = d3
        .scaleLinear()
        .domain([min, max])
        .range([0, 300]);

      console.log(linear(90));
      console.log(linear(170));
      console.log(linear(250));

      //   序数比例尺
      let index = [0, 1, 2, 3, 4];
      let color = ["red", "blue", "green", "yellow", "black"];

      let ordinal = d3
        .scaleOrdinal()
        .domain(index)
        .range(color);
      console.log(ordinal(0));
    },
    init4() {
      const w = 300;
      const h = 300;
      const rectH = 20;

      // 定义画布
      let svg = d3
        .select("#d3_demo")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      const padding = {
        l: 30,
        r: 30,
        t: 20,
        b: 20
      };
      let dataset = [10, 20, 30, 40, 33, 24, 12, 5];

      /* 比例尺 */

      //   x轴比例尺
      let xScale = d3
        .scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w - padding.l - padding.r])
        .padding(0.1);

      //   y轴比例尺
      let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([h - padding.t - padding.b, 0]);

      /* 坐标轴 */

      let xAxis = d3
        .axisBottom() //指定刻度的方向
        .scale(xScale) //指定比例尺
        .ticks(5); //指定刻度的数量

      let yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(5);

      let rectPadding = 4;
      // 添加柱形图

      let rects = svg
        .selectAll(".MyRect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "MyRect")
        .attr("transform", "translate(" + padding.l + "," + padding.t + ")")
        .attr("x", (d, i) => {
          return xScale(i) + rectPadding / 2;
        })
        .attr("y", d => {
          return yScale(d);
        })
        .attr("width", xScale.bandwidth() - rectPadding)
        .attr("height", d => {
          return h - padding.t - padding.b - yScale(d);
        })
        .style("fill", "red");

      rects
        .transition()
        .duration((d, i) => {
          return 500 * i;
        })
        .delay(1000)
        .style("fill", "green");

      rects
        .on("mouseover", function(d, i) {
          d3.select(this).style("fill", "yellow");
        })
        .on("mouseout", function(d, i) {
          d3.select(this)
            .transition()
            .duration(500)
            .style("fill", "steelblue");
        });

      let texts = svg
        .selectAll(".MyText")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", "MyText")
        .attr(
          "transform",
          `translate(${(padding.l / 3) * 2},${-(padding.t / 4)})`
        )
        .attr("x", (d, i) => {
          return xScale(i) + rectPadding / 2;
        })
        .attr("y", d => {
          return yScale(d);
        })
        .attr("dx", function() {
          return (xScale.bandwidth() - rectPadding) / 2;
        })
        .attr("dy", d => {
          return 20;
        })
        .text(d => {
          return d;
        });

      //
      //添加x轴
      svg
        .append("g")
        .attr("class", "axis")
        .attr(
          "transform",
          "translate(" + padding.l + "," + (h - padding.b) + ")"
        )
        .call(xAxis);

      //添加y轴
      svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.l + "," + padding.t + ")")
        .call(yAxis);
    },
    pie() {
      let w = 300;
      let h = 300;

      let svg = d3
        .select("#d3_demo")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      let dataset = [30, 10, 43, 55, 13];
      let pie = d3.pie();
      let piedata = pie(dataset);

      let outerRadius = 150;
      let innerRadius = 0;

      let arc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      let arcs = svg
        .selectAll("g")
        .data(piedata)
        .enter()
        .append("g")
        // .exit()
        // .remove()
        .attr("transform", `translate(${w / 2},${h / 2})`);

      console.log(arcs);

      let color = d3.scaleOrdinal(d3.schemeCategory10);
      let paths = arcs
        .append("path")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("d", function(d) {
          return arc(d); //调用弧生成器，得到路径值
        });

      let texts = arcs
        .append("text")
        .attr("transform", function(d, i) {
          return `translate(${arc.centroid(d)})`;
        })
        .attr("text-anchor", "middle")
        .text(function(d, i) {
          return d.data;
        });
    },
    Force() {
      const w = 600;
      const h = 600;

      let nodes = [
        { name: "桂林" },
        { name: "广州" },
        { name: "厦门" },
        { name: "杭州" },
        { name: "上海" },
        { name: "青岛" },
        { name: "天津" }
      ];

      let links = [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 0, target: 3 },
        { source: 1, target: 4 },
        { source: 1, target: 5 },
        { source: 1, target: 6 }
      ];

      let force = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(links))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter());

      force
        .force("link")
        .links(links)
        .distance(function(d) {
          //每一边的长度
          return 200;
        });
      //设置图形的中心位置
      force
        .force("center")
        .x(w / 2)
        .y(h / 2);

      console.log(nodes);
      console.log(links);

      let svg = d3
        .select("#d3_demo")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
      //

      let svg_links = svg
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", 1);

      let color = d3.scaleOrdinal(d3.schemeCategory10);

      //添加节点
      let svg_nodes = svg
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 20)
        .style("fill", function(d, i) {
          return color(i);
        })
        .call(
          d3
            .drag()
            .on("start", dragstarted) //d3.drag() 创建一个拖曳行为
            .on("drag", dragged)
            .on("end", dragended)
        ); //使得节点能够拖动

      svg_nodes.on("click", function(d, i) {
        console.log(d);
      });

      //监听拖拽开始
      function dragstarted(d) {
        if (!d3.event.active) force.alphaTarget(0.3).restart(); //alpha是动画的冷却系数，运动过程中会不断减小，直到小于0.005为止，此时动画会停止。
        d.fx = d.x; //fx为固定坐标，x为初始坐标  注3>
        d.fy = d.y;
      }

      //监听拖拽中
      function dragged(d) {
        d.fx = d3.event.x; //fevent.x为拖拽移动时的坐标
        d.fy = d3.event.y;
      }

      //监听拖拽结束
      function dragended(d) {
        if (!d3.event.active) force.alphaTarget(0);
        d.fx = null; //固定坐标清空
        d.fy = null;
      }

      //添加描述节点的文字
      let svg_texts = svg
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .style("fill", "black")
        .attr("dx", 20)
        .attr("dy", 8)
        .text(function(d) {
          return d.name;
        });

      force.on("tick", function() {
        //对于每一个时间间隔
        //更新连线坐标
        svg_links
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
    },
    init7() {}
  }
};
</script>

<style lang="less">
#d3_demo {
  .axis path,
  .axis line {
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
  }

  .axis text {
    font-family: sans-serif;
    font-size: 11px;
  }
}
</style>
