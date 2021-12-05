var reorderList = function(head) {
  let pre = head,next = pre.next;
  // 将原链表转为双向链表
  while(next){
    next.pre = pre;
    pre = next;
    next = pre?pre.next:null;
  }
  // pre指向头节点，next指向尾节点
  next = pre,pre = head;
  // 通过将pre.next = next,next.next = pre.next实现链表的重新排列
  while(pre.next!==next && pre!==next){
    const pre_next = pre.next;
    pre.next = next;
    next.next = pre_next;
    pre = pre_next;
    next = next.pre;
  }
  // 解除链表中的环
  next.next = null;
};