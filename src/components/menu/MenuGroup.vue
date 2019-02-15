<template>
  <el-menu :default-active="fullPath" :collapse="sidebarIsCollapse" router>
    <template v-for="(item, index) in routerList">
      <template v-if="!('visible' in item) || item.visible">
        <el-menu-item v-if="!item.children" :key="item.key" :index="item.path">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <sub-menu v-else :data="item" :path="item.path" :key="item.key"></sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script>
import SubMenu from "./subMenu";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    "sub-menu": SubMenu
  },
  computed: {
    ...mapGetters(["sidebarIsCollapse"]),
    // router 数据
    routerList() {
      return this.$router.options.routes;
    },
    // 当前path路径
    fullPath() {
      return this.$route.fullPath;
    }
  },
  created() {},
  methods: {}
};
</script>


<style lang="less" scoped>
.el-menu {
  flex: auto;
}
</style>

