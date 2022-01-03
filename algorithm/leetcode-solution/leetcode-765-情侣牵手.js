var minSwapsCouples = function(row) {
  // 初始化操作次数为 0
  let res = 0;
  // 遍历输入数组
  for(let i = 0;i<row.length;i+=2){
    // 如果当前一组座位上的两人不是情侣
    if(Math.abs(row[i]-row[i+1])!==1||(row[i]>>1!==row[i+1]>>1)){
      // 固定一个座位的人，将另一个座位上的人换成对的人，并记录操作次数
      targetVal = row[i]+1;
      if(row[i]%2) targetVal = row[i]-1;
      row[row.indexOf(targetVal)] = row[i+1]
      row[i+1] = targetVal
      res++;
    }
  }
  // 返回结果
  return res;
};

// for循环优化indexOf
var minSwapsCouples = function(row) {
  const len = row.length;
  let res = 0;
  for(let i = 0;i<len;i+=2){
    if(Math.abs(row[i]-row[i+1])!==1||(row[i]>>1!==row[i+1]>>1)){
      targetVal = row[i]+1;
      if(row[i]%2) targetVal = row[i]-1;
      let targetValInd;
      for(let j = i+2;j<len;j++){
        if(row[j]===targetVal){
          targetValInd = j;
          break;
        }
      }
      row[targetValInd] = row[i+1]
      row[i+1] = targetVal
      res++;
    }
  }
  return res;
};

// Map优化indexOf
var minSwapsCouples = function(row) {
  const len = row.length,map = new Map();
  for(let i = 0;i<len;i++){
    map.set(row[i],i)
  }
  let res = 0;
  for(let i = 0;i<len;i+=2){
    if(Math.abs(row[i]-row[i+1])!==1||(row[i]>>1!==row[i+1]>>1)){
      targetVal = row[i]+1;
      if(row[i]%2) targetVal = row[i]-1;
      let targetValInd = map.get(targetVal);
      map.set(targetVal,i+1)
      map.set(row[i+1],targetValInd)
      row[targetValInd] = row[i+1]
      row[i+1] = targetVal
      res++;
    }
  }
  return res;
};