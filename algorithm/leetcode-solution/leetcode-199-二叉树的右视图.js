var rightSideView = function(root) {
  // 初始化结果数组
  const res = [];
  // 前序遍历，并记录当前节点的深度
  function preorder(node,deep){
    if(node === null) return;
    // 更新对应下标值为当前节点的值
    res[deep] = node.val;
    // 递归处理左子树
    preorder(node.left,deep+1);
    // 递归处理右子树
    preorder(node.right,deep+1);
  }
  preorder(root,0);
  // 返回结果数组
  return res;
};