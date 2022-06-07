var letterCombinations = function (digits) {
  if (!digits) {
    return []
  }

  const arr = []
  let res = []
  const numToChars = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z']
  }

  for (let i = 0; i < digits.length; i++) {
    arr.push(numToChars[digits[i]])
  }

  res = arr[0]
  arr.shift()

  while (arr.length) {
    const processArr = []

    for (let i = 0; i < arr[0].length; i++) {
      for (let j = 0; j < res.length; j++) {
        processArr.push(res[j] + arr[0][i])
      }
    }
    arr.shift()
    res = processArr
  }

  return res
}
