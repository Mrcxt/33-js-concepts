<template>
  <div id="app">
    <el-container>
      <!-- header -->
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <!-- aside -->
        <el-aside width="200px">
          <MenuGroup></MenuGroup>
        </el-aside>
        <!-- main -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import MenuGroup from "./components/menu/MenuGroup";
import Header from "./components/header";

export default {
  name: "home",
  components: {
    MenuGroup,
    Header
  }
};
</script>
<style lang="less">
#app {
  display: flex;
  width: 100vw;
  height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
