// sort 排序
var topKFrequent = function(words, k) {
  // 通过map记录出现过的单词及其出现次数
  const map = new Map();
  for(let i = 0;i<words.length;i++){
    const item = words[i];
    if(map.has(item)){
      map.set(item,map.get(item)+1)
    }else{
      map.set(item,1)
    }
  }
  // 将每一组单词及次数存入数组
  const arr = [];
  map.forEach((val,name) => {
    arr.push({name,val})
  })
  // 对数组排序
  arr.sort((a,b) => {
    if(a.val===b.val) return a.name<b.name?-1:1
    else return b.val-a.val
  })
  // 获取排序后的前k个单词
  const res = [];
  for(let i = 0;i<arr.length;i++){
    if(res.length<k) res.push(arr[i].name)
    else break;
  }
  return res;
};

//  小顶堆
class MinHeap {
  constructor(k){
    // 元素列表
    this.arr = [];
    // 元素数量
    this.size = 0;
    // 元素最大数量
    this.max = k;
  }
  // 插入元素
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
    // 维护堆中元素数量
    if(this.size>this.max) this.pop();
  }
  pop(){
    // 弹出队中最后一个元素
    if(this.size===1){
      this.size = 0;
      return this.arr.pop();
    }
    // 弹出堆中非最后一个元素
    const res = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.size--;
    // 弹出后自上向下平衡调整
    let cur = 0,
    childl = 1,childr = 2;
    while(
      (childl<this.size&&compare(this.arr[cur],this.arr[childl])) ||
      (childr<this.size&&compare(this.arr[cur],this.arr[childr]))
    ){
      if(childr<this.size&&compare(this.arr[childl],this.arr[childr])){
        [this.arr[cur],this.arr[childr]] =
        [this.arr[childr],this.arr[cur]]
        cur = childr
      }else{
        [this.arr[cur],this.arr[childl]] =
        [this.arr[childl],this.arr[cur]]
        cur = childl
      }
      childl = cur*2+1,childr = cur*2+2
    }
    return res;
  }
  // 返回堆顶元素
  top(){
    return this.arr[0]
  }
}
// 比较两组数据方法
function compare(item1,item2){
  // 出现频率相同，按字母排序
  if(item1.val===item2.val) return item2.name>item1.name
  // 否则按出现次数排序
  return item2.val<item1.val
}

var topKFrequent = function(words, k) {
  // 通过map记录出现过的单词及其出现次数
  const map = new Map();
  for(let i = 0;i<words.length;i++){
    const item = words[i];
    if(map.has(item)){
      map.set(item,map.get(item)+1)
    }else{
      map.set(item,1)
    }
  }
  // 创建小顶堆实例
  const heap = new MinHeap(k);
  // 循环map，尝试将每一组数据插入堆中
  map.forEach((val,name) => {
    const item = {name,val}
    // 如果堆中元素数量不够k个或者当前元素比堆顶元素大，再进行插入
    if(heap.size<k||compare(item,heap.top())){
      heap.push(item)
    }
  })
  // 弹出堆中元素，放入结果数组
  const res = [];
  while(heap.size){
    res.unshift(heap.pop().name)
  }
  return res;
};