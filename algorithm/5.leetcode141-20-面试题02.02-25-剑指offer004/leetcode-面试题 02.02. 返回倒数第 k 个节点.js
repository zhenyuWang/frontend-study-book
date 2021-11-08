var kthToLast = function(head, k) {
  let pre = head,next = head;
  while(k){
      next = next.next,k--
  }
  while(next){
      next = next.next;
      pre = pre.next;
  }
  return pre.val;
};