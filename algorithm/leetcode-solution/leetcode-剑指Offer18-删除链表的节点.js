var deleteNode = function(head, val) {
  // 创建虚拟头节点
  let vhead = new ListNode(0),
  // pre指针初始化指向 vhead
  pre = vhead;
  // 链接虚拟头节点和输入链表
  vhead.next = head;
  // 遍历链表
  while(head){
    // 如果找到head.val=val，说明当前节点为要删除的节点
    // 通过pre.next = head.next 达到在链表中删除当前节点的目的
    if(head.val===val){
      pre.next = head.next;
      return vhead.next;
    }
    pre = pre.next;
    head = head.next;
  }
};
