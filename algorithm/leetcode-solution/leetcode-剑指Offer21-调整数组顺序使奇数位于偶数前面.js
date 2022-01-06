// 拆分奇偶数组
var exchange = function(nums) {
  // 初始化奇偶数组
  const l = [],r = [];
  // 遍历输入数组
  for(let i = 0;i<nums.length;i++){
    const num = nums[i];
    // 如果为奇数，放入奇数数组
    if(num%2) l.push(num)
    // 否则放入偶数数组
    else r.push(num)
  }
  // 前奇后偶的顺序组合结果数组并返回
  return [...l,...r]
};

// 双指针
var exchange = function(nums) {
  // 创建左右指针，初始化指向数组两端
  let l = 0,r = nums.length-1;
  // 当两指针未相遇时
  while(l<r){
    // 左指针向右找到偶数
    while(nums[l]%2) l++
    // 右指针向左找到奇数
    while(nums[r]%2===0) r--
    // 如果 l<r，则将两个指针位置的值进行交换
    if(l<r) [nums[l],nums[r]] = [nums[r],nums[l]]
  }
  // 返回处理后的数组即可
  return nums;
};