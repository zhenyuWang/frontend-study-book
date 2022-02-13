var searchRange = function (nums, target) {
  // 特判输入数组为空或者target小于第一个数字或者target大于最后一个数字，此时数组中肯定没有target，直接返回 [-1,-1]
  if (nums.length === 0 || target < nums[0] || target > nums[nums.length - 1]) return [-1, -1]
  // 二分查找第一个大于等于 target 的位置
  let l = 0,
    r = nums.length - 1
  while (l < r) {
    const mid = (l + r) >> 1
    if (nums[mid] < target) l = mid + 1
    else r = mid
  }
  // 如果当前位置的值是 target，则继续向后查找，直到找到一个数字不等于 target
  // 此时 l~i-1区间内的数字都是 target
  if (nums[l] === target) {
    let i = l + 1
    while (nums[i] === target) i++
    return [l, i - 1]
  }
  // 如果第一个大于等于 target 的位置的值不是 target，返回 [-1,-1]
  return [-1, -1]
}
