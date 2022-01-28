var largestNumber = function (nums) {
  // 利用 sort 排序输入数组
  // 排序规则是拼接 a,b，如果 a 拼接 b 后的结果字符串更大，则让 a 在 b 前
  // 否则让 b 在 a 前
  nums.sort((a, b) => (a + '' + b > b + '' + a ? -1 : 1))
  // 利用排序后的数组转成字符串
  const s = nums.join('')
  // 因为会存在 [0,0] 这样的输出数据，所以此时的结果数字可能会有前置 0
  // 初始化 l 指针为 0
  let l = 0
  // 当 l 指针没到字符串的倒数第二位（这里是因为我们要保证结果为非空字符串）
  // 如果当前字符为 0，向后移动 l 指针
  while (l < s.length - 1 && s[l] === '0') l++
  // 返回从 l 指针位置截取之后的结果
  return s.substr(l)
}
