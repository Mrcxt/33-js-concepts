<template>
  <div class="home">
    <ul v-for="items in routerPath" :key="items.id">
      <li>
        <el-button type="text">{{items.name}}</el-button>
        <ul v-if="items.children">
          <li v-for="(item, index) in items.children" :key="index">
            <el-button type="text">{{item.name}}</el-button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    routerPath() {
      return this.$router.options.routes;
    }
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.home {
  flex: auto;
}
</style>
