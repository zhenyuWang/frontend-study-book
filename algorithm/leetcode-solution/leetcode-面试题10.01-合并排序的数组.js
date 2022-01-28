var merge = function (A, m, B, n) {
  // 初始化指针 a 指向 A 数组的末尾元素
  let a = m - 1,
    // 初始化指针 b 指向 B 数组的末尾元素
    b = n - 1
  // 从后向前的处理 B 数组中的每一个元素
  while (b >= 0) {
    // 让 a 指向第一个小于等于 b 指向元素的位置
    while (A[a] > B[b]) a--
    // 将 a 指针后面的元素统一向后移动一位
    move(A, a)
    // 将 b 指向元素插入空出的位置
    A[a + 1] = B[b]
    // 向前移动 b 指针处理剩余元素
    b--
  }
  /*
   * 传入数组和指定下标，将下标后面的元素统一向后移动一位
   * @param {number[]} arr
   * @param {number} ind
   * * @return {void}
   */
  function move(arr, ind) {
    // 从后向前将每一个元素向后移动一位，直到指定下标为止
    for (let i = arr.length - 2; i > ind; i--) {
      arr[i + 1] = arr[i]
    }
  }
}
