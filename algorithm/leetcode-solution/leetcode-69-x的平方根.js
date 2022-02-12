var mySqrt = function (x) {
  // 特殊判断 0 和 1
  if (x === 0 || x === 1) return x
  // 因为已经特判了 0 1，所以左边界设置为1，右边界为 x
  let l = 1,
    r = x
  // 二分查找第一个平方结果大于 x 的整数
  while (l < r) {
    const mid = Math.floor((l + r) / 2)
    if (mid * mid <= x) l = mid + 1
    else r = mid
  }
  // 返回该数字-1的结果，即为 x 的算术平方根
  return l - 1
}
