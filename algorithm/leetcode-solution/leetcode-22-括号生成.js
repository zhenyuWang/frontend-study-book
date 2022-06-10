function getRes(l, r, str, res) {
  if (l === 0 && r === 0) {
    res.push(str)
    return
  }

  if (l === r) {
    getRes(l - 1, r, str + '(', res)
  } else {
    if (l) {
      getRes(l - 1, r, str + '(', res)
    }

    if (r) {
      getRes(l, r - 1, str + ')', res)
    }
  }

  return res
}

var generateParenthesis = function (n) {
  return getRes(n, n, '', [])
}