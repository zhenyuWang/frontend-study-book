/* 
  遍历原链表，通过当前节点值创建链表节点，并链接到之前结果链表的前面
*/
var reverseList = function(head) {
  let vhead = null,
  cur = head;
  while(cur){
      const node = new ListNode(cur.val);
      node.next = vhead;
      vhead = node;
      cur = cur.next;
  }
  return vhead;
}

/* 
  将单链表处理为双链表
  交换头尾节点的值
  头节点向后走，尾结点向前走，直到相遇
*/
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