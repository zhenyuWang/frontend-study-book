var maxDepth = function(root) {
  // 初始化结果值为0
  let res = 0;
  // 前序遍历每个节点
  function preorder(node,deep){
    if(node === null) return;
    // 如果当前节点不为空，尝试使用当前节点深度更新最大深度
    res = Math.max(res,deep);
    // 递归遍历左右子树
    preorder(node.left,deep+1)
    preorder(node.right,deep+1)
  }
  preorder(root,1);
  return res;
};