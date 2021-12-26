// sort
var kClosest = function(points, k) {
  // 对输入数组升序排序
  points.sort((a,b) => (a[0]*a[0]+a[1]*a[1])-(b[0]*b[0]+b[1]*b[1]))
  // 返回排序后的前 k 个元素
  return points.slice(0,k)
};

// 大顶堆
class BigHeap{
  constructor(){
    this.arr = [];
    this.size = 0;
  }
  // 插入操作
  push(item){
    this.arr.push(item);
    this.size++;
    // 插入后自下向上平衡调整
    if(this.size>1){
      let cur = this.size-1,
      parent = (cur-1)>>1;
      while(cur>0&&compare(this.arr[parent],this.arr[cur])){
        [this.arr[parent],this.arr[cur]] =
        [this.arr[cur],this.arr[parent]]
        cur = parent,parent = (cur-1)>>1;
      }
    }
  }
  // 弹出操作
  pop(){
    this.arr[0] = this.arr.pop();
    this.size--;
    // 弹出后自上向下平衡调整
    let cur = 0,childl = 1,childr = 2;
    while(
      (childl<this.size&&compare(this.arr[cur],this.arr[childl])) ||
      (childr<this.size&&compare(this.arr[cur],this.arr[childr]))
    ){
      if(childr<this.size&&compare(this.arr[childl],this.arr[childr])){
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
// compare函数
function compare(a,b){
  return (a[0]*a[0]+a[1]*a[1])<(b[0]*b[0]+b[1]*b[1])
}
var kClosest = function(points, k) {
  // 获取大顶堆实例
  const heap = new BigHeap();
  // 遍历输入数组
  for(let i = 0;i<points.length;i++){
    // 将前 k 个最小的元素保存在堆中
    if(heap.size<k || compare(points[i],heap.top())){
      heap.push(points[i])
      if(heap.size>k) heap.pop();
    }
  }
  // 返回堆中的元素
  return heap.arr;
};