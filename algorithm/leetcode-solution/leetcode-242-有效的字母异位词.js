var isAnagram = function(s, t) {
  const lens = s.length,
  lent = t.length;
  // 判断长度是否相等
  if(lens !== lent) return false;
  // map记录出现的字符及其数量
  const maps = new Map(),
  mapt = new Map();
  for(let i = 0;i<lens;i++){
      let cur = s[i]
      if(maps.has(cur)){
          maps.set(cur,maps.get(cur)+1)
      }else{
          maps.set(cur,1)
      }

      cur = t[i]
      if(mapt.has(cur)){
          mapt.set(cur,mapt.get(cur)+1)
      }else{
          mapt.set(cur,1)
      }
  }
  // 对比两个map是否相等
  for(let item of maps){
      if(mapt.get(item[0])!== item[1]) return false;
      maps.delete(item[0])
      mapt.delete(item[0])
  }
  // 如果两个map均为空，则说明是互为字母异位词
  return maps.size===0 && mapt.size===0
};