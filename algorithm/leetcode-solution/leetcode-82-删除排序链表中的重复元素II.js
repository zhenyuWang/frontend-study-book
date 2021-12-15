var deleteDuplicates = function(head) {
    // 特判 链表为空或者只有一个节点，直接返回原链表
    if(head === null || head.next === null) return head;
    // 因为头节点也可能被删除，创建虚拟头节点方便操作
    const vhead = new ListNode(0);
    vhead.next = head;
    // 定义三个指针
    // 重复元素的前一个节点
    let pre = vhead,
    // 重复元素
    cur = head,
    // 重复元素的后一个节点
    next = head.next,
    // 当前是否找到了重复元素
    tag = false;
    // 遍历链表
    while(next){
      // 当 next 不为空并且next的值等于 cur 的值,一直向后走
      while(next && next.val === cur.val){
        // 标记当前 cur 是重复元素
        tag = true;
        next = next.next;
      }
      // 如果 tag 为 true 说明当前 cur 为重复元素，next 为第一个不等于 cur 的元素
      if(tag){
        pre.next = next;
        cur = next;
        next = next?next.next:null;
        tag = false;
      }else{
        // 否则一起向后走，遍历链表
        pre = pre.next;
        cur = cur.next;
        next = next?next.next:null;
      }
    }
    return vhead.next;
  };