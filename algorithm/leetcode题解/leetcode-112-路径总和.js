var hasPathSum = function(root, targetSum) {
  // 特殊判断
  if(root === null) return false;
  // 获取路径上节点值的和值
  function getSum(root,sum){
    // 累计路径节点和值
    sum += root.val;
    // 如果当前为叶子节点 返回当前路径和值是否等于目标和值
    if(!root.left&&!root.right) return sum===targetSum;
    // 否则递归1求解左右子树路径和值是否等于目标和值
    let left = false,right = false;
    if(root.left){
      left = getSum(root.left,sum);
    }
    if(root.right){
      right = getSum(root.right,sum);
    }
    return left || right;
  }
  // 返回结果
  return getSum(root,0);
};