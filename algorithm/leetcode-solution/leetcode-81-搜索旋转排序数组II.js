var search = function (nums, target) {
  // 如果 target 比第一个数字小，则如果存在，会在后半部分
  if (nums[0] > target) {
    for (let i = nums.length - 1; i >= 0; i--) {
      if (nums[i] === target) return true
      // 如果到了前半部分或者下标0位置还没找到，则一定不存在，返回 false
      if ((i > 0 && nums[i - 1] > nums[i]) || i === 0) return false
    }
  } else {
    // 如果 target 大于等于第一个数字，则如果存在，会在前半部分
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] === target) return true
      // 如果到了后半部分或者数组末尾还没找到，则一定不存在，返回 false
      if ((i < nums.length - 1 && nums[i] > nums[i + 1]) || i === nums.length - 1) return false
    }
  }
}
