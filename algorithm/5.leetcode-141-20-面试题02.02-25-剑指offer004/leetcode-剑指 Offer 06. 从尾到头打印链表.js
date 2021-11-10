// 遍历链表，将节点值插入到结果数组开头即可
var reversePrint = function(head) {
  const ret = [];
  let cur = head;
  while(cur){
      ret.unshift(cur.val)
      cur = cur.next;
  }
  return ret;
};