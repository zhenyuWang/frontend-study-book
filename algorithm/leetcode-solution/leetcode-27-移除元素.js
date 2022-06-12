var removeElement = function (nums, val) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1)
      i--
    }
  }

  return nums.length
}

var removeElement = function (nums, val) {
  let tail = 0

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[tail] = nums[i]
      tail++
    }
  }

  nums.length = tail

  return tail
}