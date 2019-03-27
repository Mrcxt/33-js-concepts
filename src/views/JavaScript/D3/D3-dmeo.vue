<template>
  <div id="d3_demo">
    <p>131231231</p>
    <p>131231231</p>
    <p>131231231</p>
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
