var merge = function (intervals) {
  // 特判如果输入数组长度为1，直接返回
  if (intervals.length === 1) return intervals
  // 对输入数组按照子数组区间开始值升序排序
  intervals.sort((a, b) => a[0] - b[0])
  // 获取输入数组长度
  const len = intervals.length,
    // 初始化结果数组
    res = []
    // 记录待合并区间的开始值的最小值和结束值的最大值
    let [min,max] = intervals[0],
    // 初始化查找指针
    tail = 1;
  while (tail < len) {
    // 如果当前子区间的开始值小于等于之前区间结束值的最大值，则可以合并
    while (tail < len && intervals[tail][0] <= max) {
      // 尝试更新区间结束值的最大值
      max = Math.max(max, intervals[tail][1])
      // tail 指针后移一位
      tail++
    }
    // 当找不到可以继续合并的区间
    // 根据当前待合并区间的开始值的最小值和结束值的最大值组成合并区间并插入结果数组
    res.push([min, max])
    // 更新待合并区间的开始值的最小值和结束值的最大值
    if (tail < len) {
      [min,max] = intervals[tail]
    }
  }
  // 返回结果数组
  return res
}
