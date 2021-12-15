var swapNodes = function(head, k) {
  let pre = null,
  cur = head;
  const vhead = new ListNode(0);
  vhead.next = head;
  while(k){
    // 正数第k个节点
    if(k===1) pre = cur;
    cur = cur.next,k--;
  }
  while(cur){
    cur = cur.next;
    head = head.next;
  }
  // 倒数第k个节点
  const headVal = head.val;
  head.val = pre.val;
  pre.val = headVal;
  
  return vhead.next;
};