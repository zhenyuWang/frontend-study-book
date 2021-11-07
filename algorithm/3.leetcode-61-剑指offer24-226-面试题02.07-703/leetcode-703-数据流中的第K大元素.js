// 1. 全程sort
var KthLargest = function(k, nums) {
  this.k = k;
  this.nums = nums.sort((a,b) => b-a);
};
// 维护nums
KthLargest.prototype.handleNums = function(val){
  if(this.nums.length>=this.k&&val<this.nums[this.k-1]) return;
  // 插入值
  this.nums.push(val);
  // 排序
  this.nums.sort((a,b) => b-a);
  // 维护数量
  while(this.nums.length>this.k){
      this.nums.pop();
  }
}
/** 
* @param {number} val
* @return {number}
*/

KthLargest.prototype.add = function(val) {
  this.handleNums(val);
  return this.nums[this.k-1]
};


// 2. 通过二分插入新的值
var KthLargest = function(k, nums) {
  this.k = k;
  this.nums = nums.sort((a,b) => b-a);
};
// 维护nums
KthLargest.prototype.handleNums = function(val){
  if(this.nums.length>=this.k&&val<this.nums[this.k-1]) return;
  // 二分插入
  let l = 0,r = this.nums.length-1;
  if(this.nums.length===1){
      if(val<this.nums[0]) this.nums = [this.nums[0],val]
      else this.nums = [val,this.nums[0]]
  }else{
      while(l<r){
          const mid = (l+r) >> 1;
          if(this.nums[mid]>val) l = mid+1
          else r = mid;
      }
      this.nums.splice(l,0,val)
  }
  // 维护数量
  while(this.nums.length>this.k){
      this.nums.pop();
  }
}
/** 
* @param {number} val
* @return {number}
*/
KthLargest.prototype.add = function(val) {
  this.handleNums(val);
  return this.nums[this.k-1]
};

// 3. 维护K个数的小顶堆
var KthLargest = function(k, nums) {
  this.heap = new MinHeap(k);
  for(let i = 0;i<nums.length;i++){
      this.heap.push(nums[i])
  }
};

/** 
* @param {number} val
* @return {number}
*/
KthLargest.prototype.add = function(val) {
  this.heap.push(val);
  return this.heap.top();
};

// 小顶堆
class MinHeap {
  constructor(max){
      this.arr = [];
      this.size = 0;
      this.max = max;
  }
  // 插入元素
  push(val){
      this.arr.push(val);
      this.size++;
      if(this.size===1) return;

      // 向上调整
      let cur = this.size-1,
      parentInd = (cur-1) >> 1;
      // 如果当前元素没有调整到堆顶并且父元素比它小，互换位置
      while(cur>0&&this.arr[parentInd]>this.arr[cur]){
          [this.arr[parentInd],this.arr[cur]] = [this.arr[cur],this.arr[parentInd]]
          cur = parentInd;
          parentInd = (cur-1) >> 1
      }
      // 维护小顶堆数量
      while(this.size>this.max) this.pop();
  }
  // 弹出堆顶元素
  pop(){
      if(this.empty()) return false;
      if(this.size === 1){
          this.size = 0;
          return this.arr.pop();
      }
      const res = this.arr[0];
      this.arr[0] = this.arr.pop();
      this.size--;
      // 向下调整
      let cur = 0,
      childl = cur*2+1,childr = cur*2+2;
      // 当有左子节点且左子节点小于根
      // 或者有右子节点且右子节点小于根
      while((childl<this.size && this.arr[childl]<this.arr[cur]) ||
      (childr<this.size && this.arr[childr]<this.arr[cur])){
          // 如果有右子节点且右子节点小于左子节点
          // 交换根和右子节点
          if(this.arr[childr]!==undefined&&this.arr[childr]<this.arr[childl]){
              [this.arr[cur],this.arr[childr]] = [this.arr[childr],this.arr[cur]]
              // 更新当前节点
              cur = childr;
          }else{
              // 交换根和左子节点
              [this.arr[cur],this.arr[childl]] = [this.arr[childl],this.arr[cur]]
              // 更新当前节点
              cur = childl;
          }
          // 更新左右子节点
          childl = cur*2+1,childr = cur*2+2;
      }
      return res;
  }
  // 查看堆顶元素
  top(){
      return this.arr[0]
  }
  // 堆是否为空
  empty(){
      return this.size === 0
  }
}


