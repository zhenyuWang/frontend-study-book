var fourSum = function (nums, target) {
  const len = nums.length

  if (len < 4) {
    return []
  }

  let res = []


  nums.sort((a, b) => a - b)

  for (let i = 0; i < len - 3; i++) {
    if (nums[i] > target && nums[i] >= 0) {
      return res
    }

    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }

    for (let j = i + 1; j < len - 2; j++) {
      if (nums[i] + nums[j] > target && nums[j] >= 0) {
        break
      }

      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue
      }

      let head = j + 1
      let end = len - 1

      while (head < end) {
        if (end < len - 1 && nums[end] === nums[end + 1]) {
          end--
          continue
        }

        if (head > j + 1 && nums[head] === nums[head - 1]) {
          head++
          continue
        }

        const sum = nums[i] + nums[j] + nums[head] + nums[end]

        if (sum === target) {
          res.push([nums[i], nums[j], nums[head], nums[end]])
        }
        if (sum - target > 0) {
          end--
        } else {
          head++
        }
      }
    }
  }

  return res
}
