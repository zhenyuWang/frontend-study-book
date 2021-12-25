var maxPathSum = function(root) {
  // 初始化结果值为一个极小的值
  let max = -Infinity;
  // 递归获取每一个节点为顶点的最大路径和
  function findPathSum(node){
    if(node === null) return 0;
    const left = findPathSum(node.left),
    right = findPathSum(node.right);
    // 尝试利用当前节点为顶点的最大路径和更新结果值
    max = Math.max(max,node.val+(left>0?left:0)+(right>0?right:0));
    // 返回当前节点的最大路径和
    return node.val+Math.max(left,right,0)
  }
  findPathSum(root);
  return max;
};