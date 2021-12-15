// 小顶堆实现
class MinHeap {
  constructor(){
    this.arr = [];
    this.size = 0;
  }
  push(node){
    this.arr.push(node);
    this.size++;
    if(this.size>1){
      let cur = this.size-1,
      parentInd = (cur-1)>>1;
      while(cur>0&&this.arr[parentInd].val>this.arr[cur].val){
        [this.arr[parentInd],this.arr[cur]] = 
        [this.arr[cur],this.arr[parentInd]];
        cur = parentInd,parentInd = (cur-1)>>1;
      }
    }
  }
  pop(){
    if(this.empty()) return false;
    const res = this.arr[0]
    this.arr[0] = this.arr.pop();
    this.size--;
    let cur = 0,
    childl = 1,
    childr = 2;
    while(
      (childl<this.size&&this.arr[childl].val<this.arr[cur].val)||
      (childr<this.size&&this.arr[childr].val<this.arr[cur].val)
    ){
      if(childr<this.size&&this.arr[childr].val<this.arr[childl].val){
        [this.arr[cur],this.arr[childr]] = 
        [this.arr[childr],this.arr[cur]];
        cur = childr;
      }else{
        [this.arr[cur],this.arr[childl]] = 
        [this.arr[childl],this.arr[cur]];
        cur = childl;
      }
      childl = cur*2+1,childr = cur*2+2;
    }
    return res;
  }
  empty(){
    return this.size === 0
  }
}
var mergeKLists = function(lists) {
  // 初始化小顶堆
  const heap = new MinHeap();
  // 将链表数组中的每个节点push到小顶堆中
  for(let i = 0;i<lists.length;i++){
    if(lists[i]===null) continue;
    while(lists[i]){
      heap.push(lists[i]);
      lists[i] = lists[i].next;
    }
  }
  const vhead = new ListNode(0);
  let cur = vhead;
  // 当堆不为空的时候，取出堆顶元素组成结果链表
  while(!heap.empty()){
    cur.next = heap.pop();
    cur = cur.next;
  }
  cur.next = null;
  return vhead.next;
};


// sort排序解题
var mergeKLists = function(lists) {
  // 初始化数组
  const arr = [];
  // 遍历链表数组，将每个节点的值push到arr中
  for(let i = 0;i<lists.length;i++){
    if(lists[i]===null) continue;
    while(lists[i]){
      arr.push(lists[i].val);
      lists[i] = lists[i].next;
    }
  }
  // arr sort 排序
  arr.sort((a,b) => a-b)
  // 遍历arr,生成结果链表
  const vhead = new ListNode(0);
  let cur = vhead;
  for(let i = 0;i<arr.length;i++){
    cur.next = new ListNode(arr[i])
    cur = cur.next;
  }
  return vhead.next;
};