var countAndSay = function (n) {
  let result = '1'

  for (let i = 2; i <= n; i++) {
    let currentChar = result[0]
    let currentAmount = 1
    const charList = []

    for (let i = 1; i < result.length; i++) {
      if (result[i] !== currentChar) {
        charList.push(`${currentAmount}${currentChar}`)
        currentChar = result[i]
        currentAmount = 1
      } else {
        currentAmount++
      }
    }

    result = `${charList.join('')}${currentAmount}${currentChar}`
  }

  return result
}
