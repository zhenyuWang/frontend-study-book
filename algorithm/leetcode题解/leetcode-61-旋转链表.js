var rotateRight = function(head, k) {
  // 特判
  if(head === null || k === 0) return head;
  // 获取链表长度
  let cur = head,len = 1;
  while(cur.next){
      cur = cur.next;
      len++;
  }
  // k 如果为长度整数倍，无需操作
  if(!(k %= len)) return head;
  // 连成环
  cur.next = head;

  // 找到拆环位置
  let num = len-k;
  while(num){
      cur = cur.next;
      num--;
  }
  // 拆环前拿到拆环后头节点
  const res = cur.next;
  // 拆环
  cur.next = null;
  return res;
};