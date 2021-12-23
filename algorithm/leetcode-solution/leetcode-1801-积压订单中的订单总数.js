// 封装通用堆类
class Heap {
  // 传入compare函数区分大小顶堆
  constructor(compare){
    this.arr = [];
    this.size = 0;
    this.compare = compare;
  }
  // 插入操作
  push(item){
    this.arr.push(item);
    this.size++;
    // 插入后自下向上平衡调整
    if(this.size>1){
      let cur = this.size-1,
      parent = (cur-1)>>1;
      while(cur>0&&this.compare(this.arr[parent],this.arr[cur])){
        [this.arr[parent],this.arr[cur]] =
        [this.arr[cur],this.arr[parent]]
        cur = parent,parent = (cur-1)>>1
      }
    }
  }
  // 弹出操作
  pop(){
    if(this.size === 1){
      this.size = 0;
      return this.arr.pop();
    }
    const res = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.size--;
    // 弹出后自上向下平衡调整
    let cur = 0,
    childl = 1,childr = 2;
    while(
      (childl<this.size&&this.compare(this.arr[cur],this.arr[childl])) ||
      (childr<this.size&&this.compare(this.arr[cur],this.arr[childr]))
    ){
      if(childr<this.size&&this.compare(this.arr[childl],this.arr[childr])){
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
    // 返回弹出元素
    return res;
  }
  // 获取堆顶元素
  top(){
    return this.arr[0]
  }
}

var getNumberOfBacklogOrders = function(orders) {
  // 创建大顶堆保存积压采购订单
  const buyHeap = new Heap((a,b) => a[0]<b[0]),
  // 创建小顶堆保存积压销售订单
  sellHeap = new Heap((a,b) => a[0]>b[0]);
  // 初始化积压订单总数为0
  let res = 0;
  // 遍历处理所有订单
  for(let i = 0;i<orders.length;i++){
    // 获取当前批订单价格，数量，类型
    let [price,amount,type] = orders[i]
    // 采购订单
    if(type === 0){
      // 当采购订单未被处理完成并且积压的价格最低的销售订单价格小于等于当前采购订单
      // 则匹配成功，进行处理
      while(amount&&sellHeap.size&&sellHeap.top()[0]<=price){
        // 获取积压的价格最低的销售订单
        const sellTop = sellHeap.pop();
        // 更新积压订单总数
        res -= sellTop[1]
        // 如果销售订单数量大于采购订单数量
        if(sellTop[1]>amount){
          // 更新销售订单数量
          sellTop[1] -= amount;
          // 更新采购订单数量
          amount = 0;
          // 将剩余销售订单放入积压订单
          sellHeap.push(sellTop)
          // 更新积压订单总数
          res += sellTop[1]
        }else{
          // 否则更新采购订单数量
          amount -= sellTop[1]
        }
      }
      // 如果当前批采购订单未被处理完成
      if(amount){
        // 将剩余采购订单放入积压订单
        buyHeap.push([price,amount])
        // 更新积压订单总数
        res += amount
      }
    // 销售订单
    }else{
      // 当销售订单未被处理完成并且积压的价格最高的采购订单价格大于等于当前销售订单
      // 则匹配成功，进行处理
      while(amount&&buyHeap.size&&buyHeap.top()[0]>=price){
        // 获取积压的价格最高的采购订单
        const buyTop = buyHeap.pop();
        // 更新积压订单总数
        res -= buyTop[1]
        // 如果采购订单数量大于销售订单数量
        if(buyTop[1]>amount){
          // 更新采购订单数量
          buyTop[1] -= amount;
          // 更新销售订单处理
          amount = 0;
          // 将剩余采购订单放入积压订单
          buyHeap.push(buyTop)
          // 更新积压订单总数
          res += buyTop[1]
        }else{
          // 更新销售该订单数量
          amount -= buyTop[1]
        }
      }
      // 如果当前批销售订单未被处理完成
      if(amount){
        // 将剩余销售订单放入积压订单
        sellHeap.push([price,amount])
        // 更新积压订单总数
        res += amount
      }
    }
  }
  // 返回积压订单总数对 10的9次方 + 7 取余的结果
  return res%1000000007;
};