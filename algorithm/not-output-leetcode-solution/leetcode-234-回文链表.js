var isPalindrome = function (head) {
  // 特判如果链表只有一个节点，返回 true
  if (head.next === null) return true
  // 将链表转为双向链表
  let pre = head,
    next = head.next
  while (next) {
    next.pre = pre
    pre = pre.next
    next = next.next
  }
  // 将 next 指向尾节点
  next = pre
  // 对比 head指针和 next指针的节点值是否相等
  // 如果相等，则当前位置合法，head指针向后走，next指针向前走
  // 如果不相等，则说明不是回文链表，返回 false
  do {
    if (head.val !== next.val) return false
    head = head.next
    next = next.pre
  } while (head !== next && head.pre !== next)
  // 当两指针相遇都合法，则链表是回文链表，返回true
  return true
}
