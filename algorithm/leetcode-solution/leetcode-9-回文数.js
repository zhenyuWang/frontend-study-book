function check(s) {
  let l = 0
  let r = s.length - 1

  while (l < r) {
    if (s[l] !== s[r]) {
      return false
    }
    l++, r--
  }

  return true
}
var isPalindrome = function (x) {
  if (x < 0) {
    return false
  }

  return check(x + '')
}


var isPalindrome = function (x) {
  if (x < 0) {
    return false
  }

  if (x < 10) {
    return true
  }

  if (x % 10 === 0) {
    return false
  }

  let reverseNum = 0

  while (x > reverseNum) {
    reverseNum = reverseNum * 10 + x % 10

    x = Math.floor(x / 10)
  }

  return reverseNum === x || Math.floor(reverseNum / 10) === x
}