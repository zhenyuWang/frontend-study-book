var validateStackSequences = function(pushed, popped) {
  // 创建空栈
  const stack = [];
  // 遍历入栈操作序列
  for(let i = 0;i<pushed.length;i++){
    // 将每一个元素入栈
    stack.push(pushed[i])
    // 当栈不为空且栈顶元素等于出栈操作序列的第一个元素时
    while(stack.length && stack[stack.length-1]===popped[0]){
      // 栈顶元素弹出
      stack.pop();
      // 出栈操作序列第一个元素删除
      popped.shift();
    }
  }
  // 如果栈为空且出栈序列为空，则说明两个操作序列是在空栈基础上匹配的操作序列
  return stack.length===0 && popped.length===0
};