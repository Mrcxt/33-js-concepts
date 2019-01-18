<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "leetCode",
  data() {
    return {};
  },
  created() {
    this.init();
  },
  methods: {
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

<style scoped>
</style>