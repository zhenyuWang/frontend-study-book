
var detectCycle = function(head) {
  // 如果是空链表，肯定没有环，返回 null
  if(head === null) return null;
  // 遍历链表
  while(head){
    // 如果该链表已经遍历过，返回该节点
    if(head.tag) return head;
    // 否则给节点加上标记
    head.tag = 'been'
    head = head.next;
  }
  // 如果遍历走到了链表末尾，返回 null
  return null;
};