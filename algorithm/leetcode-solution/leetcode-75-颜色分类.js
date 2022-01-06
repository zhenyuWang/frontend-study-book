var sortColors = function(nums) {
  // 获取数组长度
  const len = nums.length;
  // 初始化遍历次数 当前元素下标
  let count = 0,i = 0;
  // 遍历输入数组
  while(count<len){
    const num = nums[i]
    // 单过当前元素为 0
    if(num === 0){
      // 将其移动到数组开头
      if(i!==0) nums.unshift(nums.splice(i,1))
    }
    // 如果当前元素为 2，将其移动到数组末尾，因为后面元素统一向前移动了一位，所以 i--
    else if(num === 2) nums.push(nums.splice(i,1)),i--
    // 更新遍历次数和当前元素下标
    count++,i++;
  }
};