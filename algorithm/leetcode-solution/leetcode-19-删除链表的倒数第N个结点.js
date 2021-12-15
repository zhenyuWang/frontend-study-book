var removeNthFromEnd = function(head, n) {
    // 特判 如果链表只有一个节点，则 n 必然为1，此时删除倒数第一个节点后链表为空
    if(head.next === null) return null;
    // 创建虚拟头节点
    const vhead = new ListNode(0);
    vhead.next = head;
    // 定义三个指针
    let pre = vhead,
    target = head,
    next = head;
    // next向后走n步
    while(n){
      n--;
      next = next.next;
    }
    // 当next不为空的时候，三个指针一起向后走
    while(next){
      pre = pre.next;
      target = target.next;
      next = next.next;
    }
    // 此时target指向的就是倒数第n个节点
    // 通过将pre.next指向target.next的方法从链表中删除target
    pre.next = target.next;
    return vhead.next;
  };