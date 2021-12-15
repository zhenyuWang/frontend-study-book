var splitListToParts = function(head, k) {
  // 获取链表长度
  let cur = head,
  len = 0;
  while(cur){
    len++;
    cur = cur.next;
  }
  cur = head;
  // 获取每部分基础长度
  const size = Math.floor(len/k),
  // 初始化结果数组
  res = Array(k).fill(null);
  // 获取长度需要+1的部分的数量
  let moreSize = len%k;
  for(let i = 0;i<k&&cur;i++){
    // 将剩余部分的头节点放入结果数组
    res[i] = cur;
    // 获取当前部分的长度
    let itemSize = size;
    if(moreSize){
      moreSize--;
      itemSize++;
    }
    // 获取当前部分的最后一个节点
    while(itemSize>1){
      cur = cur.next;
      itemSize--;
    }
    // 断开链表连接
    const nextHead = cur.next;
    cur.next = null;
    // 更新cur指针
    cur = nextHead;
  }
  // 返回结果数组
  return res;
};