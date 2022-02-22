var findClosestElements = function (arr, k, x) {
  // 初始化窗口的左右边界下标
  let r = arr.length - 1,
    l = r - k + 1,
    // 初始化窗口内元素和目标值的差值
    diff = 0
  // 计算窗口内元素和目标值的差值
  for (let i = r; i >= l; i--) diff += Math.abs(arr[i] - x)
  // 当窗口左边界没有到达下标 0 时，向左移动窗口
  while (l > 0) {
    // 计算窗口下次移动后的差值和
    const nextDiff = diff - Math.abs(arr[r] - x) + Math.abs(arr[l - 1] - x)
    // 如果下次移动后窗口的差值和小于等于当前窗口的差值和
    if (nextDiff <= diff) {
      // 移动窗口
      l--
      r--
      // 更新当前窗口的差值和
      diff = nextDiff
    }
    // 否则说明找到了差值和最小的窗口，返回窗口中的元素
    else return arr.slice(l, l + k)
  }
  // 如果可以一直移动到数组最左侧，则说明最左侧的窗口是差值最小的窗口，返回该窗口中的元素
  return arr.slice(l, l + k)
}
