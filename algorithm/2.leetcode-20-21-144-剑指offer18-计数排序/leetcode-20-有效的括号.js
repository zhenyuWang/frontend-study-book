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