<template>
  <el-submenu :index="path">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span slot="title">{{data.name}}</span>
    </template>
    <template v-for="(item, index) in data.children">
      <template v-if="!('visible' in item) || item.visible">
        <el-menu-item v-if="!item.children" :key="item.key" :index="`${path}/${item.path}`">
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <sub-menu v-else :data="item" :path="`${path}/${item.path}`" :key="item.key"></sub-menu>
      </template>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: "sub-menu",
  props: {
    data: {
      type: Object
    },
    path: {
      type: String
    }
  }
};
</script>