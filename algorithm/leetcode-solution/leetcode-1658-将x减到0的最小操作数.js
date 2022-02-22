// 递归解题，时间复杂度 O(n²),超时
var minOperations = function (nums, x) {
  /**
   * 递归函数
   * @param {number[]} target 剩余要减去的数值
   * @param {number} l 未操作区间的起始下标
   * @param {number} r 未操作区间的结束下标
   * @return  void
   */
  function calc(target, l, r) {
    if (target === 0 && l - 0 + len - r - 1 < res) {
      res = l - 0 + len - r - 1
      return
    }
    if (l > r || target < 0 || l - 0 + len - r - 1 >= res) {
      return
    }
    calc(target - nums[l], l + 1, r)
    calc(target - nums[r], l, r - 1)
  }
  // 获取输入数组长度
  const len = nums.length
  // 初始化结果值为数组长度+1，即一个非法值
  let res = len + 1
  // 调用递归函数
  calc(x, 0, len - 1)
  // 如果结果值合法，返回结果值，否则返回 -1
  return res > len ? -1 : res
}

// 反向思维，滑动窗口

var minOperations = function (nums, x) {
  // 获取输入数组的长度
  const len = nums.length
  // 获取输入数组中整数的和值
  let total = 0
  for (let i = 0; i < len; i++) total += nums[i]
  // 如果目标值大于和值，说明不可能减到 0，返回 -1
  if (total < x) return -1
  // 如果目标值等于和值，说明需要把数组中所有元素都减去，返回数组长度
  if (total === x) return len
  // 初始化结果值为数组长度+1，即一个非法值
  let res = len + 1,
    // 区间起始下标为0
    l = 0,
    // 区间结束下标为0
    r = 0
  // 区间整数和值为0
  sum = 0
  // 计算数组中整数和值与目标值的差值 => 目标区间中元素的和值
  const diff = total - x
  // 当区间结束下标没有走到数组末尾
  while (r < len) {
    // 累加和值
    sum += nums[r]
    // 如果区间中和值大于差值，则应该把区间最左侧的整数进行删除
    while (sum > diff) {
      sum -= nums[l]
      l++
    }
    // 如果区间和值等于差值，说明找到了一种操作方式，尝试更新最小操作次数
    if (sum === diff) res = Math.min(res, len - r + l - 1)
    r++
  }
  // 如果结果值合法，返回结果值，否则返回 -1
  return res > len ? -1 : res
}
