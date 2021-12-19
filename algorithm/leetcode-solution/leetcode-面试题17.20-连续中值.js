// sort
var MedianFinder = function() {
  this.arr = [];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  this.arr.push(num);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  // 对数组排序
  this.arr.sort((a,b) => a-b)
  // 根据数组长度奇偶返回对应中位数
  const len = this.arr.length;
  if(len%2) return this.arr[len>>1]
  return (this.arr[(len>>1)-1]+this.arr[len>>1])/2
};

// 二分插入
var MedianFinder = function() {
  this.arr = [];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  // 每次将num插入到有序数组合适位置，维持数组有序
  if(this.arr.length==0||num<=this.arr[0]) this.arr.unshift(num)
  else if(num>=this.arr[this.arr.length-1]) this.arr.push(num)
  else{
    let l = 0,r = this.arr.length-1;
    while(l<r){
      const mid = (l+r)>>1;
      if(this.arr[mid]<num) l = mid+1
      else r = mid
    }
    this.arr.splice(l,0,num)
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  // 根据数组长度奇偶返回对应中位数
  const len = this.arr.length;
  if(len%2) return this.arr[len>>1]
  return (this.arr[(len>>1)-1]+this.arr[len>>1])/2
};


// 堆
class Heap {
  constructor(compare){
    this.arr = [];
    this.size = 0;
    this.compare = compare
  }
  // 插入操作
  push(val){
    this.arr.push(val);
    this.size++;
    // 插入后自下向上平衡调整
    if(this.size>1){
      let cur = this.size-1,
      parent = (cur-1)>>1;
      while(cur>0&&this.compare(this.arr[parent],this.arr[cur])){
        [this.arr[parent],this.arr[cur]] =
        [this.arr[cur],this.arr[parent]]
        cur = parent,parent = (cur-1)>>1;
      }
    }
  }
  // 弹出操作
  pop(){
    const res = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.size--;
    // 弹出后自上向下平衡调整
    let cur = 0,
    childl = 1,childr = 2;
    while(
      (childl<this.size&&this.compare(this.arr[cur],this.arr[childl])) ||
      (childr<this.size&&this.compare(this.arr[cur],this.arr[childr]))
    ){
      if(childr<this.size&&this.compare(this.arr[childl],this.arr[childr])){
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
    return res;
  }
  // 获取堆顶元素
  top(){
    return this.arr[0]
  }
}
var MedianFinder = function() {
  // 创建大顶堆，小顶堆实例
  this.bigHeap = new Heap((a,b) => a<b)
  this.littleHeap = new Heap((a,b) => a>b)
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  // 当两个堆为空或者当前值小于等于大顶堆堆顶元素的时候，插入大顶堆
  if(this.bigHeap.size===0||num<=this.bigHeap.top()){
    this.bigHeap.push(num)
    // 如果大顶堆元素数量大于小顶堆元素数量+1
    // 弹出大顶堆堆顶元素插入小顶堆
    if(this.bigHeap.size>this.littleHeap.size+1){
      this.littleHeap.push(this.bigHeap.pop())
    }
  }else{
    this.littleHeap.push(num)
    // 如果小顶堆元素数量大于大顶堆
    // 弹出小顶堆堆顶元素插入大顶堆
    if(this.littleHeap.size>this.bigHeap.size){
      this.bigHeap.push(this.littleHeap.pop())
    }
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  // 如果两堆元素数量相等，中位数是两堆顶元素平均值
  if(this.bigHeap.size===this.littleHeap.size){
    return (this.bigHeap.top()+this.littleHeap.top())/2
  }
  // 否则中位数是大顶堆堆顶元素
  return this.bigHeap.top();
};