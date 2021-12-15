var partition = function(head, x) {
  // 特判链表为空或者只有一个节点，直接返回
  if(head === null || head.next === null) return head;
  // 创建虚拟头节点，存储小于X的节点组成的链表
  const smallHead = new ListNode(0),
  // 创建虚拟头节点，存储不小于X的节点组成的链表
  bigHead = new ListNode(0);
  let smallTail = smallHead,
  bigTail = bigHead,
  cur = head;
  // 遍历链表
  while(cur){
    // 如果该节点值小于X，将它连接到较小链表的末尾
    if(cur.val<x){
      smallTail.next = cur;
      smallTail = smallTail.next;
    }else{
      // 反之连接到较大链表的末尾
      bigTail.next = cur;
      bigTail = bigTail.next;
    }
    cur = cur.next;
  }
  // 将较大链表末尾节点 next 指向 null,防止结果链表成环
  bigTail.next = null;
  // 将较大链表连接到较小链表的后面
  smallTail.next = bigHead.next;
  // 返回较小链表虚拟头节点的 next
  return smallHead.next;
};