// 双指针交换值
var reverseList = function(head) {
    // 特判
    if(head === null || head.next === null) return head;
    let pre = head,next = head;
    // 让next走到链表末尾并记录节点的pre属性指向前一个节点
    while(next.next){
        next.next.pre = next;
        next = next.next;
    }
    // 当两个指针不想交的时候，交换两个指针的值，并让两个指针向中间走
    while(pre!==next && next.next!==pre){
        const nextVal = next.val;
        next.val = pre.val;
        pre.val = nextVal;
        pre = pre.next;
        next = next.pre;
    }
    return head;
};
// 转为双向链表后反转
  var reverseList =function(head) {
    // 特判
    if(head === null || head.next === null) return head;
    let pre = head,
    next = head.next;
    // 转为双向链表
    while(next){
      next.pre = pre;
      pre = pre.next;
      next = next.next;
    }
    // 从后向前修改next指针，完成链表反转
    next = pre;
    while(next.pre){
      next.next = next.pre;
      next = next.next;
    }
    // 将头节点的next指向null
    next.next = null;
    // 之前链表的尾节点即为反转后链表的头节点
    return pre;
};

// 遍历链表过程中完成反转
var reverseList = function(head) {
    // 特判
    if(head === null || head.next === null) return head;
    // 定义两个指针遍历链表
    let pre = head,
    next = head.next;
    // 将头节点的next指向null 因为头节点是反转后链表的尾节点
    head.next = null;
    // 当next不为空的时候，让下一个节点的next指针指向前一个节点
    while(next){
      const next_next = next.next;
      next.next = pre;
      pre = next;
      next = next_next;
    }
    // 返回原始链表的尾节点，即为反转后链表的头节点
    return pre;
  };