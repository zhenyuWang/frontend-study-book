var strStr = function (haystack, needle) {
  return haystack.indexOf(needle)
}

var strStr = function (haystack, needle) {
  const len = needle.length
  const firstChar = needle[0]

  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] !== firstChar) {
      continue
    }

    if (haystack.slice(i, i + len) === needle) {
      return i
    }
  }

  return -1
}
