/**
 * @param {string} s
 * @return {number}
 */
// M  1000
// CM 900
// D  500
// CD 400
// C  100
// XC 90
// L  50
// XL 40
// X  10
// IX 9
// V  5
// IV 4
// I  1
var romanToInt = function(s) {
  let ret = 0;
  for(let i = 0;i<s.length;i++){
      switch(s[i]){
          case 'M':
          ret += 1000
          break;
          case 'C':
          if(s[i+1]&&s[i+1]==='M'){
              ret+=900,i++
          }else if(s[i+1]&&s[i+1]==='D'){
              ret+=400,i++
          }else{
              ret+=100
          }
          break;
          case 'D':
          ret+=500
          break;
          case 'X':
          if(s[i+1]&&s[i+1]==='C'){
              ret+=90,i++
          }else if(s[i+1]&&s[i+1]==='L'){
              ret+=40,i++
          }else{
              ret+=10
          }
          break;
          case 'L':
          ret+=50
          break;
          case 'V':
          ret+=5
          break;
          case 'I':
          if(s[i+1]&&s[i+1]==='X'){
              ret+=9,i++
          }else if(s[i+1]&&s[i+1]==='V'){
              ret+=4,i++
          }else{
              ret+=1
          }
          break;

      }
  }
  return ret;
};