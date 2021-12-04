var deleteNode = function(node) {
  // 将倒数第二个节点之前节点的val更新为它的下一个节点的val
  while(node.next.next){
    node.val = node.next.val;
    node = node.next;
  }
  // 将倒数第二个节点的val更新为尾节点的val
  node.val = node.next.val;
  // 删除链表尾节点
  node.next = null;
};