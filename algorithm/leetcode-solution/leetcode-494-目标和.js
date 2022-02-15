var findTargetSumWays = function (nums, target) {
  // 获取输入数组的长度
  const len = nums.length,
    // 初始化 dp 数组
    dp = Array(len + 1)
  // 获取输入数组所有整数的和值
  let total = 0
  for (let i = 0; i < len; i++) total += nums[i]
  // 因为数字下标没有负数，但是表达式的结果可能为负数，所以拿到和值，基于和值做一个结果的偏移
  for (let i = 0; i <= len; i++) dp[i] = Array(total * 2).fill(0)
  // 初始化 dp[0][0] = 1
  dp[0][total] = 1
  // 初始化前 i 个数字的和值
  let sum = 0
  // 遍历 i，求每一层 dp
  for (let i = 1; i <= len; i++) {
    // 获取当前数字的值
    const x = nums[i - 1]
    // 获取前 i 个数字的和值
    sum += x
    for (let j = -sum; j <= sum; j++) {
      // 求解范围内的每个 dp
      // 这里要注意j-x和j+x可能超出了我们数组的下标，所以运算的时候要 || 0
      dp[i][j + total] = (dp[i - 1][j - x + total] || 0) + (dp[i - 1][j + x + total] || 0)
    }
  }
  // 返回所有数字都使用，求得 target 的表达式的数目
  // 同理，因为 target+total可能超出dp数组的下标，要拿 0 兜底
  return dp[len][target + total] || 0
}
