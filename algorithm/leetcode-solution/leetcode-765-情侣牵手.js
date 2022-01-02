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