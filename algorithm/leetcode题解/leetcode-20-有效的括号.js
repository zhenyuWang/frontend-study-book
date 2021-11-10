/*
  利用栈存储左括号，当碰到右括号的时候，判断栈顶值是否是与之匹配的左括号，如果是，弹出栈顶元素，否则返回false
  最后如果栈为空，则证明没有多余的左括号，返回true，否则返回false
*/
var isValid = function(s) {
  const stack = [],
  obj = {
      ')':'(',
      ']':'[',
      '}':'{'
  }
  for(let i = 0;i<s.length;i++){
      switch(s[i]){
          case '(':
          case '[':
          case '{':
              stack.push(s[i])
          break;
          case ')':
          case ']':
          case '}':
              if(stack.length === 0 || stack.pop() !== obj[s[i]]) return false;
          break;
      }
  }
  return stack.length===0
};