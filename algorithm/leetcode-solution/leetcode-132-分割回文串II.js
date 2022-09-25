var minCut = function (s) {
  // 记录输入字符串长度
  const len = s.length
  // 初始化 二维dp
  const dp = new Array(len).fill(0).map(() => new Array(len).fill(true))
  // 求得所有dp值
  for (let j = 0; j < len; j++) {
      for (let i = 0; i <= j; i++) {
          dp[i][j] = i === j ? true : (s[i] === s[j]) && dp[i + 1][j - 1]
      }
  }

  // 初始化每个位置所需要的最少分割次数数组
  const nums = new Array(len).fill(Number.MAX_SAFE_INTEGER)
  for (let j = 0; j < len; j++) {
      if (dp[0][j]) {
          nums[j] = 0
      } else {
          for (let i = 1; i <= j; i++) {
              if (dp[i][j]) {
                  nums[j] = Math.min(nums[j], nums[i-1] + 1)
              }
          }
      }
  }

  return nums[len - 1]
}