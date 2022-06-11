var removeDuplicates = function (nums) {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      nums.splice(i, 1)
      i--
    }
  }

  return nums.length
}


var removeDuplicates = function (nums) {
  let tail = 0

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[tail]) {
      continue
    }

    tail++
    nums[tail] = nums[i]
  }

  tail++

  nums.length = tail

  return tail
}