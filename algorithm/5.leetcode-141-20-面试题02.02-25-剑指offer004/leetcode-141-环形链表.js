/* 
  遍历过程中标记tag
  如果遍历过程中走到了一个有tag的节点
  说明该节点之前来过，链表有环
  否则遍历走到链表末尾，链表没有环
*/
var hasCycle = function(head) {
  if(head === null || head.next === null) return false;
  let cur = head;
  while(cur){
      if(cur.tag) return true;
      else{
          cur.tag = 'a'
          cur = cur.next;
      }
  }
  return false;
};


/* 
  运用快慢指针，快指针每次走两步，慢指针每次走一步
  当链表没有环，快指针会走到链表末尾
  如果链表有环，快指针会绕环一圈和慢指针相遇
*/
var hasCycle = function(head) {
  if(head === null || head.next === null) return false;

  let pre = head,next = head;
  while(next&&next.next){
      next = next.next.next;
      pre = pre.next;
      if(pre === next) return true;
  }
  return false;
};