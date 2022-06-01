var myAtoi = function (s) {
  let num = ''
  const reg = /[0-9+-]/

  for (let i = 0; i < s.length; i++) {
    if (num === '' && s[i] === ' ') {
      continue
    }

    if (num && (s[i] === '+' || s[i] === '-')) {
      break
    }

    if (reg.test(s[i])) {
      num += s[i]
    } else {
      break
    }
  }

  num *= 1

  if (num < -Math.pow(2, 31)) {
    return -Math.pow(2, 31)
  }

  if (num > (Math.pow(2, 31) - 1)) {
    return Math.pow(2, 31) - 1
  }

  return num || 0
}
