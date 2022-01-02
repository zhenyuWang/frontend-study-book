// 实现单调递增队列类
class MonotonicQueue {
  // 初始化单调队列
  constructor(){
    this.queue = []
  }
  // 插入操作
  push(val){
    // 插入之前，将队列中违反单调性质的元素删除
    while(this.queue.length&&this.queue[this.queue.length-1]>=val) this.queue.pop();
    this.queue.push(val)
  }
}
const instance = new MonotonicQueue();
instance.push(1);
instance.push(3);
instance.push(-1);
instance.push(-3);
instance.push(5);
instance.push(3);
instance.push(6);
instance.push(7);
console.log(instance.queue); // [-3,3,6,7]
// 解决滑动窗口最大值问题
// 给定数组
const nums = [1,3,-1,-3,5,3,6,7],
// 窗口宽度
k = 3,
// 初始化单调队列
queue = [],
// 初始化结果数组
res = [];
// 因为要获取窗口中的最大值，所以这里要维护的是单调递减队列，这样队首元素就维护了区间内的最大值
// 首先获取初始化窗口内元素的单调队列结果
for(let i = 0;i<k;i++){
  // 将队列中违反单调性质的元素删除
  while(queue.length&&queue[queue.length-1]<=nums[i]) queue.pop();
  // 将当前元素下标插入单调队列
  queue.push(i);
}
// 将窗口中的最大值插入到结果数组
res.push(nums[queue[0]])
// 遍历输入数组，模拟窗口滑动
for(let i = k;i<nums.length;i++){
  // 如果队首元素超出了窗口范围，则删除
  if(queue[0]<=i-k) queue.shift();
  // 将队列中违反单调性质的元素删除
  while(queue.length&&queue[queue.length-1]<=nums[i]) queue.pop();
  // 将当前元素下标插入单调队列
  queue.push(i);
  // 将窗口中的最大值插入到结果数组
  res.push(nums[queue[0]])
}
console.log(res);  // [3,3,5,5,6,7]