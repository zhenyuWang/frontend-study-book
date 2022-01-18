var findSubsequences = function(nums) {
  // 记录输入数组长度
  const len = nums.length,
  // 初始化结果数组
  res = [];
  // 根据给定子序列和开始下标，向后查找符合要求的元素，组成新的递增子序列
  function getList(arr,l){
    // 初始化 set 记录使用过的数字
    const set = new Set(),
    // 获取当前子序列最后一个元素
    end = arr[arr.length-1]
    // 遍历未处理区间
    for(let i = l;i<len;i++){
      const item = nums[i]
      // 如果当前数字使用过或者不符合要求，跳过
      if(set.has(item) || item<end) continue;
      // 否则记录该数字
      set.add(item)
      // 获取新的递增子序列
      const _arr = [...arr,item]
      // 将子序列插入结果数组
      res.push(_arr)
      // 继续查找可能的子序列
      getList(_arr,i+1)
    }
  }
  // 创建 set 记录使用过的数字
  const set = new Set();
  // 遍历输入数组，以每一个元素为起点，查找递增子序列
  for(let i = 0;i<len-1;i++){
    const item = nums[i]
    if(set.has(item)) continue
    set.add(item)
    getList([item],i+1)
  }
  // 返回结果数组
  return res;
};