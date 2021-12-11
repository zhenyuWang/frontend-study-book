var widthOfBinaryTree = function(root) {
  // 每层节点的下标数组，取模运算的值
  const arr = [],mod = 10000000007;
  // 获取每一层节点的下标
  function getNodeInd(root,deep,ind){
    if(root === null) return;
    if(!arr[deep]) arr[deep] = [];
    arr[deep].push(ind);
    getNodeInd(root.left,deep+1,(ind*2-1)%mod);
    getNodeInd(root.right,deep+1,(ind*2)%mod);
  };
  getNodeInd(root,0,1);
  // 初始化最大宽度为1
  let max = 1;
  // 遍历下标数组
  for(let i = 1;i<arr.length;i++){
    // 如果当前层节点数量大于1，计算宽度
    if(arr[i].length>1){
      max = Math.max(max,arr[i].pop()-arr[i][0]+1)
    }
  }
  // 返回结果值
  return max;
};