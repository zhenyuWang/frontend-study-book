var makeFancyString = function (s) {
  return s.replace(/([a-z])\1{2,}/g, (x) => {
    return x.substring(0, 2)
  })
}

var makeFancyString = function (s) {
  const len = s.length
  let res = ''

  for (let i = 0; i < len; i++) {
    if (i < len - 2 && s[i] === s[i + 1] && s[i + 1] === s[i + 2]) {
      continue
    }
    res += s[i]
  }

  return res
}