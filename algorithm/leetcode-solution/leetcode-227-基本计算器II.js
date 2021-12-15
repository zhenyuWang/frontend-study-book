// 获取字符权重
function level(operater){
    switch(operater){
      case '+':
      case '-':
      return 1;
      case '*':
      case '/':
      return 2;
      case '@':
      return -1;
      default:
      return 0;
    }
  }
  // 运算
  function calc(num1,operater,num2){
    switch(operater){
      case '+':
      return num1+num2
      case '-':
      return num1-num2;
      case '*':
      return num1*num2;
      case '/':
      return Math.floor(num1/num2)
    }
  }
  var calculate = function(s) {
    // 运算符栈
    const operaters = ['@'],
    // 数值栈
    nums = [];
    // 当前数值
    let num = 0;
    for(let i = 0;i<s.length;i++){
      // 空格跳过
      if(s[i]===' ') continue;
      // 如果是数字，更新当前数值
      if(level(s[i])===0){
        num = num*10+s[i]*1
      }else{
        // 如果是运算符，将数值入栈
        nums.push(num);
        num = 0;
        // 当栈中有权重大于等于当前运算符的值时，进行运算
        while(level(operaters[operaters.length-1])>=level(s[i])){
          const num2 = nums.pop(),
          num1 = nums.pop(),
          operater = operaters.pop();
          nums.push(calc(num1,operater,num2)) 
        }
        // 将本次运算符入栈
        operaters.push(s[i])
      }
    }
    // 将最后一个数值入栈
    nums.push(num);
    // 因为入栈的过程保证了后面的运算符权重更高
    // 所以可以从后向前的进行运算
    while(operaters.length>1){
      const num2 = nums.pop(),
      num1 = nums.pop(),
      operater = operaters.pop();
      nums.push(calc(num1,operater,num2)) 
    }
    return nums[0]
  };