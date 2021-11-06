var getIntersectionNode = function(headA, headB) {
  // 某个链表为空
  if(headA === null || headB === null) return null;
  // 为同一个链表
  if(headA === headB) return headA;

  let cur = headA;
  while(cur){
      // B接在A后
      if(cur.next === headB) return headB;
      cur.tag = 'A';
      cur = cur.next;
  }

  cur = headB;
  while(cur&&!cur.tag){
      // A接在B后
      if(cur.next === headA) return headA;
      cur = cur.next;
  }
  // 中间相交或者没有相交
  return cur;
};