// 基础
const checkedRecord = new Map()
function check(str) {
  let l = 0
  let r = str.length - 1
  while (l < r) {
    if (str[l] !== str[r]) {
      checkedRecord.set(str, false)
      return false
    }
    l++
    r--
  }
  checkedRecord.set(str, true)
  return true
}
function cut(str, pre, index, end, item, res) {
  if (index > end) {
    return
  }
  pre += str[index]
  const isPrePalindrome = checkedRecord.get(pre) || check(pre)

  // 如果当前是最后一个字符
  if (index === end) {
    // 且pre是回文串，说明找到了一组新的方案
    isPrePalindrome && res.push([...item, pre])
  } else {
    // 下标+1，尝试找出另一种方案
    cut(str, pre, index + 1, end, [...item], res)
    // 如果pre是回文串，将pre存入item,继续向后处理
    if (isPrePalindrome) {
      cut(str, '', index + 1, end, [...item, pre], res)
    }
  }
}
var partition = function (s) {
  const res = []

  cut(s, '', 0, s.length - 1, [], res)

  return res
};

// 状态定义
// dp[i][j] 代表下标 i~j的字符串是否是回文串
// 状态转移方程
// i===j 肯定是
// i+1 === j && s[i] === s[j] 是
// j-i>1 && dp[i+1][j-1] 是
// j-i>1 && !dp[i][j] 不是

// 寻找所有可能的方案
function dfs(s, dp, item, start, end, res) {
  if (start == end) {
    res.push([...item])
    return
  }
  for (let j = start; j < end; j++) {
    if (dp[start][j]) {
      dfs(s, dp, [...item, s.substring(start, j + 1)], j + 1, end, res)
    }
  }
}
var partition = function (s) {
  // 记录输入字符串长度
  const len = s.length
  // 初始化结果数组
  const res = []
  // 初始化 二维dp
  const dp = new Array(len).fill(0).map(() => new Array(len).fill(true))
  // 求得所有dp值
  for (let j = 0; j < len; j++) {
    for (let i = 0; i <= j; i++) {
      dp[i][j] = i === j ? true : (s[i] === s[j]) && dp[i + 1][j - 1]
    }
  }

  dfs(s, dp, [], 0, len, res)

  return res
};