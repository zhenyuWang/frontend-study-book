var exclusiveTime = function(n, logs) {
    // 初始化结果数组
    const res = Array(n).fill(0),
    // 函数调用栈
    stack = [];
    // 遍历日志
    for(let i = 0;i<logs.length;i++){
      let [ind,status,time] = logs[i].split(':');
      ind *= 1;
      time *= 1;
      // 如果为开始日志，将函数开始时间戳压入栈
      if(status==='start') stack.push(time)
      else {
        // 计算函数本次于行时间
        const num = time-stack.pop()+1
        res[ind] += num
        // 处理栈中函数的开始时间戳
        handleStack(num)
      }
    }
    return res;
    // 处理栈中函数开始时间戳，达到对应函数运行时间减去本次函数运行时间的目的
    function handleStack(num){
      for(let i =0;i<stack.length;i++){
        stack[i]+=num;
      }
    }
  };