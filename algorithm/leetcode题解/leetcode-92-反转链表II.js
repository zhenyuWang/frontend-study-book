// 反转链表
function reverse(start,end){
    let pre = start,next = start.next;
    start.next = null;
   //  从后向前的反转next指针
    while(next!==end){
     const next_next = next.next;
     next.next = pre;
     pre = next;
     next = next_next;
    }
    next.next = pre;
    return [end,start]
 }
 var reverseBetween = function(head, left, right) {
   // 如果只有一个节点或者 left===right 则不需要反转
   if(head.next === null || left === right) return head;
   // 创建虚拟头节点
   const vhead = new ListNode(0);
   vhead.next = head;
   // 待反转区间的前一个节点
   let pre = vhead,
   // 待反转区间的头尾节点
   start = end = head;
   // 找到待反转区间
   while(right>1){
     left--,right--;
     if(left > 0){
       pre = pre.next;
       start = start.next;
     }
     end = end.next;
   }
   // 待反转区间的下一个节点
   const nextHead = end.next;
   // 反转待反转区间
   const [reverseStart,reverseEnd] = reverse(start,end);
   // 将反转后的链表区间链接到原链表中
   pre.next = reverseStart,reverseEnd.next = nextHead;
   return vhead.next;
 };