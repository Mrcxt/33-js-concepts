<template>
  <div class="home">
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="200px">
          <MenuGroup></MenuGroup>
        </el-aside>
        <el-main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MenuGroup from "./../components/menu/MenuGroup";

export default {
  name: "home",
  components: {
    MenuGroup
  }
};
</script>
