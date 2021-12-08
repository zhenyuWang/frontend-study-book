var partition = function(head, x) {
  // 创建较小节点链表头节点
  const smallHead = new ListNode(0),
  // 较大节点链表头节点
  bigHead = new ListNode(0);
  // 较小链表尾节点指针
  let smallTail = smallHead,
  // 较大链表尾节点指针
  bigTail = bigHead;
  // 遍历输入链表
  while(head){
    // 如果节点值小于 x,连接到较小节点链表末尾
    if(head.val<x){
      smallTail.next = head;
      smallTail = smallTail.next;
    }else{
      // 反之连接到较大节点链表末尾
      bigTail.next = head;
      bigTail = bigTail.next;
    }
    head = head.next;
  }
  // 较大链表尾节点的next指向null,防止出现环
  bigTail.next = null;
  // 将较大节点链表连接到较小节点链表后面
  smallTail.next = bigHead.next;
  // 返回较小节点链表的头节点
  return smallHead.next;
};