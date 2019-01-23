<template>
  <div class="layout">
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
}
</style>
