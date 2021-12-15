// 排序后返回前k个数字
var getLeastNumbers = function(arr, k) {
  arr.sort((a,b) => a-b);
  return arr.slice(0,k);
}

// 大顶堆维护k个最小值
// 创建大顶堆类
class BigHeap {
  constructor(k){
    this.arr = [];
    this.size = 0;
    this.max = k;
  }
  // 插入操作
  push(val){
    this.arr.push(val);
    this.size++;
    if(this.size>1){
      let cur = this.size-1,
      parent = (cur-1)>>1;
      while(cur>0&&this.arr[cur]>this.arr[parent]){
        [this.arr[parent],this.arr[cur]] =
        [this.arr[cur],this.arr[parent]]
        cur = parent,parent = (cur-1)>>1;
      }
    }
    if(this.size>this.max) this.pop();
  }
  // 弹出操作
  pop(){
    this.arr[0] = this.arr.pop();
    this.size--;
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
  }
  // 获取堆顶元素
  top(){
    return this.arr[0]
  }
}
var getLeastNumbers = function(arr, k) {
  // 特判k=0
  if(k===0) return [];
  // 创建大顶堆实例
  const heap = new BigHeap(k);
  // 循环数组元素
  for(let i = 0;i<arr.length;i++){
    if(heap.size<k||arr[i]<heap.top()) heap.push(arr[i])
  }
  // 返回堆中保存的k个数字
  return heap.arr;
};