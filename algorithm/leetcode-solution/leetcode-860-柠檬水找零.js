var lemonadeChange = function(bills) {
  // 记录5美元面值钞票数量
  let num5 = 0,
  // 10美元面值钞票数量
  num10 = 0;
  // 遍历每次交易
  for(let i = 0;i<bills.length;i++){
    switch(bills[i]){
      // 如果5美元，直接收了
      case 5:
      num5++;
      break;
      // 如果10美元
      case 10:
      // 判断是否有5美元找零
      if(num5){
        num5--;
        num10++;
        // 没有返回 false
      }else return false;
      break;
      // 如果20美元
      case 20:
      // 首先尝试10+5找零
      if(num5&&num10){
        num5--;
        num10--;
        // 再尝试5*3找零
      }else if(num5>=3){
        num5 -= 3;
        // 无法找零，返回false
      }else return false;
    }
  }
  // 所有交易都可以完成，返回true
  return true;
};