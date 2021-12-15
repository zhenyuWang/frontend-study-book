var deleteDuplicates = function(head) {
    // 如果是空链表或者只有一个节点，不会存在重复元素，直接返回
    if(head === null || head.next === null) return head;
    // 定义两个指针
    let pre = head,next = head.next;
    // 每次next向后找到和pre val值不同的元素，链接pre=>next
    while(next){
      while(next && next.val===pre.val) next = next.next;
      pre.next = next;
      pre = pre.next;
      next = next?next.next:null;
    }
    return head;
  };