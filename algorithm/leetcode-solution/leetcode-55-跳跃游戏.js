var canJump = function (nums) {
  const len = nums.length

  if (len === 1) {
    return true
  }

  let maxRight = 0

  for (let i = 0; i < len - 1; i++) {
    if (i > maxRight) {
      return false
    }

    maxRight = Math.max(maxRight, i + nums[i])
    if (maxRight >= len - 1) {
      return true
    }
  }

  return false
}