<template>
  <div style="height:100%">
    <el-input v-model="search" placeholder="输入关键字搜索" />
    <el-table :data="card_arr.values.filter(data => !search || data.姓名.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" stripe height="100%">
      >
      <el-table-column type="index" :index="1">
      </el-table-column>
      <!--  -->
      <el-table-column prop="id" label="id" sortable>
      </el-table-column>
      <!--  -->
      <el-table-column prop="姓名" label="姓名" sortable>
      </el-table-column>
      <!--  -->
      <el-table-column prop="部门" label="部门" sortable>
      </el-table-column>
      <!--  -->
      <el-table-column prop="部门领导" label="部门领导" sortable>
      </el-table-column>
      <!--  -->
      <el-table-column prop="入职引导人" label="入职引导人" sortable>
      </el-table-column>
      <!--  -->
      <el-table-column prop="岗位" label="岗位" sortable>
      </el-table-column>
      <!--  -->
      <el-table-column prop="注册于" label="注册于" sortable>
      </el-table-column>
      <!--  -->
      <el-table-column prop="最后登录" label="最后登录" sortable>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      card_arr: {
        values: []
      },
      search: ""
    };
  },
  mounted() {
    this.getIDCrad();
  },
  methods: {
    getIDCrad() {
      this.$axios
        .get("http://localhost:4000/")
        .then(res => {
          console.log(res);
          this.card_arr = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
</style>