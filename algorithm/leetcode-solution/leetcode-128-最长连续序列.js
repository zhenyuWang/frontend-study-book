// sort
var longestConsecutive = function(nums) {
  // 对输入数组升序排序
  nums.sort((a,b) => a-b)
  // 初始化最大值为0，当前子序列长度为0，前一个元素值为正无穷
  let max = 0,len = 0,pre = Infinity;
  // 遍历排序后的输入数组
  for(let i = 0;i<nums.length;i++){
    // 如果当前值 = pre,说明是重复值，跳过循环
    if(pre === nums[i]) continue;
    // 如果当前符合数字连续性质，子序列长度+1
    if(pre === nums[i]-1) len++
    // 否则，说明前一个子序列结束，尝试更新max,并重置 len = 1
    else max = Math.max(max,len),len = 1
    // 更新 pre 为当前元素值
    pre = nums[i]
  }
  // 返回 max 和最后一个子序列长度的最大值
  return Math.max(max,len)
};

// Set
var longestConsecutive = function(nums) {
  // 根据输入数组创建set
  const set = new Set(nums);
  // 初始化结果值为 0
  let res = 0;
  // 遍历 set
  set.forEach(item => {
    // 如果 set 没有当前值-1的值，说明当前值是其所在子序列的起始值
    if(!set.has(item-1)){
      // 初始化 len = 1
      let len = 1;
      // 当可以找到当前值 +1 的值时，子序列长度+1，并更新当前值
      while(set.has(item+1)){
        len++,item++
      }
      // 尝试用子序列长度更新结果值
      res = Math.max(res,len)
    }
  })
  // 返回结果值
  return res;
};