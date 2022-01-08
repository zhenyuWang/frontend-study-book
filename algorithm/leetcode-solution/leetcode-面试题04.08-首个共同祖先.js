var lowestCommonAncestor = function(root, p, q) {
  // 创建变量保存结果值
  let res;
  // 后续遍历二叉树
  function postorder(node){
    // 如果当前节点为空，返回false
    if(node === null) return false;
    // 获取左右子树返回值
    const l = postorder(node.left),
    r = postorder(node.right);
    if(
      // 如果当前节点为目标节点，并且在左子树或者右子树中找到了另一个目标节点，则当前节点为最近的公共祖先
      (node === p || node === q)&&(l || r) ||
      // 如果左子树找到了一个目标节点，并且右子树找到了另一个目标节点，则当前节点为最近的公共祖先
      (l && r)
    ){
      res = node;
    }
    // 如果当前节点为目标节点，或者其子树中找到了目标节点，返回 true,否则返回 false
    return node === p || node === q || l || r || false
  }
  postorder(root);
  return res;
};