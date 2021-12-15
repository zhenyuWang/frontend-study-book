var detectCycle = function(head) {
  // 遍历链表
  while(head){
    // 如果当前节点有tag,说明之前遍历过，返回该节点
    if(head.tag) return head;
    // 反之给节点打上tag
    head.tag = 'been';
    head = head.next;
  }
  // 如果遍历完链表没有遇到之前遍历过的节点，说明链表没有环，返回null
  return null;
};