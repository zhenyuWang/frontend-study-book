// dp[i][j] 表示前 i 种硬币组合 j 元钱的方法总数

// 有两种情况，使用第 i 种硬币和不使用第 i 种硬币
// dp[i][j] = dp[i-1][j] + dp[i][j-x]
// x 表示第 i 种硬币的面值
var change = function (amount, coins) {
  const dp = Array(amount + 1).fill(0)
  dp[0] = 1
  for (let i = 0; i < coins.length; i++) {
    const x = coins[i]
    for (let j = x; j <= amount; j++) {
      dp[j] += dp[j - x]
    }
  }
  return dp[amount]
}
