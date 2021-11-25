var longestWPI = function(hours) {
    // 初始化前缀和数组
    const preSum = [0],
    // 获取工作天数
    len = hours.length;
    // 获取前缀和数组
    for(let i = 0;i<len;i++){
      preSum[i+1] = preSum[i]+(hours[i]>8?1:-1)
    }
    // 获取单调递减栈
    const stack = [0];
    for(let i = 1;i<=len;i++){
      if(preSum[i]<preSum[stack[stack.length-1]])
        stack.push(i)
    }
    // 求得表现良好的最长时间段
    let res = 0;
    for(let i = len;i>res;i--){
      while(preSum[i]>preSum[stack[stack.length-1]]){
        res = Math.max(res,i-stack.pop())
      }
    }
    return res;
  };