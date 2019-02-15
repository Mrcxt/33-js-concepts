<template>
  <div class="layout">
    <el-container>
      <!-- aside -->
      <el-aside class="aside" width="200px">
        <MenuGroup></MenuGroup>
      </el-aside>
      <el-container>
        <!-- header -->
        <el-header>
          <Header></Header>
        </el-header>
        <!-- main -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MenuGroup from "../menu/MenuGroup";
import Header from "../header/header";

export default {
  components: {
    MenuGroup,
    Header
  }
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex: auto;
  .aside {
    display: flex;
    flex-direction: column;
    .logo {
      border-right: solid 1px #e6e6e6;
      border-bottom: solid 1px #e6e6e6;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      padding: 0px 20px;
    }
  }
}
</style>
