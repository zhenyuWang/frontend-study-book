var mergeTwoLists = function(l1, l2) {
  if(l1===null && l2===null) return null;
  const head = new ListNode(0)
  let cur = head,tail1 = l1,tail2 = l2;
  while(tail1&&tail2){
      if(tail1.val<tail2.val){
          cur.next = tail1;
          tail1 = tail1.next;
      }else{
          cur.next = tail2;
          tail2 = tail2.next;
      }
      cur = cur.next;
  }
  if(tail1) cur.next = tail1;
  else cur.next = tail2;
  return head.next;
};