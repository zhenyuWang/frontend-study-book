// dp[i][j] 表示 前 i 个数字可以拼凑 j 的表达式数目
// dp[i][j] = dp[i-1][j-x]+dp[i-1][j+x] x 第 i 个数字的值
var findTargetSumWays = function (nums, target) {
  const len = nums.length
  let total = 0
  // 获取所有数字的和值，确定最大结果范围
  for (let i = 0; i < len; i++) total += nums[i]
  // 初始化 dp 数组
  const dp = Array(len + 1)
  // 因为表达式结果可能为负，这里采用偏移指针数字，下标 total 表示结果值为 0 的位置
  for (let i = 0; i <= len; i++) dp[i] = Array(total * 2 + 1).fill(0)
  dp[0][total] = 1
  // 初始化 sum = 0，记录前 i 个数字所能得到的最大结果范围
  let sum = 0
  // 遍历 nums 长度，推导 dp
  for (let i = 1; i <= len; i++) {
    x = nums[i - 1]
    for (let j = -sum; j <= sum; j++) {
      dp[i][j + x + total] += dp[i - 1][j + total]
      dp[i][j - x + total] += dp[i - 1][j + total]
    }
    sum += x
  }
  // 返回结果值
  return dp[len][target + total] || 0
}

// 滚动数组优化空间复杂度，因为 nums.length 最大为 20，所以提交后变化不大
var findTargetSumWays = function (nums, target) {
  const len = nums.length
  let total = 0
  for (let i = 0; i < len; i++) total += nums[i]
  const dp = [[], []]
  dp[0][total] = 1
  let sum = 0
  for (let i = 1; i <= len; i++) {
    const cur = i % 2,
      pre = !cur * 1,
      x = nums[i - 1]
    dp[cur] = Array(total * 2 + 1).fill(0)
    for (let j = -sum; j <= sum; j++) {
      dp[cur][j + x + total] += dp[pre][j + total]
      dp[cur][j - x + total] += dp[pre][j + total]
    }
    sum += x
  }
  return dp[len % 2][target + total] || 0
}
