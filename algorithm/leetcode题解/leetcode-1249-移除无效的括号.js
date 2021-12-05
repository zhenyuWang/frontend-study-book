var minRemoveToMakeValid = function(s) {
  // 初始化栈，存储左括号下标
  const stack = [];
  // 遍历输入字符串
  for(let i = 0;i<s.length;i++){
    // 如果是左括号，将下标入栈
    if(s[i]==='('){
      stack.push(i)
    }else if(s[i]===')'){
      // 如果是右括号
      // 如果栈不为空，说明栈顶左括号为该右括号对应左括号，将栈顶元素弹出
      if(stack.length) stack.pop();
      // 如果栈为空，说明当前右括号为多余右括号，将其删除
      else{
        s = s.substring(0,i)+s.substring(i+1);
        i--;
      }
    }
  }
  // 遍历完后，如果栈不为空，说明栈中为多余左括号的下标，将对应字符删除
  while(stack.length){
    const ind = stack.pop();
    s = s.substring(0,ind)+s.substring(ind+1)
  }
  // 返回处理后的字符串
  return s;
};