<template>
  <div class="calcCircularLayout">
    <p>JavaScript计算N个点随机排列成圆的各个点坐标 </p>
    <el-form label-width="120px">
      <el-form-item label="坐标个数：">
        <el-input-number v-model="form.nodeNum" :min="1" :max="30"></el-input-number>
      </el-form-item>
      <div>
        <el-form-item label="圆的中心坐标："></el-form-item>
        <el-form-item label="x轴：">
          <el-input-number v-model="form.center.x" :min="100" :max="300"></el-input-number>
        </el-form-item>
        <el-form-item label="y轴：">
          <el-input-number v-model="form.center.y" :min="100" :max="300"></el-input-number>
        </el-form-item>
      </div>
      <el-form-item label="圆的半径：">
        <el-input-number v-model="form.radius" :min="1" :max="200"></el-input-number>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="calcCircularLayout(form.nodeNum,{x:form.center.x,y:form.center.y},form.radius)">随机</el-button>
      <el-button @click="calcCircularLayout_01(form.nodeNum,{x:form.center.x,y:form.center.y},form.radius)">均匀</el-button>
    </div>
    <div class="circe-items">
      <div class="circe" :style="{left:form.center.x + 'px',top:form.center.y + 'px'}"></div>
      <template v-for="item in calcCircularLayout_items">
        <div class="circe" :style="{left:item.x + 'px',top:item.y+'px'}"></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "calcCircularLayout",
  data() {
    return {
      form: {
        nodeNum: 5,
        center: {
          x: 200,
          y: 200
        },
        radius: 100
      },
      calcCircularLayout_items: ""
    };
  },
  methods: {
    /**
     * 计算N个点均匀排列成圆的各个点坐标
     * @param nodeNum 参与排列成圆的元素个数
     * @param center 圆的中心点坐标 {x:, y:}
     * @param radius 圆的半径
     * @return 各个元素的坐标：[{x:, y:}, {x:, y:}, ...]
     */
    // 随机
    calcCircularLayout(nodeNum, center, radius) {
      let _layouts = [];
      for (let i = 0; i < nodeNum; i++) {
        const ragle = Math.random() * 2 * Math.PI;
        var x = center.x + radius * Math.sin(ragle),
          y = center.y + radius * Math.cos(ragle);

        _layouts.push({ x: x, y: y });
      }
      //
      console.info(_layouts);
      this.calcCircularLayout_items = _layouts;
      return _layouts;
    },
    // 均匀
    calcCircularLayout_01(nodeNum, center, radius) {
      let i,
        _i,
        _layouts = [];
      for (i = _i = 0; _i < nodeNum; i = ++_i) {
        const ragle = 2 * Math.PI * i;
        var x = center.x + radius * Math.sin(ragle / nodeNum),
          y = center.y + radius * Math.cos(ragle / nodeNum);

        _layouts.push({ x: x, y: y });
      }
      //
      console.info(_layouts);
      this.calcCircularLayout_items = _layouts;
      return _layouts;
    }
  }
};
</script>

<style lang="less" scoped>
.calcCircularLayout {
  .circe-items {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #eee;
    .circe {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background-color: #aaa;
      transition: all 0.3s;
      &:first-child {
        background-color: red;
      }
    }
  }
}
</style>
