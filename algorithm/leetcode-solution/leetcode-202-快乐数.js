// 2 4 16 37 58 89 145 42 20 4 16 37 58 89 145 42 20 4
// 5 25 29 85 89 145 42 20 4 16 37 58 89 145 42 20 4
var isHappy = function(n) {
  const s = n+'';
  let total = 0;
  for(let i = 0;i<s.length;i++){
      total += Math.pow(s[i],2)
  }
  if(total === 1) return true;
  if(total === 4) return false;
  return isHappy(total)
};