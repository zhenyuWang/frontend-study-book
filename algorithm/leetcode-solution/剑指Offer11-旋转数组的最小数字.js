// 利用 Math.min + 展开运算符
var minArray = function (numbers) {
  return Math.min(...numbers)
}

// 直接一次 for 循环
var minArray = function (numbers) {
  let min = numbers[0]
  for (let i = 1; i < numbers.length; i++) {
    min = Math.min(min, numbers[i])
  }
  return min
}

// 利用题意给出的特性
var minArray = function (numbers) {
  const len = numbers.length
  // 如果第一个元素大于等于最后一个元素，说明进行了旋转，最小值在半部分
  if (numbers[0] >= numbers[len - 1]) {
    // 从最后一位开始查找
    let i = len - 1
    while (i > 0 && numbers[i - 1] <= numbers[i]) i--
    // 直到找到一个下标位置前面的值大于后面的值 或者 找到下标 0 位置
    return numbers[i]
  }
  // 没有进行旋转，最小值就是第一个元素
  return numbers[0]
}
