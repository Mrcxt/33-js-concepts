<template>
  <div id="d3_force">
    <el-input placeholder="请输入内容" v-model="searchText" @keydown.enter="Force">
      <el-button id="updated" slot="append" icon="el-icon-search" @click="Force"></el-button>
    </el-input>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      searchText: "",
      forceData: {}
    };
  },
  mounted() {
    this.Force();
    // let url = "http://192.168.181.140:8080/kgrest/query";
    // let params = {
    //   text: "张曼玉的电影"
    // };
    // this.$axios
    //   .post(url, params)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  },
  methods: {
    async Force() {
      let nodes_data = [],
        links_data = [];

      let url = "https://aidev.yuntongxun.com/kgrest/query";
      let params = {
        text: "周星驰和周润发"
      };
      await this.$axios
        .post(url, params)
        .then(res => {
          console.log(res);
          let forceData = res.data.graph;

          nodes_data = forceData.nodes; //节点信息
          links_data = forceData.links;
        })
        .catch(err => {
          console.error(err);
        });

      const w = 900;
      const h = 800;
      const cr = 25;
      const linkr = 150;

      let svg = d3
        .select("#d3_force")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      // 力导向布局
      let force = d3
        .forceSimulation(nodes_data)
        .force(
          "link",
          d3
            .forceLink(links_data)
            .distance(function(d) {
              //每一边的长度
              return linkr;
            })
            .id(function(d) {
              return d.id;
            })
        )
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(w / 2, h / 2))
        .force("collide", d3.forceCollide(cr * 1.1).strength(0.5))
        .on("tick", ticked);

      // console.log(nodes_data);
      // console.log(links_data);

      // 线数据
      let svg_links = svg
        .selectAll("line")
        .data(links_data)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", 1);

      svg_links.on("click", function(d, i) {
        console.log(d);
      });

      //节点数据
      let color = d3.scaleOrdinal(d3.schemeCategory10);
      let svg_nodes = svg
        .selectAll("circle")
        .data(nodes_data)
        .enter()
        .append("circle")
        .attr("r", cr)
        .style("fill", function(d, i) {
          if (i === 0) {
            return color(i);
          } else {
            return "#6DCE9E";
          }
        })
        .style("stroke", function(d, i) {
          return "#60B58B";
        })
        .style("stroke-width", "2px")
        .call(
          d3
            .drag()
            .on("start", dragstarted) //d3.drag() 创建一个拖曳行为
            .on("drag", dragged)
            .on("end", dragended)
        ); //使得节点能够拖动

      svg_nodes.on("click", function(d, i) {
        console.log(d);
        update(d);
      });

      //添加节点更新
      function update(d) {
        let random = Math.floor(Math.random() * 9999);
        nodes_data.push({
          id: random,
          introduction: "",
          mid: "468802",
          rating: "0.0",
          releasedate: "1993-05-22",
          title: "Kin chan no Cinema Jack",
          type: "Movie"
        });
        links_data.push({
          source: d.id,
          target: random,
          type: "actedin",
          mid: "255856",
          pid: "1338"
        });

        console.log(nodes_data);
        console.log(links_data);

        svg_nodes = svg_nodes
          .data(nodes_data)
          .enter()
          .append("circle")
          .attr("r", cr)
          .style("fill", function(d, i) {
            return color(i);
          })
          .call(
            d3
              .drag()
              .on("start", dragstarted) //d3.drag() 创建一个拖曳行为
              .on("drag", dragged)
              .on("end", dragended)
          ) //使得节点能够拖动
          .merge(svg_nodes);
        svg_nodes.exit().remove();

        svg_links = svg_links
          .data(links_data)
          .enter()
          .append("line")
          .style("stroke", "#ccc")
          .style("stroke-width", 1)
          .merge(svg_links);

        svg_links.exit().remove();

        force.nodes(nodes_data);
        force.force("link").links(links_data);

        force.alphaTarget(1).restart();
      }

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
        .data(nodes_data)
        .enter()
        .append("text")
        .style("fill", "black")
        .attr("x", function(d, i) {
          return d.x;
        })
        .attr("y", function(d, i) {
          return d.y;
        })
        .text(function(d, i) {
          if (i === 0) {
            return d.name;
          } else {
            return d.title;
          }
        });

      function ticked() {
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
      }
    }
  }
};
</script>

<style lang="less">
#d3_force {
  text {
    display: none;
    &:hover {
      display: block;
    }
  }
  circle {
    position: relative;
    z-index: 1;
  }
}
</style>
