var isValid = function(s) {
    // 创建栈存储左括号
    const stack = [],
    // 利用obj维护对应关系
    obj = {
      ')':'(',
      ']':'[',
      '}':'{'
    }
    // 遍历字符串
    for(let i = 0;i<s.length;i++){
      switch(s[i]){
        // 如果为左括号，入栈
        case '(':
        case '[':
        case '{':
          stack.push(s[i])
        break;
        // 如果为右括号，判断当前栈顶字符是否是其对应左括号，如果不是，返回 false
        case ')':
        case ']':
        case '}':
          if(stack.length === 0 || stack.pop() !== obj[s[i]]) return false;
        break;
      }
    }
    // 代码来到这里遍历过程中所有右括号都匹配到了对应的左括号
    // 此时如果栈为不为空，说明左括号存在多余情况，反之说明输入字符串有效
    return stack.length === 0
  };