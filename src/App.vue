<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "home"
};
</script>
<style lang="less" scoped>
#app {
  display: flex;
  width: 100vw;
  height: 100vh;
  color: #2c3e50;
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

