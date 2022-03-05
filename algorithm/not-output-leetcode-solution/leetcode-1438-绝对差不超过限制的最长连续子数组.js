var longestSubarray = function (nums, limit) {
  // 递增栈
  const queueup = [0],
    // 递减栈
    queuedown = [0]
  // 结果值
  let res = 1,
    // 当前区间起始下标
    minInd = 0
  for (let i = 1; i < nums.length; i++) {
    // 维护递增栈
    while (queueup.length && nums[i] <= nums[queueup[queueup.length - 1]]) queueup.pop()
    queueup.push(i)
    // 维护递减栈
    while (queuedown.length && nums[i] >= nums[queuedown[queuedown.length - 1]]) queuedown.pop()
    queuedown.push(i)
    // 当递增、递减栈的最值相减之差大于 limit，有效起始位置++
    while (nums[queuedown[0]] - nums[queueup[0]] > limit) {
      minInd++
      // 删除栈中不合法的下标
      while (queueup[0] < minInd) queueup.shift()
      while (queuedown[0] < minInd) queuedown.shift()
    }
    // 尝试更新结果值
    res = Math.max(res, i - minInd + 1)
  }
  // 返回结果
  return res
}
