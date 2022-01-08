var sortList = function(head) {
  // 特判输入链表为空，返回空
  if(head === null) return null;
  // 初始化数组存储链表中的节点值
  const arr = [];
  while(head){
    arr.push(head.val);
    head = head.next;
  }
  // 对节点值数组升序排序
  arr.sort((a,b) => a-b)
  // 根据排序数组构造结果链表
  head = new ListNode(arr[0])
  let cur = head;
  for(let i = 1;i<arr.length;i++){
    cur.next = new ListNode(arr[i])
    cur = cur.next;
  }
  // 返回结果链表
  return head;
};