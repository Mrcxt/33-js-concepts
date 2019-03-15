<template>
  <div class="leetCode">
    <p>{{arr.length}}</p>
    <el-button type="" @click="addArr">增加</el-button>
    <el-button type="" @click="deleteArr">删除</el-button>
  </div>
</template>

<script>
export default {
  name: "leetCode",
  data() {
    return {
      arr: [1, 2, 3, 4, 5]
    };
  },
  created() {
    this.init();
  },
  methods: {
    addArr() {
      this.arr.push(Math.floor(Math.random() * 10));
    },
    deleteArr() {
      this.arr.splice(1, 1);
    },
    init() {
      this.twoSum([2, 7, 11, 15], 9);
    },
    /* 两数之和 */
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
      for (let i = 0; i < nums.length; i++) {
        if (i < nums.length + 1) {
          for (let j = i + 1; j < nums.length; j++) {
            let sum = nums[i] + nums[j];
            if (sum === target) {
              return [i, j];
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.leetCode {
}
</style>
