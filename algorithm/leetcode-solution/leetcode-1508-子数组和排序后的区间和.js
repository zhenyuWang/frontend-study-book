var rangeSum = function(nums, n, left, right) {
  // 初始化子数组和数组
  const sums = []
  // 双层遍历，获取所有子数组和
  for(let i = 0;i<n;i++){
    let sum = nums[i];
    sums.push(sum);
    for(let j = i+1;j<n;j++){
      sum += nums[j];
      sums.push(sum)
    }
  }
  // 子数组和升序排序
  sums.sort((a,b) => a-b)
  // 累加区间和
  let res = 0;
  for(let i = left-1;i<right;i++){
    res += sums[i]
  }
  // 返回区间和取模结果
  return res%1000000007
};


// 小顶堆+多路归并
var rangeSum = function(nums, n, left, right) {
  // 创建小顶堆实例
  const heap = new Heap()
  // 首先将每一路的第一个值放入堆中
  for(let i = 0; i < n; i++) heap.push({i,j:i,sum:nums[i]})
  // 初始化结果值
  let res = 0
  // 从 1-right 遍历，获取前 right 个子数组和值
  for(let i = 1; i <= right; i++) {
    // 获取当前未处理的子数组和值的最小值
    const min = heap.pop()
    // 如果当前处于 left-right 区间，则累加结果值
    if(i >= left) res += min.sum
    // 根据当前元素，推导所在路的下一个元素，插入堆中
    if(min.j<n-1) heap.push({i:min.i, j:min.j + 1, sum:min.sum + nums[min.j + 1]})
  }
  // 返回结果
  return res%1000000007
};
// 小顶堆
class Heap {
  constructor() {
    // 初始化数组和size
    this.arr = [];
    this.size = 0;
  }
  // 插入操作
  push(item) {
    this.arr.push(item);
    this.size++;
    // 插入后的自下向上平衡调整
    if(this.size>1){
      let cur = this.size-1,
      parent = (cur-1)>>1;
      while(cur>0 && this.arr[parent].sum>this.arr[cur].sum){
        [this.arr[parent],this.arr[cur]] = [this.arr[cur],this.arr[parent]]
        cur = parent,parent = (cur-1)>>1;
      }
    }
  }
  // 弹出操作
  pop() {
    // 特殊处理弹出最后一个元素
    if(this.arr.length===1){
      this.size--;
      return this.arr.pop()
    }
    const res = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.size--;
    // 弹出后的自上向下平衡调整
    let cur = 0,childl = 1,childr = 2;
    while(
      (childl<this.size && this.arr[childl].sum<this.arr[cur].sum) ||
      (childr<this.size && this.arr[childr].sum<this.arr[cur].sum)
    ){
      if(childr<this.size && this.arr[childr].sum<this.arr[childl].sum){
        [this.arr[cur],this.arr[childr]] = [this.arr[childr],this.arr[cur]]
        cur = childr
      }else{
        [this.arr[cur],this.arr[childl]] = [this.arr[childl],this.arr[cur]]
        cur = childl
      }
      childl = cur*2+1,childr = cur*2+2;
    }
    return res;
  }
}