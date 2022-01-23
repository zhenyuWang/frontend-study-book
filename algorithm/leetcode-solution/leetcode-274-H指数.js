var hIndex = function (citations) {
  // 对输入数组升序排序
  citations.sort((a, b) => a - b)
  // 获取数组的长度
  let len = citations.length,
  // 初始化 h 指数为 1
    h = 1
  // 当当前位置的论文引用次数大于等于后续的论文数量的时候
  // 说明当前 h 合法（当前位置及后续的所有论文引用次数都大于h,且当前位置和后续数量为h）
  while (citations[len - h] >= h) h++
  // while 循环终止，找到了第一个不合法的位置，返回结果为 h-1
  return h - 1
}
