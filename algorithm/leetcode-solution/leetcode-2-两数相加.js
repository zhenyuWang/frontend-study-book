// 1. 创建虚拟头节点用来返回结果链表
// 2. 创建 num 变量记录之前节点的和值的进位数值
// 3. 当传入链表至少一个不为空的时候，遍历链表，得到当前循环的和值 sum = (l1?li.val:0) + (l2?l2.val:0) + num
// 4. 根据 sum 创建下一个节点 `new ListNode(sum%10)
// 5. 记录进位数值 num = Math.floor(sum/10)
// 6. 将结果链表、l1 、 l2 走向后走一位（如果某个链表为空，则指向 null）
// 7. 当两个链表都为空后，判断此时进位数值是否不为零，如果不为零，则根据进位数值节点连接到结果链表末尾
// 8. 返回结果链表的头节点
var addTwoNumbers = function(l1, l2) {
  const vhead = new ListNode(0);
  let num = 0,
  cur = vhead;
  while(l1||l2){
    const sum = (l1?l1.val:0)+(l2?l2.val:0)+num;
    cur.next = new ListNode(sum%10)
    num = Math.floor(sum/10);
    cur = cur.next;
    l1 = l1?l1.next:null;
    l2 = l2?l2.next:null;
  }
  if(num) cur.next = new ListNode(num);
  return vhead.next;
};