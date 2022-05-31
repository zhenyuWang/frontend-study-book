var reverse = function (x) {
  x = x.toString().split('').reverse()

  if (x.at(-1) === '-') {
    x.unshift(x.pop())
  }

  x = x.join('') * 1

  if (x < -Math.pow(2, 31) || x > (Math.pow(2, 31) - 1)) {
    return 0
  }

  return x
}