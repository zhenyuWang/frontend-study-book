// dp[i][j] 表示 i-j区间子串是否是回文串
var longestPalindrome = function (s) {
  const len = s.length

  if (len === 1) {
    return s
  }

  const dp = Array(len)

  for (let i = 0; i < len; i++) {
    dp[i] = []
    dp[i][i] = true
  }

  let maxLen = 1
  let beginIndex = 0

  for (let L = 2; L <= len; L++) {
    for (let i = 0; i <= len - L; i++) {
      const j = i + L - 1

      if (s[i] !== s[j]) {
        dp[i][j] = false
      } else {
        if (i === j - 1) {
          dp[i][j] = true
        } else {
          dp[i][j] = dp[i + 1][j - 1]
        }
      }

      if (dp[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1
        beginIndex = i
      }
    }
  }

  return s.substring(beginIndex, beginIndex + maxLen)
};

// 枚举所有可能的回文子串中心，向外扩展，求得所有的回文子串

function getMaxBackTextString(s, len, l, r) {
  if (s[l] !== s[r]) {
    return 0
  }
  let res = r - l + 1
  while (l > 0 && r < len - 1) {
    l--
    r++
    if (s[l] === s[r]) {
      res += 2
    } else {
      break
    }
  }

  return res
}
var longestPalindrome = function (s) {
  const len = s.length
  if (len === 1) {
    return s
  }

  let maxLen = 1
  let beginIndex = 0

  for (let i = 0; i < len; i++) {
    const len1 = getMaxBackTextString(s, len, i, i)
    const len2 = getMaxBackTextString(s, len, i, i + 1)

    if (len1 > maxLen) {
      maxLen = len1
      beginIndex = i - (len1 - 1) / 2
    }
    if (len2 > maxLen) {
      maxLen = len2
      beginIndex = i - (len2 - 2) / 2
    }
  }

  return s.substring(beginIndex, beginIndex + maxLen)
}