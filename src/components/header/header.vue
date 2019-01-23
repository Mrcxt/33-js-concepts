<template>
  <div class="header">
    <div class="left">
      <div class="logo">性感代码 在线练习</div>
    </div>
    <div class="right">
      <a href="https://github.com/Mrcxt/33-js-concepts" target="_blank" rel="noopener noreferrer">
        <el-button type="text" icon="fa fa-github fa-2x"></el-button>
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border-bottom: 1px solid #eee;
  .left {
    .logo {
      color: #b8bec5;
      text-shadow: 0 2px white;
      font-weight: bold;
    }
  }
}
</style>
