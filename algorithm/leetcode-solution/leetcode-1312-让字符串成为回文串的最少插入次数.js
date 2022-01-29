// 状态定义
// dp[l][r] l 左边界 r 右边界 dp[l][r] 表示 l-r 区间需要的最少操作次数
// 每次区间扩展两位，只有两种可能
// 1. s[l]===s[r] 则 s[l][r] = s[l+1][r-1]
// 2. s[l]!==s[r] 则 s[l][r] = min(s[l+1][r],s[l][r-1])+1

// 状态转移方程
// dp[l][r] = s[l]===s[r]?s[l+1][r-1]:min(s[l+1][r],s[l][r-1])+1

// 因为dp[l] 依赖于 dp[l+1] 和 dp[l]  的数据，所以从大到小推导 dp

const minInsertions = (s) => {
  // 初始化dp
  const len = s.length,
    dp = Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = Array(len).fill(0)
  }
  // 从后向前的推导每一层 dp
  for (let i = len - 2; i >= 0; i--) {
    // 从前向后的推导当前这一层dp 也就是不断扩大区间
    for (let j = i + 1; j < len; j++) {
      dp[i][j] = s[i] === s[j] ? dp[i + 1][j - 1] : Math.min(dp[i + 1][j], dp[i][j - 1]) + 1
    }
  }
  return dp[0][len - 1]
}

// 滚动数组
const minInsertions = (s) => {
  // 初始化dp
  const len = s.length,
    dp = Array(2)
  for (let i = 0; i < 2; i++) {
    dp[i] = Array(len).fill(0)
  }
  // 从后向前的推导每一层 dp
  for (let i = len - 2; i >= 0; i--) {
    const cur = i % 2,
      pre = !cur * 1
    // 从前向后的推导当前这一层dp 也就是不断扩大区间
    for (let j = i + 1; j < len; j++) {
      dp[cur][j] = s[i] === s[j] ? dp[pre][j - 1] : Math.min(dp[pre][j], dp[cur][j - 1]) + 1
    }
  }
  return dp[0][len - 1]
}
