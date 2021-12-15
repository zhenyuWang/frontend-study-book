var backspaceCompare = function(s, t) {
  // 创建数组存储处理过程中的字符
  let arr = [];
  // 处理 s
  for(let i = 0;i<s.length;i++){
    if(s[i]==='#'){
      arr.pop();
    }else{
      arr.push(s[i])
    }
  }
  // 获取 s 处理后的结果
  s = arr.join('')
  // 重置 arr
  arr = [];
  // 处理 t
  for(let i = 0;i<t.length;i++){
    if(t[i]==='#'){
      arr.pop();
    }else{
      arr.push(t[i])
    }
  }
  // 返回两个字符串处理后的结果是否相同
  return s===arr.join('')
};