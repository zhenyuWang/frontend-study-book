/**
    第i天不持有股票
    dp[i][0] = max(dp[i-1][0],dp[i-1][1]+price[i]-fee)
    第i天持有股票
    dp[i][1] = max(dp[i-1][1],dp[i-1][0]-price[i])
 */
var maxProfit = function(prices, fee) {
  const len = prices.length,
  dp = [[]];
  dp[0][0] = 0,dp[0][1] = -prices[0];
  for(let i = 1;i<len;i++){
      dp[i] = []
      dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]+prices[i]-fee)
      dp[i][1] = Math.max(dp[i-1][1],dp[i-1][0]-prices[i])
  }
  return dp[len-1][0]
};