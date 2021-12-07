/**
    第i天不持有股票
    dp[i][0] = max(dp[i-1][0],dp[i-1][1]+price[i]-fee)
    第i天持有股票
    dp[i][1] = max(dp[i-1][1],dp[i-1][0]-price[i])
 */
// 第一版
var maxProfit = function(prices, fee) {
  const dp = [[0,-prices[0]]];
  // 求得每一天持有股票和不持有股票的利润
  for(let i = 1;i<prices.length;i++){
    dp[i] = [];
    dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]+prices[i]-fee)
    dp[i][1] = Math.max(dp[i-1][1],dp[i-1][0]-prices[i])
  }
  // 返回最后一天不持有股票的利润
  return dp[prices.length-1][0]
};

// 滚动数组优化空间复杂度为 O(1)
var maxProfit = function(prices, fee) {
  const dp = [[0,-prices[0]],[]];
  // 求得每一天持有股票和不持有股票的利润
  for(let i = 1;i<prices.length;i++){
    const cur = i%2,
    pre = !cur*1;
    dp[cur][0] = Math.max(dp[pre][0],dp[pre][1]+prices[i]-fee)
    dp[cur][1] = Math.max(dp[pre][1],dp[pre][0]-prices[i])
  }
  // 返回最后一天不持有股票的利润
  return dp[(prices.length-1)%2][0]
};