var threeSumClosest = function (nums, target) {
  const len = nums.length
  let res = Infinity

  for (let i = 0; i < len - 2; i++) {
    const num1 = nums[i]
    for (let j = i + 1; j < len - 1; j++) {
      const num2 = nums[j]
      for (let k = j + 1; k < len; k++) {
        const sum = num1 + num2 + nums[k]

        if (Math.abs(sum - target) < Math.abs(res - target)) {
          res = sum
        }
      }
    }
  }

  return res
}

var threeSumClosest = function (nums, target) {
  let res
  let diff = Infinity

  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length - 2; i++) {
    let head = i + 1
    let end = nums.length - 1

    while (head < end) {
      if (head > i + 1 && nums[head] === nums[head - 1]) {
        head++
        continue
      }
      if (end < nums.length - 1 && nums[end] === nums[end + 1]) {
        end--
        continue
      }
      const sum = nums[i] + nums[head] + nums[end]
      const _diff = sum - target

      if (Math.abs(_diff) < diff) {
        res = sum
        diff = Math.abs(_diff)
      }
      if (_diff < 0) {
        head++
      } else {
        end--
      }
    }
  }

  return res
}
