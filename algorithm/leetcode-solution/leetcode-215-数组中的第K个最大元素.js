// sort排序
var findKthLargest = function(nums, k) {
  // 降序排序
  nums.sort((a,b) => b-a);
  // 返回排序后第k个元素
  return nums[k-1]
};

// 小顶堆
class MinHeap {
  constructor(k){
    this.arr = [];
    this.size = 0;
    this.max = k;
  }
  // 插入操作
  push(val){
    this.arr.push(val);
    this.size++;
    // 自下向上平衡调整
    if(this.size>1){
      let cur = this.size-1,
      parent = (cur-1)>>1;
      while(cur>0&&this.arr[cur]<this.arr[parent]){
        [this.arr[parent],this.arr[cur]] =
        [this.arr[cur],this.arr[parent]]
        cur = parent,parent = (cur-1)>>1;
      }
    }
    // 如果堆中元素数量超过K个,弹出堆顶元素
    if(this.size>this.max) this.pop();
  }
  // 弹出操作
  pop(){
    this.arr[0] = this.arr.pop();
    this.size--;
    // 自上向下平衡调整
    let cur = 0,
    childl = 1,childr = 2;
    while(
      (childl<this.size&&this.arr[childl]<this.arr[cur]) ||
      (childr<this.size&&this.arr[childr]<this.arr[cur])
    ){
      if(childr<this.size&&this.arr[childr]<this.arr[childl]){
        [this.arr[cur],this.arr[childr]] =
        [this.arr[childr],this.arr[cur]]
        cur = childr
      }else{
        [this.arr[cur],this.arr[childl]] =
        [this.arr[childl],this.arr[cur]]
        cur = childl
      }
      childl = cur*2+1,childr = cur*2+2;
    }
  }
  // 返回堆顶元素
  top(){
    return this.arr[0]
  }
}
var findKthLargest = function(nums, k) {
  // 创建小顶堆实例
  const heap = new MinHeap(k);
  // 循环输入数组
  for(let i = 0;i<nums.length;i++){
    // 当堆中数量小于k或者当前元素大于堆顶元素的时候，将当前元素插入堆中
    if(heap.size<k||nums[i]>heap.top()){
      heap.push(nums[i])
    }
  }
  // 返回堆顶元素
  return heap.top();
};