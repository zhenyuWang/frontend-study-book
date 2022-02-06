// 想要移动的次数最少，就应该所有的数字都往中间移动
// 所以移动的目标值应该是数组中所有数字的中位数
var minMoves2 = function (nums) {
  // 获取中位数
  function getMid(arr) {
    arr.sort((a, b) => a - b)
    const len = nums.length
    if (len % 2) return arr[len >> 1]
    let sum = 0
    for (let i = 0; i < len; i++) sum += arr[i]
    const num1 = arr[len >> 1]
    num2 = arr[(len >> 1) - 1]
    if (Math.abs(num1 - sum / 2) < Math.abs(num2 - sum / 2)) return num1
    return num2
  }
  const mid = getMid(nums)
  // 初始化结果值为 0
  let ret = 0
  // 遍历输入数组，计算与中位数的差值
  for (let i = 0; i < nums.length; i++) {
    ret += Math.abs(nums[i] - mid)
  }
  // 返回结果值
  return ret
}
