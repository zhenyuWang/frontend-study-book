// 实现大顶堆
class BigHeap {
  constructor(k){
    this.arr = [];
    this.size = 0;
    this.max = k;
  }
  // 插入操作
  push(item){
    this.arr.push(item);
    this.size++;
    if(this.size>1){
      let cur = this.size-1,
      parent = (cur-1)>>1;
      while(cur>0&&compare(this.arr[cur],this.arr[parent])){
        [this.arr[parent],this.arr[cur]] =
        [this.arr[cur],this.arr[parent]];
        cur = parent;
        parent = (cur-1)>>1;
      }
    }
    if(this.size>this.max) this.pop();
  }
  // 弹出操作
  pop(){
    this.arr[0] = this.arr.pop();
    this.size--;
    let cur = 0,
    childl = cur*2+1,
    childr = cur*2+2;
    while(
      (childl<this.size&&compare(this.arr[childl],this.arr[cur])) ||
      (childr<this.size&&compare(this.arr[childr],this.arr[cur]))
    ){
      if(childr<this.size&&compare(this.arr[childr],this.arr[childl])){
        [this.arr[cur],this.arr[childr]] =
        [this.arr[childr],this.arr[cur]];
        cur = childr;
      }else{
        [this.arr[cur],this.arr[childl]] =
        [this.arr[childl],this.arr[cur]];
        cur = childl;
      }
      childl = cur*2+1,
      childr = cur*2+2;
    }
  }
  // 获取堆顶元素
  top(){
    return this.arr[0]
  }
}
// 比较两数组之和大小
function compare(arr1,arr2){
  return (arr1[0]+arr1[1])>(arr2[0]+arr2[1])
}
var kSmallestPairs = function(nums1, nums2, k) {
  // 实例化大顶堆
  const heap = new BigHeap(k);
  // 遍历每一种组合
  for(let i = 0;i<nums1.length;i++){
    for(let j = 0;j<nums2.length;j++){
      const item = [nums1[i],nums2[j]];
      // 只有当堆中元素数量小于k个或者当前数对之和小于堆顶元素时才插入堆中
      if(heap.size<k || compare(heap.top(),item)){
        heap.push(item);
      }else{
        // 如果当前数对大于堆顶元素，那么本次循环后续数对也一定大于堆顶元素，退出当前循环
        break;
      }
    }
  }
  // 返回堆中保存数对
  return heap.arr;
};