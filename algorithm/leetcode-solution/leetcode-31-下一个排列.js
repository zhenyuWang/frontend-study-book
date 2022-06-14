var nextPermutation = function (nums) {
  const len = nums.length

  if (len === 1) {
    return nums
  }

  let ind

  for (let i = len - 1; i >= 0; i--) {
    if (i > 0 && nums[i - 1] < nums[i]) {
      ind = i - 1

      for (let j = i; j < len; j++) {
        for (let k = len - 1; k > j; k--) {
          if (nums[k - 1] > nums[k]) {
            [nums[k - 1], nums[k]] = [nums[k], nums[k - 1]]
          }
        }
      }

      break
    }
  }

  console.log(111, ind, nums)
  if (ind !== undefined) {
    for (let i = ind + 1; i < len; i++) {
      if (nums[i] > nums[ind]) {
        [nums[ind], nums[i]] = [nums[i], nums[ind]]
        break
      }
    }
    return nums
  }

  return nums.reverse()
}
