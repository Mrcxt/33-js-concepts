<template>
  <div class="customCss" ref="ref_customCss">
    <h2>自定义css变量</h2>
    <p>首先通过 CSS 的自定义变量将字号和颜色进行预设，然后通过 setProperty() 方法改变变量值，即可实现在线换肤等功能</p>
    <el-form label-width="100px">
      <el-form-item label="字体颜色：">
        <el-color-picker v-model="form.color"></el-color-picker>
      </el-form-item>
      <el-form-item label="字体大小：">
        <el-input-number v-model="form.size" :min="12" :max="36"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button @click="changeCss">确定</el-button>
      </el-form-item>
    </el-form>
    <div class="customCss-demo">
      <span>测试文字，测试文字，测试文字，测试文字</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "customCss",
  data() {
    return {
      form: {
        color: "#409EFF",
        size: 14
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeCss() {
      let customCss = this.$refs["ref_customCss"].style;
      customCss.setProperty("--color", this.form.color);
      customCss.setProperty("--size", `${this.form.size}px`);
    }
  }
};
</script>

<style lang="less" scoped>
.customCss {
  --color: red;
  --size: 14px;
  .customCss-demo {
    font-size: var(--size);
    color: var(--color);
  }
}
</style>

