// 在 0 和 1有限的前提下，找到尽可能多的字符串
// 属于资源有限，求最大收益的问题
// 状态定义
// dp[i][m][n] 在当前字符串位置，可以得到的最大值，以及当前下标，剩余m,剩余n
// 状态转移方程       不选i         选i
// dp[i][m][n] = max(dp[i-1][m][n],dp[i-1][m-mi][n-ni]+1)
var findMaxForm = function(strs, m, n) {
  const dp = [];
  for(let i = 0;i<=m;i++){
    dp[i] = []
    for(let j = 0;j<=n;j++){
      dp[i][j] = 0;
    }
  }
  for(let i = 0;i<strs.length;i++){
    // 获取当前字符串 0 1 的数量
    let cnt0 = 0,cnt1 = 0;
    for(let j = 0;j<strs[i].length;j++){
      if(strs[i][j]==='0') cnt0++
      else cnt1++
    }
    // 更新每个位置的值
    for(let i = m;i>=cnt0;i--){
      for(let j = n;j>=cnt1;j--){
        dp[i][j] = Math.max(dp[i][j],dp[i-cnt0][j-cnt1]+1)
      }
    }
  }
  return dp[m][n]
};