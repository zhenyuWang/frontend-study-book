// sort 排序
var lastStoneWeight = function(stones) {
  // 当数组长度大于1的时候取出最大的两个值操作
  while(stones.length>1){
    // 将数组进行升序排序
    stones.sort((a,b) => a-b)
    // 排序后数组末尾的两个值就是最大的两个值
    const num1 = stones.pop(),
    num2 = stones.pop();
    // 如果两数不等，将差值插入数组
    if(num1!==num2) stones.push(num1-num2);
  }
  return stones[0]||0;
};
// 二分算法
var lastStoneWeight = function(stones) {
  // 首先对数组进行一次排序
  stones.sort((a,b) => a-b);
  // 当数组长度大于1的时候取出最大的两个值操作
  while(stones.length>1){
    const num1 = stones.pop(),
    num2 = stones.pop();
    // 如果两数不等，将差值通过二分算法查找合适的位置插入
    if(num1!==num2) stones = insert(stones,num1-num2);
  }
  // 二分算法插入差值
  function insert(arr,num){
    if(num<arr[0]) return [num,...arr]
    else if(num>arr[arr.length-1]) return [...arr,num]
    // 二分查找第一个大于等于num的位置
    let l = 0,r = arr.length-1;
    while(l<r){
      const mid = (l+r)>>1;
      if(arr[mid]<num) l = mid+1
      else r = mid;
    }
    // 将num插入
    arr.splice(l,0,num);
    return arr;
  }
  return stones[0]||0;
};
// 大顶堆
class BigHeap{
  constructor(){
    this.arr = [];
    this.size = 0;
  }
  // 插入操作
  push(val){
    this.arr.push(val);
    this.size++;
    // 插入向上调整
    if(this.size>1){
      let cur = this.size-1,
      parent = (cur-1)>>1;
      while(cur>0&&this.arr[cur]>this.arr[parent]){
        [this.arr[parent],this.arr[cur]] =
        [this.arr[cur],this.arr[parent]]
        cur = parent,parent = (cur-1)>>1;
      }
    }
  }
  // 弹出操作
  pop(){
    if(this.size===0) return false;
    if(this.size===1){
      this.size = 0;
      return this.arr.pop();
    }
    const res = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.size--;
    // 弹出向下调整
    let cur = 0,
    childl = 1,childr = 2;
    while(
      (childl<this.size&&this.arr[childl]>this.arr[cur]) ||
      (childr<this.size&&this.arr[childr]>this.arr[cur])
    ){
      if(childr<this.size&&this.arr[childr]>this.arr[childl]){
        [this.arr[cur],this.arr[childr]] =
        [this.arr[childr],this.arr[cur]]
        cur = childr;
      }else{
        [this.arr[cur],this.arr[childl]] =
        [this.arr[childl],this.arr[cur]]
        cur = childl;
      }
      childl = cur*2+1,childr = cur*2+2;
    }
    return res;
  }
}
var lastStoneWeight = function(stones) {
  // 创建大顶堆实例
  const heap = new BigHeap();
  // 将数组中元素插入堆中
  for(let i = 0;i<stones.length;i++){
    heap.push(stones[i])
  }
  // 当堆中元素数量大于1的时候取出最大的两个值操作
  while(heap.size>1){
    const num1 = heap.pop(),
    num2 = heap.pop();
    // 如果有差值，将差值插入堆中
    if(num1!==num2) heap.push(num1-num2);
  }
  return heap.pop()||0;
};