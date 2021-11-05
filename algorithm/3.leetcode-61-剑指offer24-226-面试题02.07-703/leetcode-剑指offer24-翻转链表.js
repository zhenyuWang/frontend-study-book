var reverseList = function(head) {
  let vhead = null,
  cur = head;
  while(cur){
      const node = new ListNode(cur.val);
      node .next = vhead;
      vhead = node;
      cur = cur.next;
  }
  return vhead;
}

var reverseList = function(head) {
  if(head === null) return null;
  let pre = head,
  next = head.next;
  while(next){
      next.pre = pre;
      pre = pre.next;
      next = next.next;
  }
  next = pre,pre = head;
  while(next !== pre && pre.pre !== next){
      const nextVal = next.val;
      next.val = pre.val;
      pre.val = nextVal;
      pre = pre.next;
      next = next.pre;
  }
  return head;
}