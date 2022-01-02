// 实现单调递增队列类
class MonotonicQueue {
  constructor(){
    this.queue = []
  }
  push(val){
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
console.log(instance.queue);
// 解决滑动窗口最大值问题
const nums = [1,3,-1,-3,5,3,6,7],
queue = [],
k = 3,
res = [];
for(let i = 0;i<k;i++){
  while(queue.length&&queue[queue.length-1]<=nums[i]) queue.pop();
  queue.push(i);
}
res.push(nums[queue[0]])
for(let i = k;i<nums.length;i++){
  if(queue[0]<=i-k) queue.shift();
  while(queue.length&&queue[queue.length-1]<=nums[i]) queue.pop();
  queue.push(i);
  res.push(nums[queue[0]])
}
console.log(res);