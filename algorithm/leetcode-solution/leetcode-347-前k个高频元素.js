// 通过小顶堆解题
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
        if(this.size>1){
            let cur = this.size-1,
            parentInd = (cur-1)>>1;
            while(cur>0 && this.arr[parentInd].val>this.arr[cur].val){
                [this.arr[parentInd],this.arr[cur]] = 
                [this.arr[cur],this.arr[parentInd]]
                cur = parentInd;
                parentInd = (cur-1)>>1;
            }
        }
        while(this.size>this.max) this.pop();
    }
    // 弹出堆顶元素
    pop(){
        if(this.empty()) return false;
        const res = this.arr[0]
        this.arr[0] = this.arr.pop();
        this.size--;
        let cur = 0,
        childl = 1,
        childr = 2;
        while(
            (childl<this.size&&this.arr[childl].val<this.arr[cur].val) ||
            (childr<this.size&&this.arr[childr].val<this.arr[cur].val)
        ){
            if(childr<this.size&&this.arr[childr].val<this.arr[childl].val){
                [this.arr[cur],this.arr[childr]] = 
                [this.arr[childr],this.arr[cur]]
                cur = childr;
            }else{
                [this.arr[cur],this.arr[childl]] = 
                [this.arr[childl],this.arr[cur]]
                cur = childl;
            }
            childl =cur*2+1,childr = cur*2+2;
        }
        return res;
    }
    // 判断堆是否为空
    empty(){
        return this.size === 0
    }
    // 返回堆顶元素
    top(){
        return this.arr[0]
    }
}

var topKFrequent = function(nums, k) {
    // map 维护数组中的值以及出现的次数
    const map = new Map();
    for(let i = 0;i<nums.length;i++){
        const cur = nums[i]
        if(map.has(cur)){
            map.set(cur,map.get(cur)+1)
        }else{
            map.set(cur,1)
        }
    }
    // 创建小顶堆维护前k个高频元素
    const heap = new MinHeap(k);
    map.forEach((val,key) => {
        if(heap.size<k || heap.top().val<val){
            heap.push({val,key})
        }
    })
    // 将堆中元素放入结果数组
    const ret = [];
    while(!heap.empty()){
        ret.push(heap.pop().key)
    }
    return ret;
};

// 通过数组排序解题

var topKFrequent = function(nums, k) {
  // map 维护数组中的值以及出现的次数
  const map = new Map();
  for(let i = 0;i<nums.length;i++){
      const cur = nums[i]
      if(map.has(cur)){
          map.set(cur,map.get(cur)+1)
      }else{
          map.set(cur,1)
      }
  }
  // 将map转为数组
  const arr = Array.from(map);
  // 根据元素出现的次数进行降序排序
  arr.sort((a,b) => b[1]-a[1])
  // 将前k个高频元素的值放到结果数组
  const ret = [];
  for(let i = 0;i<k;i++){
      ret.push(arr[i][0])
  }
  return ret;
};