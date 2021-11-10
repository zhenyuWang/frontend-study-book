var reverseKGroup = function(head, k) {
  // 如果K为1,直接返回原链表
  if(k===1) return head;

  function reverse(head,k){
    // 如果链表为空或者只有一个节点，返回head
      if(head === null || head.next === null) return head;
      let pre = head,next = head.next,cnt = k;
      // 判断链表长度
      while(cnt&&next){
          next.pre = pre;
          pre = pre.next;
          next = next.next;
          cnt--;
      }
      // 如果链表没有k个节点，返回head
      if(cnt) return head;
      // 记录剩余链表头节点
      const nextHead = next,
      // 通过虚拟头获取翻转后链表头节点
      vhead = new ListNode(0);
      // 更新next为当前k个节点尾结点，pre为头节点
      next = pre,pre = head;
      vhead.next = next;
      // 翻转链表
      while(next!==pre){
          next.next = next.pre;
          next = next.pre;
      }
      // 将后续链表翻转结果接在翻转后链表的尾结点
      next.next = reverse(nextHead,k)
      // 返回翻转后链表的头节点
      return vhead.next;
  }

  return reverse(head,k-1);
};