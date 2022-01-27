var partitionLabels = function (s) {
  // 创建map记录每个字母出现的开始结束下标
  let map = new Map()
  // 遍历输入字符串，获取每个字母出现的开始结束下标
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) map.get(s[i])[1] = i
    else map.set(s[i], [i, i])
  }
  // 初始化结果数组
  const res = []
  // 记录可合并区间的开始下标和结束下标
  let pre = 0,
    end = 0
  // 遍历 map 拆分区间
  map.forEach((item) => {
    // 获取当前字母出现的开始结束下标
    const [a, b] = item
    // 如果当前字母的开始下标在待合并区间范围内，则当前字母要被合并到区间中
    if (a <= end) end = Math.max(end, b)
    // 否则待合并区间可以合并为一个区间
    else {
      res.push(end - pre + 1)
      // 初始化接下来的待合并区间的开始结束下标
      pre = a
      end = b
    }
  })
  // 将最后的待合并区间插入结果数组
  res.push(end - pre + 1)
  // 返回结果数组
  return res
}
