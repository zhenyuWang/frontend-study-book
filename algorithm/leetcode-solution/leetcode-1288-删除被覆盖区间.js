var removeCoveredIntervals = function(intervals) {
  // 首先对输入数组子数组按区间开始值进行升序排序
  // 如果区间开始值相同，则结束值大的在前
  intervals.sort((a,b) => {
    if(a[0] === b[0]) return b[1]-a[1]
    return a[0]-b[0]
  })
  // 获取输入数组长度
  const len = intervals.length;
  // 初始化已处理区间结束值的最大值
  let max = intervals[0][1],
  // 初始化结果值为输入数组的长度
  res = len;
  // 遍历排序后的输入数组
  for(let i = 1;i<len;i++){
    // 获取当前区间的结束值
    const r = intervals[i][1]
    // 如果当前区间的结束值小于等于 max
    // 则当前区间被覆盖，res--
    if(max>=r) res--
    // 否则当前区间的结束值大于 max，更新 max
    else max = r
  }
  // 返回结果值
  return res;
};