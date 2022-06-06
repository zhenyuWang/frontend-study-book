var threeSum = function (nums) {
  const len = nums.length
  const res = []
  const set = new Set()

  for (let i = 0; i < len - 2; i++) {
    const num1 = nums[i]
    for (let j = i + 1; j < len - 1; j++) {
      const num2 = nums[j]
      for (let k = j + 1; k < len; k++) {
        if (num1 + num2 + nums[k] === 0) {
          const arr = [num1, num2, nums[k]]
          const str = arr.sort((a, b) => a - b).join('')

          if (set.has(str)) {
            continue
          }

          set.add(str)
          res.push(arr)
        }
      }
    }
  }

  return res
}

var threeSum = function (nums) {
  const len = nums.length
  const res = []
  const set = new Set()
  const map = new Map()

  for (let i = 0; i < len; i++) {
    const num = nums[i]
    map.set(num, map.has(num) ? [...map.get(num), i] : [i])
  }

  for (let i = 0; i < len - 2; i++) {
    const num1 = nums[i]
    for (let j = i + 1; j < len - 1; j++) {
      const num2 = nums[j]
      const diff = 0 - num1 - num2

      if (!map.has(diff)) {
        continue
      }

      const indexs = map.get(diff)
      let num3Index

      for (let k = 0; k < indexs.length; k++) {
        if (indexs[k] === i || indexs[k] === j) {
          continue
        }

        num3Index = indexs[k]
        break
      }

      if (num3Index === undefined) {
        continue
      }

      const arr = [num1, num2, nums[num3Index]]

      const str = arr.sort((a, b) => a - b).join('')

      if (set.has(str)) {
        continue
      }

      set.add(str)
      res.push(arr)
    }
  }

  return res
}

var threeSum = function (nums) {
  const len = nums.length
  if (len < 3) {
    return []
  }

  nums.sort((a, b) => a - b)

  const res = []

  for (let i = 0; i < len - 2; i++) {
    if (nums[i] > 0) {
      return res
    }

    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }

    let head = i + 1, end = len - 1;
    while (head < end) {
      if (head > i + 1 && nums[head] === nums[head - 1]) {
        head++
        continue
      }
      if (end < len - 1 && nums[end] === nums[end + 1]) {
        end--
        continue;
      }
      const sum = nums[i] + nums[head] + nums[end]

      if (sum === 0) {
        res.push([nums[i], nums[head], nums[end]])
        head++
      }

      if (sum > 0) {
        end--
      } else if (sum < 0) {
        head++
      }
    }
  }

  return res
}
