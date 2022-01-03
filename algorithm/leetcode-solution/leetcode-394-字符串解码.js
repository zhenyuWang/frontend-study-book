// 递归解题
var decodeString = function(s) {
  // 如果当前字符串中没有中括号，不需要处理，直接返回
  if(s.indexOf('[')===-1) return s;
  // 初始化num,stack,res
  let num = 0,stack = [],res = '';
  // 遍历输入字符串
  for(let i = 0;i<s.length;i++){
    // 如果当前是左括号，将对应下标入栈
    if(s[i]==='['){
      stack.push(i);
      continue;
    }
    // 如果栈为空
    if(stack.length===0){
      // 如果是数字，组装 num
      if(!isNaN(s[i])){
        num = num*10+s[i]*1
      }else{
        // 如果是普通字符，拼接到结果字符串后
        res += s[i]
      }
      continue;
    }
    // 如果当前为右括号，将栈顶左括号弹出
    if(s[i]===']'){
      const start = stack.pop();
      // 如果栈为空，说明此时找到的是一组最外层的括号
      if(stack.length===0){
        // 截取括号中间部分并 repeat num 次，将结果递归处理，并将返回值拼接到结果字符串后
        res += decodeString(s.substring(start+1,i).repeat(num))
        // 重置num
        num = 0;
      }
    }
  }
  // 返回结果字符串
  return res;
};

// 遍历解题
var decodeString = function(s) {
  // 获取输入字符串长度并初始化栈
  const len = s.length,stack = [];
  // 遍历输入字符串
  for(let i = 0;i<len;i++){
    // 如果当前字符是数字
    if(!isNaN(s[i])){
      // 获取完整数字
      let num = s[i];
      for(let j = i+1;j<len;j++){
        if(!isNaN(s[j])){
          num = num*10+s[j]*1
        }else{
          // 将获取到的数字入栈
          stack.push(num);
          i = j-1;
          break;
        }
      }
    }else if(s[i]===']'){
      // 如果当前为右括号，将栈中字符弹出，直到遇到与之对应的左括号
      let str = '';
      while(stack.length){
        const code = stack.pop();
        if(code==='['){
          // 此时栈顶元素是该部分字符对应的 k 值，将其弹出，并将字符 repeat k 次并入栈
          stack.push(str.repeat(stack.pop()))
          break;
        }else{
          // 组装括号中间字符
          str = code+str;
        }
      }
    }else{
      // 其他情况，直接将字符入栈
      stack.push(s[i])
    }
  }
  // 最后栈中字符串拼接之后的结果，即为解码后的字符串
  return stack.join('')
};