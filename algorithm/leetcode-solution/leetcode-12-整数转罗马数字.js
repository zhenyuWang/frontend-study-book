function getRoman(num) {
  switch (num) {
    case 1:
    case 2:
    case 3:
      return 'I'.repeat(num)
    case 4:
      return 'IV'
    case 5:
    case 6:
    case 7:
    case 8:
      return 'V' + 'I'.repeat(num - 5)
    case 9:
      return 'IX'
    case 10:
    case 20:
    case 30:
      return 'X'.repeat(num / 10)
    case 40:
      return 'XL'
    case 50:
    case 60:
    case 70:
    case 80:
      return 'L' + 'X'.repeat(num / 10 - 5)
    case 90:
      return 'XC'
    case 100:
    case 200:
    case 300:
      return 'C'.repeat(num / 100)
    case 400:
      return 'CD'
    case 500:
    case 600:
    case 700:
    case 800:
      return 'D' + 'C'.repeat(num / 100 - 5)
    case 900:
      return 'CM'
    case 1000:
    case 2000:
    case 3000:
      return 'M'.repeat(num / 1000)
    default:
      return ''
  }
}

var intToRoman = function (num) {
  num += ''
  let len = num.length
  let res = ''

  for (let i = 0; i < num.length; i++) {
    res += getRoman(num[i] * Math.pow(10, len - i - 1))
  }
  return res
}
