// 标记tag
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


// 快慢指针
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