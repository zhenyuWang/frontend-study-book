// sort
var frequencySort = function(s) {
  // 利用map存储出现的字符及其出现次数
  const map = new Map();
  for(let i = 0;i<s.length;i++){
    if(map.has(s[i])){
      map.set(s[i],map.get(s[i])+1)
    }else{
      map.set(s[i],1)
    }
  }
  // 将结果转为数组存储
  const arr = [];
  map.forEach((val,key) => {
    arr.push({val,key})
  })
  // 根据出现次数降序排序
  arr.sort((a,b) => b.val-a.val)
  // 根据排序后的数组组装结果字符串
  let res = '';
  for(let i = 0;i<arr.length;i++){
    res += arr[i].key.repeat(arr[i].val)
  }
  return res;
};


// 大顶堆
class BigHeap {
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
      while(cur>0&&this.arr[parent].val<this.arr[cur].val){
        [this.arr[parent],this.arr[cur]] =
        [this.arr[cur],this.arr[parent]]
        cur = parent,parent = (cur-1)>>1;
      }
    }
  }
  // 弹出操作
  pop(){
    if(this.size===1){
      this.size = 0;
      return this.arr.pop();
    }
    const res = this.arr[0]
    this.arr[0] = this.arr.pop();
    this.size--;
    // 弹出后自上向下平衡调整
    let cur = 0,childl = 1,childr = 2;
    while(
      (childl<this.size&&this.arr[cur].val<this.arr[childl].val) ||
      (childr<this.size&&this.arr[cur].val<this.arr[childr].val)
    ){
      if(childr<this.size&&this.arr[childl].val<this.arr[childr].val){
        [this.arr[cur],this.arr[childr]] =
        [this.arr[childr],this.arr[cur]]
        cur = childr
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
var frequencySort = function(s) {
  // 利用map存储出现的字符及其出现次数
  const map = new Map();
  for(let i = 0;i<s.length;i++){
    if(map.has(s[i])){
      map.set(s[i],map.get(s[i])+1)
    }else{
      map.set(s[i],1)
    }
  }
  // 创建大顶堆实例
  const heap = new BigHeap();
  // 将获取到的每一组数据插入堆中
  map.forEach((val,key) => {
    heap.push({val,key})
  })
  // 每次弹出堆顶元素，组装结果字符串
  let res = '';
  while(heap.size){
    const item = heap.pop();
    res += item.key.repeat(item.val)
  }
  return res;
};