var lengthOfLongestSubstring = function(s) {
  // 特判
  if(s==='') return 0;
  // 子串
  str = '',
  // 最长子串的长度
  max = 1;
  // 遍历每个字符
  for(let i = 0;i<s.length;i++){
    const ind = str.indexOf(s[i])
    // 如果该字符在子串中现过
    if(ind>-1){
      // 尝试更新最大子串长度
      max = Math.max(max,str.length)
      // 更新子串
      str = str.substr(ind+1)+s[i]
    }else{
      // 如果未出现过，累加字符串
      str += s[i]
    }
  }
  // 返回结果
  return Math.max(max,str.length);
};