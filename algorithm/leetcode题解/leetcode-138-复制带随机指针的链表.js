var copyRandomList = function(head) {
  // 特判
  if(head === null) return null;
  // 在每个节点后面复制一个节点
  let pre = head,
  next = pre.next;
  while(pre){
    pre.next = new Node(pre.val,next);
    pre = next;
    next = pre?pre.next:null;
  }
  // 给复制的节点链接 random
  pre = head,next = pre.next;
  while(next){
    next.random = pre.random?pre.random.next:null;
    pre = next.next;
    next = pre?pre.next:null;
  }
  // 拆分链表
  pre = head,next = pre.next;
  const vhead = new Node(0);
  vhead.next = next;
  while(next){
    pre.next = next.next;
    pre = pre.next;
    next.next = pre?pre.next:null;
    next = next.next;
  }
  // 返回拆分后的链表
  return vhead.next;
};