// sort 排序
var moveZeroes = function (nums) {
  nums.sort((a, b) => {
    // 如果两个元素都是 非0 或者都是 0，保持相对位置不变，减小操作次数
    if ((a && b) || (a === 0 && b === 0)) return 0
    // 如果前面是 0 后面是 非0，返回 1，保证 非0 在前，0 在后
    if (a === 0 && b) return 1
    // 如果前面是 非0 后面是 0，返回 -1，保证 非0 在前，0 在后
    return -1
  })
}

// 交换位置
var moveZeroes = function (nums) {
  const len = nums.length
  // l 指向 0，r 指向 非0
  let l = 0,
    r = 0
  // r 指针扫描整个数组
  while (r < len) {
    // l 向后找到为 0 的元素
    while (l < len && nums[l] !== 0) l++
    // r 向后找到 非0 的元素
    while (r < len && nums[r] === 0) r++
    // 如果当前 l<r（即 0 前 非0 后），并且 r 合法，交换两元素位置
    if (l < r && r < len) {
      ;[nums[l], nums[r]] = [nums[r], nums[l]]
    }
    // 向后移动 r 查找新的 非0 元素
    r++
  }
}
