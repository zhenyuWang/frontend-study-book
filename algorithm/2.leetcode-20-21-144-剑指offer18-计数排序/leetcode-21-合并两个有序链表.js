var mergeTwoLists = function(l1, l2) {
  // 如果给定链表都为空，返回null
  if(l1===null && l2===null) return null;
  const head = new ListNode(0)
  let cur = head,tail1 = l1,tail2 = l2;
  // 当两个链表都不为空，取更小值链接到结果链表末尾
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
  // 将不为空的链表链接到结果链表末尾
  if(tail1) cur.next = tail1;
  else cur.next = tail2;
  // 返回结果链表头节点
  return head.next;
};