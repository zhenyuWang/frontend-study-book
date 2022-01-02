var maxSlidingWindow = function(nums, k) {
  // 初始化单调队列
  const queue = [],
  // 结果数组
  res = [];
  // 获取前k个元素的单调队列结果
  for(let i = 0;i<k;i++){
    while(queue.length&&nums[queue[queue.length-1]]<=nums[i]) queue.pop();
    queue.push(i);
  }
  // 将单调队列中的最大值插入结果数组
  res.push(nums[queue[0]])
  // 遍历后续输入数组，模拟窗口滑动过程
  for(let i = k;i<nums.length;i++){
    // 如果队首元素超出了滑动窗口的范围，删除队首元素
    if(queue[0]<=i-k) queue.shift();
    while(queue.length&&nums[queue[queue.length-1]]<=nums[i]) queue.pop();
    queue.push(i);
    // 将单调队列中的最大值插入结果数组
    res.push(nums[queue[0]])
  }
  // 返回结果数组
  return res;
};