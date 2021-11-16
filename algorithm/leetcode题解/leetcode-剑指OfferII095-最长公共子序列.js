// 状态定义
// dp[i][j] text1[i] text2[j] 位置的最长公共子序列
// 转移方程
// text1[i]!==text2[j]
// dp[i][j] = max(dp[i-1][j],dp[i][j-1])
// text1[i]===text2[j]
// dp[i][j] = dp[i-1][j-1]+1

var longestCommonSubsequence = function(text1, text2) {
  // 获取给定字符长度
  const len1 = text1.length,
  len2 = text2.length,
  // 初始化 dp
  dp = [[]]
  for(let j = 0;j<=len2;j++){
    dp[0][j] = 0;
  }
  // 求解各下标位置的最长公共子序列长度
  for(let i = 1;i<=len1;i++){
    dp[i] = [0];
    for(let j = 1;j<=len2;j++){
      if(text1[i-1]===text2[j-1]){
        dp[i][j] = dp[i-1][j-1]+1;
      }else{
        dp[i][j] = Math.max(dp[i][j-1],dp[i-1][j])
      }
    }
  }
  return dp[len1][len2]
};

// 利用滚动数组优化空间复杂度
var longestCommonSubsequence = function(text1, text2) {
  // 获取字符串长度
  const len1 = text1.length,
  len2 = text2.length,
  // 初始化dp数组
  dp = [[],[]]
  for(let j = 0;j<=len2;j++){
    dp[0][j] = 0;
    dp[1][j] = 0;
  }
  // 求得每个位置最长公共子序列长度
  for(let i = 1;i<=len1;i++){
    let cur = i%2,
    pre = !cur*1;
    for(let j = 1;j<=len2;j++){
      if(text1[i-1]===text2[j-1]){
        dp[cur][j] = dp[pre][j-1]+1;
      }else{
        dp[cur][j] = Math.max(dp[cur][j-1],dp[pre][j])
      }
    }
  }
  return dp[len1%2][len2]
};