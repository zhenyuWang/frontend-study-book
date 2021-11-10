/* 
  本题两个链表共有如下6中可能存在方式
  1. 两个链表在中间相交
  A=>A=>A=>A
            5=>6=>7
  B=>B=>B=>B

  2.至少一个链表为空
  A=>A=>A=>A || B=>B=>B=>B || 两个都为空

  3.在headA，headB处相交，即为同一个链表
  1=>2=>3=>4

  4.B接在A后边
  A=>A=>A=>B=>B=>B

  5.A接在B后边
  B=>B=>B=>A=>A=>A

  6.没有相交
  A=>A=>A=>A
  B=>B=>B=>B

  程序只需要判断当前两链表是以上哪种存在方式即可
*/
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