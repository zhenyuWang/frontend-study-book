var getKthFromEnd = function(head, k) {
  let next = head;
  // next指针向后走k步
  while(k){
    next = next.next;
    k--;
  }
  // head next 指针一起向后走直到next走到链表末尾
  // 此时head指向倒数第k个节点
  while(next){
    head = head.next;
    next = next.next;
  }
  return head;
};