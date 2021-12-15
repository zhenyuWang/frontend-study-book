var longestPalindrome = function(s) {
  const len = s.length,
  map = new Map();
  // 记录出现的字符及其出现次数
  for(let i = 0;i<len;i++){
      const cur = s[i]
      if(map.has(cur)){
          map.set(cur,map.get(cur)+1)
      }else{
          map.set(cur,1)
      }
  }
  // 累加每一种字符出现偶数的次数
  let total = 0;
  for(let item of map){
      if(item[1]%2) total += item[1]-1
      else total += item[1]
  }
  // 如果累加长度小于输入字符串长度
  // 为了求得最长回文串,可以在中间再放置任意字符
  if(total<len) return total+1
  // 如果total===len 说明输入字符串中每一种字符出现次数均为偶数次
  return total;
};