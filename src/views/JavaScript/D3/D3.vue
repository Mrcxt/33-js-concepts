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
      // let nodes = [
      //   { name: "湖南邵阳" },
      //   { name: "山东莱州" },
      //   { name: "广东阳江" },
      //   { name: "山东枣庄" },
      //   { name: "泽" },
      //   { name: "恒" },
      //   { name: "鑫" },
      //   { name: "明山" },
      //   { name: "班长" }
      // ];
      let nodes = [
        {
          birthplace: "Lamma Island, Hong Kong",
          death: "N",
          name: "周润发",
          birth: "1955-05-18",
          pid: "1619",
          biography:
            "周润发，广东宝安人，1955年5月18日生于香港南丫岛，为新界原居民，著名电影和电视演员，曾经三度获得香港电影金像奖最佳男主角奖，另外也拿到两次台湾电影金马奖最佳男主角头衔。 1980年代与成龙一并成为香港电影市场的票房保证，并创造了多个脍炙人口的经典角色：许文强、小马哥、赌神等多不胜数。1990年代开始后，与成龙、周星驰因为电影票房成绩出色，共同被媒体形容为“双周一成”。他于1995年赴美国好莱坞发展，在拍摄多部电影后获得一定程度上的成功。",
          id: 386,
          type: "Person"
        },
        {
          rating: "6.5999999046",
          mid: "1494",
          releasedate: "2006-12-21",
          title: "满城尽带黄金甲",
          introduction:
            "满城的菊花，意态舒展。人的忧思，却绞缠于胸。金碧辉煌的宫廷里，心绪不宁的皇后领着王子们在等王。宫闱上下，因为这个即将到来的重阳，忙碌得有序而繁密。一场盛大仪式准备就绪，王却悄然回宫，他好像要有意冷落那些恭候已久的人们，不给他们一个稍微镇定的机会去察言观色，暗自忖量。独自一人的时候他开怀大笑，他的笑里好像有很多的秘密。王是这样的王，仿佛振一振袍子，也有雷霆迅至。大的王子是祥，他的秘密太沉太重，矜贵之躯，也被这秘密打发成落魄的形骸。小的王子是昌，他的笑容灿烂，但是金玉之体，转过身来是温厚端笑，变过身去，嘴角竟有了一丝冷凝...",
          id: 906,
          type: "Movie"
        },
        {
          birthplace: "Shenyang, Liaoning Province, China",
          death: "N",
          name: "巩俐",
          birth: "1965-12-31",
          pid: "643",
          biography:
            "新加坡华裔女演员，祖籍中国山东，毕业于中央戏剧学院，联合国促进和平艺术家，联合国全球环境保护大使。1987年，因主演电影《红高粱》成名，该片获得柏林电影节金熊奖。1992年，凭借主演的电影《秋菊打官司》获得威尼斯国际电影节最佳女演员奖，该片亦获得金狮奖。1993年，主演的电影《霸王别姬》获得金棕榈奖，因而巩俐成为世界影史第二位主演影片包揽欧洲三大国际电影节影片奖的演员。1993年，获得柏林国际电影节金摄影机奖并上榜美国《人物》全球最美50人。1996年，登上美国《时代周刊》封面并上榜全球十大人物。1997年，担任戛纳国际电影节评委会成员。2000年，担任柏林国际电影节评委会主席；同年，获得蒙特利尔国际电影节最佳女演员奖及艺术成就大奖。2002年，担任威尼斯国际电影节评委会主席。2003年，担任东京国际电影节评委会主席。2004年，获得戛纳国际电影节纪念大奖；同年，上榜美国《首映》影史百大伟大表演。2005年，入选中国电影百年50位有突出贡献艺术家。2006年，上榜美国《时代周刊》60年亚洲英雄；同年，上榜美国《华盛顿邮报》全球年度5位伟大演员。2010年，法国文化部授予其“艺术与文学勋章”司令勋位。2014年，担任上海国际电影节评委会主席；同年，二度上榜日本《电影旬报》百大外国女星。2015年，入选联合国16位影响人类文化艺术家。",
          id: 378,
          type: "Person"
        }
      ];
      let edges = [
        {
          source: 0,
          target: 1,
          type: "actedin",
          mid: "1494",
          pid: "1619",
          relation: "123",
          value: 1.3
        },
        {
          source: 1,
          target: 2,
          type: "actedin",
          mid: "1494",
          pid: "643",
          relation: "123",
          value: 1.3
        }
      ];
      // let edges = [
      //   { source: 0, target: 4, relation: "123", value: 1.3 },
      //   { source: 4, target: 5, relation: "舍友", value: 1 },
      //   { source: 4, target: 6, relation: "舍友", value: 1 },
      //   { source: 4, target: 7, relation: "舍友", value: 1 },
      //   { source: 1, target: 6, relation: "籍贯", value: 2 },
      //   { source: 2, target: 5, relation: "籍贯", value: 0.9 },
      //   { source: 3, target: 7, relation: "籍贯", value: 1 },
      //   { source: 5, target: 6, relation: "同学", value: 1.6 },
      //   { source: 6, target: 7, relation: "朋友", value: 0.7 },
      //   { source: 6, target: 8, relation: "职责", value: 2 }
      // ];
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