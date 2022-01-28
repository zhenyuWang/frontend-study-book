var subSort = function (array) {
  // 获取输入数组长度
  const len = array.length
  // 如果数组长度小于2，无法找到合法区间，返回 [-1,-1]
  if (len < 2) return [-1, -1]
  // 初始化右边界及最大值
  let n = 0,
    max = array[0],
    // 初始化左边界及最小值
    m = len - 1,
    min = array[len - 1]
  // 从左向右确定右边界
  for (let i = 1; i < len; i++) {
    if (array[i] >= max) max = array[i]
    else n = i
  }
  // 从右向左确定左边界
  for (let i = len - 2; i >= 0; i--) {
    if (array[i] <= min) min = array[i]
    else m = i
  }
  // 如果区间合法，返回区间，否则返回 [-1,-1]
  return m >= n ? [-1, -1] : [m, n]
}
