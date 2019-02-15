<template>
  <div class="header">
    <div class="left">
      <div class="isCollapse">
        <div class="logo">
          <p>性感代码 在线练习</p>
        </div>
        <!-- <el-button type="text" icon="el-icon-menu" @click="setIsCollapse"></el-button> -->
      </div>
    </div>
    <div class="right">
      <a href="https://github.com/Mrcxt/33-js-concepts" target="_blank" rel="noopener noreferrer">
        <el-button type="text" icon="fa fa-github fa-2x"></el-button>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["sidebarIsCollapse"])
  },
  methods: {
    setIsCollapse() {
      this.$store.commit("SET_SIDEBAR_IS_COLLAPSE", !this.sidebarIsCollapse);
      console.log(this.sidebarIsCollapse);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border-bottom: 1px solid #eee;
  .left {
    .isCollapse {
      color: #b8bec5;
      text-shadow: 0 2px white;
      font-weight: bold;
    }
  }
}
</style>
