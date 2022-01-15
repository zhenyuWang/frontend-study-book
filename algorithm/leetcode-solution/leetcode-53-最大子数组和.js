var maxSubArray = function(nums) {
  // 初始化之前区间的前缀和最小值为前置0
  let min = 0,
  // 第 0 前缀和结果为 前置0
  sum = 0,
  // 最大子数组和为负无穷
  max = -Infinity;
  // 遍历输入数组
  for(let i = 0;i<nums.length;i++){
    // 获取当前位置前缀和
    sum += nums[i]
    // 用当前位置前缀和减去前面区间前缀和的最小值
    // 就得到了以当前位置为结尾所能得到的最大子数组和
    // 用这个结果尝试更新结果值
    max = Math.max(max,sum-min)
    // 用当前位置前缀和尝试更新最小值
    min = Math.min(min,sum)
  }
  return max;
};