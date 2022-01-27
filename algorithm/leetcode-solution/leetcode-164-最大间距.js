// 获取低 16 位
function low16(num){
  return num & 0xffff
}
// 获取高 16 位
function high16(num){
  return (num & 0xffff0000) >> 16
}
var maximumGap = function (nums) {
  // 获取输入数组长度
  const len = nums.length;
  // 如果输入数组长度小于 2，直接返回 0
  if(len<2) return 0;
  // 创建计数数组
  const count = Array(65536).fill(0),
  // 创建 temp 数组存储低 16 位排序后的结果
    temp = Array(len)
  // 低十六位排序
  // 计数
  for(let i = 0;i<len;i++) count[low16(nums[i])]++
  // 求前缀和
  for(let i = 1;i<65536;i++) count[i] += count[i-1]
  // 归位
  for(let i = len-1;i>=0;i--) temp[--count[low16(nums[i])]] = nums[i]
  // 重置 count
  for (let i = 0; i < 65536; i++) count[i] = 0
  // 高十六位排序
  // 计数
  for(let i = 0;i<len;i++) count[high16(temp[i])]++
  // 求前缀和
  for(let i = 1;i<65536;i++) count[i] += count[i-1]
  // 归位
  for(let i = len-1;i>=0;i--) nums[--count[high16(temp[i])]] = temp[i]
  // 初始化结果值为 0
  let res = 0
  // 根据排序后的 nums 求最大间距
  for (let i = 1; i < len; i++) res = Math.max(res, nums[i] - nums[i - 1])
  // 返回结果值
  return res
}
