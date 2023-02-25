var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0'
  }

  num1 = num1.split('').reverse().join('')
  num2 = num2.split('').reverse().join('')
  const m = num1.length
  const n = num2.length
  const result = new Array(m + n).fill(0)

  for (let i = 0; i < m; i++) {
    let carry = 0

    for (let j = 0; j < n; j++) {
      const product = num1[i] * num2[j] + carry
      result[i + j] += product % 10
      carry = Math.floor(product / 10)

      if (result[i + j] > 9) {
        result[i + j] -= 10
        carry++
      }
    }

    if (carry) {
      result[i + n] += carry

      if (result[i + n] > 9) {
        result[i + n] -= 10
        result[i + n + 1]++
      }
    }
  }

  result.reverse()

  while (result[0] === 0) {
    result.shift()
  }

  return result.join('')
}