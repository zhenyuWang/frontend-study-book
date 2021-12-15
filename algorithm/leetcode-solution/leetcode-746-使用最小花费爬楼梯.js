// 状态定义
// dp[i] 下标i的阶梯，所需的最小花费
// 转移方程
// dp[i] =  min(dp[i-2],dp[i-1]) + cost[i]
var minCostClimbingStairs = function(cost) {
  const len = cost.length,
  // 初始化dp
  dp = [cost[0],cost[1]];
  // 获取每个阶梯的最小花费
  for(let i = 2;i<len;i++){
      dp[i] = Math.min(dp[i-2],dp[i-1])+cost[i]
  }
  // 返回倒数第一和倒数第二个解题的最小值
  return Math.min(dp[len-2],dp[len-1])
};