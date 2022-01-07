var numTrees = function(n) {
  // 初始化 整数=>种数数组
  const arr = [1,1]
  // 通过现有结果推导后续结果
  for(let i = 2;i<=n;i++){
    let num = 0;
    const mid = i>>1;
    for(let j = 0;j<mid;j++){
      num += arr[j]*arr[i-j-1]
    }
    num *= 2;
    if(i%2) num += arr[mid]*arr[i-mid-1]
    arr[i] = num;
  }
  // 返回 n 对应二叉搜索树种数
  return arr[n]
};