var minDeletions = function (s) {
  // 创建 map 记录出现的字符及其频次
  let map = new Map()
  // 遍历输入字符串，获取出现字符及其频次
  for (let i = 0; i < s.length; i++) {
    const item = s[i]
    if (map.has(item)) map.set(item, map.get(item) + 1)
    else map.set(item, 1)
  }
  // 将 map 转为 数组
  map = Array.from(map)
  // 对数组元素针对频次进行降序排序
  map.sort((a, b) => b[1] - a[1])
  // 初始化结果值为 0
  let res = 0
  // 遍历排序后的数组
  for (let i = 1; i < map.length; i++) {
    // 当后面字符的频次大于等于前面字符的频次的时候，对其进行降频，并记录降频次数
    while (map[i][1] > 0 && map[i][1] >= map[i - 1][1]) map[i][1]--, res++
  }
  // 返回结果值
  return res
}
