/**
 * 校验给定字符串区间是否为回文串
 * @param {string} s
 * @param {number} l
 * @param {number} r
 * @return {boolean}
 */
function check(s,l,r){
  while(l<r){
    if(s[l]!==s[r]) return false;
    else l++,r--
  }
  return true;
}

var countSubstrings = function(s) {
  const len = s.length;
  // 因为每个字符可以是回文子串，所以初始化res为len
  let res = len;
  // 判断所有可能子串是否是回文串
  for(let i = 0;i<len-1;i++){
    for(let j = i+1;j<len;j++){
      if(check(s,i,j)) res++
    }
  }
  return res;
};


// 官方题解
var countSubstrings = function(s) {
  const n = s.length;
  let res = 0;
  // 枚举可能的回文串的中心位置，向左右扩展
  // 如果相等，则找到新的回文串，res++
  // 否则退出本次循环
  for (let i = 0; i < 2 * n - 1; i++) {
    let l = i >> 1, r = (i >> 1) + i % 2;
    while (l >= 0 && r < n && s[l] == s[r]) {
      res++,l--,r++
    }
  }
  return res;
};