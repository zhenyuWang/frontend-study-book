var addTwoNumbers = function(l1, l2) {
  // 初始化两个栈存储输入链表的数字
  const stack1 = [],
  stack2 = [];
  while(l1){
    stack1.push(l1.val);
    l1 = l1.next;
  }
  while(l2){
    stack2.push(l2.val);
    l2 = l2.next;
  }
  // 初始化进位数为0
  let carry = 0,
  res = null;
  // 每次取出栈顶值，初次栈顶值为两个链表对应数字的个位数
  // 将两个数字相加，根据和值构建结果链表
  // 因为结果链表要求数字最高位在链表头节点，而以下过程得到的数字结果为从低位到高位，所以构建结果链表的过程为倒序构建
  while(stack1.length || stack2.length){
    const sum = (stack1.pop()||0)+(stack2.pop()||0)+carry;
    const node = new ListNode(sum%10);
    carry = Math.floor(sum/10);
    node.next = res;
    res = node;
  }
  if(carry){
    const node = new ListNode(carry);
    node.next = res;
    res = node;
  }
  return res;
};