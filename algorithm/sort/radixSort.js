// 获取低 16 位
function low16(num) {
  return num & 0xffff
}
// 获取高 16 位
function __high16(num) {
  return (num & 0xffff0000) >> 16
}
function high16(num) {
  const h = __high16(num)
  return h > 32767 ? h - 32768 : h + 32768
}
function radixSort(arr) {
  // 创建计数数组
  const count = Array(65536).fill(0),
    // 获取输入数组长度
    len = arr.length,
    // 创建 temp 数组存储低 16 位排序后的结果
    temp = Array(len)
  // 对低 16 位进行排序
  // 计数
  for (let i = 0; i < len; i++) count[low16(arr[i])]++
  // 前缀和
  for (let i = 1; i < 65536; i++) count[i] += count[i - 1]
  // 归位
  for (let i = len - 1; i >= 0; i--) temp[--count[low16(arr[i])]] = arr[i]
  // 重置 count 数组
  for (let i = 0; i < 65536; i++) count[i] = 0
  // 对高 16 位进行排序
  // 计数
  for (let i = 0; i < len; i++) count[high16(temp[i])]++
  // 前缀和
  for (let i = 1; i < 65536; i++) count[i] += count[i - 1]
  // 归位
  for (let i = len - 1; i >= 0; i--) arr[--count[high16(temp[i])]] = temp[i]
  // 返回结果
  return arr
}

// const arr = [13, 21, 11, 32, -18, 31, 22, 21]
const arr = [13, 21, 11, 32, 31, 22, 21]
console.log(radixSort(arr))
