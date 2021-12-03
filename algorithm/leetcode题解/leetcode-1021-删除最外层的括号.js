var removeOuterParentheses = function(s) {
  // 记录左括号数量
  let l = 0,
  // 记录右括号数量
  r = 0,
  本次区间开始下标
  left = 0,
  // 结果字符串
  res = '';
  // 遍历输入字符串
  for(let i = 0;i<s.length;i++){
    // 更新左右括号数量
    if(s[i]==='(') l++;
    else r++;
    // 当左右括号数量相同，说明此时找到了最外层括号
    if(l===r){
      // 截取当前最外层括号的内部字符串
      res += s.substring(left+1,i);
      // 重置左右括号数量为0
      l = 0;
      r = 0;
      // 更新开始下标为下一个最外层括号的开始下标
      left = i+1;
    }
  }
  // 返回结果字符串
  return res;
};