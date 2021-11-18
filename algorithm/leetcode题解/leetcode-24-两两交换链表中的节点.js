// 递归处理

// 将传入链表的第一，第二个节点交换，并递归处理后续链表
function swap(head){
  // 如果链表节点数量不够2个，直接返回
  if(head===null || head.next===null) return head;
  // 记录后续链表的头节点
  const nextHead = head.next.next,
  vhead = new ListNode(0);
  // 记录要返回的头节点
  vhead.next = head.next;
  // 交换两个节点
  head.next.next = head;
  // 将后续链表处理后返回的头节点连接到交换后第二个节点的后面
  head.next = swap(nextHead)
  // 返回交换后的头节点
  return vhead.next;
}
var swapPairs = function(head) {
  // 调用swap完成链表节点两两交换
  return swap(head);
};