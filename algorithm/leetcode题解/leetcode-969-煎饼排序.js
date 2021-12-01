var pancakeSort = function(arr) {
  // 记录操作过程的结果数组
  let res = [],
  // 当前处理位置下标
  cur = arr.length-1;
  // 从后向前处理每一个位置
  while(cur>0){
    // 如果当前位置是待处理区间的最大值，则跳过
    while(cur>0 && arr[cur] === Math.max(...arr.slice(0,cur+1))){
      cur--
    }
    if(cur===0) break;
    // 获取待处理区间的最大值
    const maxInd = arr.indexOf(Math.max(...arr.slice(0,cur+1)));
    // 如果最大值不在下标 0 位置，则将其翻转到下标 0 位置
    if(maxInd!==0){
      arr = reverse(arr,0,maxInd);
      res.push(maxInd+1)
    }
    // 通过翻转下标 0 到目标下标，将当前区间最大值翻转到目标下标
    arr = reverse(arr,0,cur);
    res.push(cur+1);
    cur--;
  }
  // 返回结果
  return res;
  // 返回数组指定区间
  function reverse(arr,left,right){
    // 获取待翻转区间
    const handleArr = arr.splice(left,right-left+1);
    // 进行翻转
    handleArr.reverse();
    // 将翻转后的区间插入原数组
    arr.splice(left,0,...handleArr)
    return arr;
  }
};