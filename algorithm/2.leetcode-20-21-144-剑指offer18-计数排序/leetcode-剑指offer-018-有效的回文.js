/* 
  利用双指针两端对比字符是否相等，直到双指针相遇
*/

var isPalindrome = function(s) {
  if(s.length===1) return true;
  const reg = /[a-zA-Z0-9]/

  function check(l,r){
      while(l<r){
          while(!reg.test(s[l]) && l<r) l++
          while(!reg.test(s[r]) && l<r) r--

          if(s[l].toLocaleLowerCase() !== s[r].toLocaleLowerCase()) return false;
          else l++,r--;
      }
      return true;
  }

  return check(0,s.length-1)
};