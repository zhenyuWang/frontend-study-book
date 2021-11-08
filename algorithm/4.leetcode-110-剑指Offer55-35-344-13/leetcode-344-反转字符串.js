// reverse
var reverseString = function(s) {
  return s.reverse();
};

// 双指针
var reverseString = function(s) {
  if(s.length===1) return s;
  let l = 0,r = s.length-1;
  while(l<r){
      [s[l],s[r]] = [s[r],s[l]]
      l++,r--;
  }
  return s;
};

// 一半循环
var reverseString = function(s) {
  if(s.length===1) return s;
  const len = s.length;
  for(let i = 0;i<len>>1;i++){
      [s[i],s[len-1-i]] = [s[len-1-i],s[i]]
  }
  return s;
};