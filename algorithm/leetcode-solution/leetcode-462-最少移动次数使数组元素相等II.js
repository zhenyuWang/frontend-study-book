// 想要移动的次数最少，就应该所有的数字都往中间移动
// 所以移动的目标值应该是数组中所有数字的中位数
var minMoves2 = function (nums) {
  // 获取中位数
  function getMid(arr) {
    // 对输入数组排序
    arr.sort((a, b) => a - b)
    // 获取输入数组长度
    const len = nums.length
    // 如果长度为奇数，则直接返回中间的元素
    if (len % 2) return arr[len >> 1]
    // 否则需要获取数组中元素之和
    let sum = 0
    for (let i = 0; i < len; i++) sum += arr[i]
    // 然后获取在中间的两个数字
    const num1 = arr[len >> 1]
    num2 = arr[(len >> 1) - 1]
    // 返回两个数字中最靠近元素之和的那一个
    if (Math.abs(num1 - sum / 2) < Math.abs(num2 - sum / 2)) return num1
    return num2
  }
  const mid = getMid(nums)
  // 初始化结果值为 0
  let ret = 0
  // 遍历输入数组，计算与中位数的差值=> 就是每个元素移动到中位数的步数
  for (let i = 0; i < nums.length; i++) {
    ret += Math.abs(nums[i] - mid)
  }
  // 返回结果值
  return ret
}
