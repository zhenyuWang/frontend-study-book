var numTrees = function(n) {
  // 初始化 整数=>种数数组
  const arr = Array(n+1).fill(0);
  arr[0] = 1,arr[1] = 1;
  // 通过现有结果推导后续结果
  for(let i = 2;i<=n;i++){
    // 获取 1~i 每一个值为根组成二叉搜索树的数量
    for(let j = 1;j<=i;j++){
      arr[i] += arr[j-1]*arr[i-j]
    }
  }
  return arr[n]
};



// 根据对称性质优化
var numTrees = function(n) {
  // 初始化 整数=>种数数组
  const arr = Array(n+1).fill(0);
  arr[0] = 1,arr[1] = 1;
  // 通过现有结果推导后续结果
  for(let i = 2;i<=n;i++){
    const mid = i>>1;
    // 获取 1~mid 每一个值为根组成二叉搜索树的数量
    for(let j = 1;j<=i;j++){
      arr[i] += arr[j-1]*arr[i-j]
    }
    // 数量 *2 获取对称后半部分的数量
    arr[i] *= 2;
    // 如果 i 为奇数，获取中间值为根的二叉搜索树的数量
    if(i%2) arr[i] += arr[mid]*arr[i-mid-1]
  }
  // 返回 n 对应二叉搜索树种数
  return arr[n]
};