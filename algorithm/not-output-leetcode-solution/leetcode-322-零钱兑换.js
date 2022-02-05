// dp[i][j] i 表示前 i 种硬币，j 表示金额
// dp[i][j] 表示前 i 种硬币拼凑 j 所需的最小硬币数量

// 分为使用第 i 种硬币和不使用第 i 种硬币两种情况，取最小值
// dp[i][j] = min(dp[i-1][j],dp[i][j-x]+1)
// x 是第 i 种硬币的面值

// 必须要使用一维数组，不然会爆栈
var coinChange = function (coins, amount) {
  const dp = Array(amount + 1).fill(-1)
  dp[0] = 0
  for (let i = 0; i < coins.length; i++) {
    const x = coins[i]
    for (let j = x; j <= amount; j++) {
      if (dp[j - x] === -1) continue
      if (dp[j] === -1 || dp[j] > dp[j - x] + 1) dp[j] = dp[j - x] + 1
    }
  }
  return dp[amount]
}
