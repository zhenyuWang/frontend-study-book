// sort 排序
var smallestK = function(arr, k) {
  arr.sort((a,b) => a-b)
  // 返回排序后的前 k 个数字
  return arr.slice(0,k)
};

// 大顶堆
class MaxHeap{
  constructor(max){
    this.size = 0;
    this.list = [];
    this.max = max;
  }
  // 插入元素
  push(val){
    this.list.push(val);
    this.size++;
    // 插入后自下向上平衡调整
    if(this.size>1){
      let cur = this.size-1,
      parent = (cur-1)>>1;
      while(cur>0&&this.list[parent]<this.list[cur]){
        [this.list[parent],this.list[cur]] =
        [this.list[cur],this.list[parent]]
        cur = parent,parent = (cur-1)>>1;
      }
    }
    // 如果当前堆中元素超出了 k 个，弹出堆顶元素
    if(this.size>this.max) this.pop();
  }
  // 弹出元素
  pop(){
    // 弹出堆顶元素，并将最后一个元素占位到堆顶
    this.list[0] = this.list.pop();
    // 弹出后自上向下平衡调整
    let cur = 0,
    childl = 1,childr = 2;
    while(
      (childl<this.size&&this.list[cur]<this.list[childl])||
      (childr<this.size&&this.list[cur]<this.list[childr])
    ){
      if(childr<this.size&&this.list[childl]<this.list[childr]){
        [this.list[cur],this.list[childr]] =
        [this.list[childr],this.list[cur]]
        cur = childr
      }else{
        [this.list[cur],this.list[childl]] =
        [this.list[childl],this.list[cur]]
        cur = childl
      }
      childl = cur*2+1,childr = cur*2+2;
    }
  }
  // 获取堆顶元素
  top(){
    return this.list[0]
  }
}
var smallestK = function(arr, k) {
  // 实例化大顶堆
  const heap = new MaxHeap(k);
  // 遍历输入数组
  for(let i = 0;i<arr.length;i++){
    // 如果堆中元素不够 K 个或者当前元素小于堆顶元素，则插入堆中
    if(heap.size<k||arr[i]<heap.top()){
      heap.push(arr[i])
    }
  }
  // 返回堆中维护的最小的 k 个数
  return heap.list;
};