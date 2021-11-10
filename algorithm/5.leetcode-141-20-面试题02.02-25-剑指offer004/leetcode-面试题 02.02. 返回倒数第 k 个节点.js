/* 
  运用双指针，next指针首先向后走k步
  然后两个指针一起向后走，知道next指针走到链表末尾
  此时pre指针所在的节点，就是倒数第k个节点
*/
var kthToLast = function(head, k) {
  let pre = head,next = head;
  while(k){
      next = next.next,k--
  }
  while(next){
      next = next.next;
      pre = pre.next;
  }
  return pre.val;
};