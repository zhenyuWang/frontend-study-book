var flatten = function (head) {
  let cur = head
  // 扫描当前链表
  while (cur) {
    // 如果当前节点有子链表
    if (cur.child) {
      // 获取下一个节点
      const next = cur.next,
        // 递归处理子链表并获取处理后的链表的头节点
        cHead = flatten(cur.child)
      // 将当前节点的子链表置空
      cur.child = null
      // 将处理后的子链表的头节点接在当前节点的后面
      ;(cur.next = cHead), (cHead.prev = cur)
      // cur 指针走到子链表的末尾节点
      while (cur.next) cur = cur.next
      // 将下一个节点接在子链表的末尾节点后面
      if (next) {
        cur.next = next
        next.prev = cur
      }
    }
    // 继续向后处理链表节点
    cur = cur.next
  }
  // 返回处理后的链表的头节点
  return head
}
