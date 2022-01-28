var arrayPairSum = function (nums) {
  // 对输入数组进行升序排序
  nums.sort((a, b) => a - b)
  // 初始化结果值为 0
  let res = 0
  // 每两个为一组数字对，前面的一个是其中的最小值
  for (let i = 0; i < nums.length; i += 2) {
    // 累加每个数字对的最小值
    res += nums[i]
  }
  // 返回结果值
  return res
}
