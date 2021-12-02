var calPoints = function(ops) {
  const scores = []
  for(let i = 0;i<ops.length;i++){
    switch(ops[i]){
      case '+':
      // "+" - 表示本回合新获得的得分是前两次得分的总和
      const len = scores.length
      scores.push(scores[len-2]+scores[len-1])
      break;
      case 'D':
      // "D" - 表示本回合新获得的得分是前一次得分的两倍
      scores.push(scores[scores.length-1]*2)
      break;
      case 'C':
      // "C" - 表示前一次得分无效，将其从记录中移除
      scores.pop();
      break;
      default:
      // 其他情况记录分数
      scores.push(ops[i]*1)
      break;
    }
  }
  // 求得分数总和
  let res = 0;
  for(let i = 0;i<scores.length;i++){
    res += scores[i]
  }
  return res;
};