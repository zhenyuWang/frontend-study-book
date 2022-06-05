var longestCommonPrefix = function (strs) {
  let len = strs.length
  let tail = 0
  let cur = ''
  let flag = true

  while (flag) {
    for (let i = 0; i < len; i++) {
      if (i === 0) {
        if (strs[i][tail]) {
          cur = strs[i][tail]
        } else {
          flag = false
        }
      } else if (strs[i][tail] !== cur) {
        flag = false
        break
      }

      if (i === len - 1) {
        tail++
      }
    }
  }
  return strs[0].substr(0, tail);
}