// dp[i][j] 第 i 行 下标 j 的位置所能求得的最小路径和
// dp[i][j] = min(dp[i-1][j-1],dp[i-1][j])+triangle[i][j]

// 基础版代码
var minimumTotal = function (triangle) {
  // 获取三角形高度
  const len = triangle.length,
    // 初始化 dp
    dp = Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = []
  }
  dp[0][0] = triangle[0][0]
  // 遍历每一层，推导 dp
  for (let i = 1; i < len; i++) {
    // 获取当前层的长度
    const n = triangle[i].length
    for (let j = 0; j < n; j++) {
      // 因为 j = 0 时没有上一层的 j-1，所以特殊处理
      if (j === 0) dp[i][0] = dp[i - 1][0] + triangle[i][0]
      // 因为 j 等于 n-1 的时候没有上一层的 j，所以特殊处理
      else if (j === n - 1) dp[i][j] = dp[i - 1][j - 1] + triangle[i][j]
      else dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j]
    }
  }
  // 返回最后一层 dp 中的最小值
  return Math.min(...dp[len - 1])
}

// 优化空间复杂度
var minimumTotal = function (triangle) {
  // 获取三角形高度
  const len = triangle.length,
    // 初始化 dp
    dp = Array(len)
  dp[0] = triangle[0][0]
  // 遍历每一层，推导 dp
  for (let i = 1; i < len; i++) {
    // 获取当前层的长度
    const n = triangle[i].length
    // 因为当前一层的 j 依赖于上一层的 j 和 j-1，所以需要从后向前的推导每一层 dp
    for (let j = n - 1; j >= 0; j--) {
      // 因为 j = 0 时没有上一层的 j-1，所以特殊处理
      if (j === 0) dp[j] += triangle[i][j]
      // 因为 j 等于 n-1 的时候没有上一层的 j，所以特殊处理
      else if (j === n - 1) dp[j] = dp[j - 1] + triangle[i][j]
      else dp[j] = Math.min(dp[j - 1], dp[j]) + triangle[i][j]
    }
  }
  // 返回最后一层 dp 中的最小值
  return Math.min(...dp)
}
