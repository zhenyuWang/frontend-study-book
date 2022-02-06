// dp[i] 表示所有数字拼凑 i 的组合个数

// dp[i] 等于 dp[i-x] 相加 x 等于每个数字
// 也就是等于不用某个数字的组合数之和

var combinationSum4 = function (nums, target) {
  const dp = Array(target + 1).fill(0)
  dp[0] = 1
  for (let i = 1; i <= target; i++) {
    for (let j = 0; j < nums.length; j++) {
      const x = nums[j]
      if (i < x) continue
      dp[i] += dp[i - x]
    }
  }
  return dp[target]
}
