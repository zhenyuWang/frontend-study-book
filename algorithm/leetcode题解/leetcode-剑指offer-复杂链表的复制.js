var copyRandomList = function(head) {
  // 特判
  if(head === null) return null;
  let pre = head,next = pre.next;
  // 复制节点
  while(pre){
    pre.next = new Node(pre.val);
    pre.next.next = next;
    pre = next;
    next = pre?pre.next:null;
  }
  // 处理复制后节点的random
  pre = head,next = pre.next;
  while(next){
    next.random = pre.random?pre.random.next:null;
    pre = next.next;
    next = pre?pre.next:null;
  }
  // 获取结果链表的头节点
  const res = head.next;
  // 拆分链表
  pre = head,next = pre.next;
  while(next){
    pre.next = next.next;
    pre = pre.next;
    next.next = pre?pre.next:null;
    next = next.next
  }
  return res;
};