var levelOrder = function(root) {
  // 创建结果数组
  const res = [];
  // 前序遍历二叉树，并记录深度，将当前节点值放入对应数组
  function preorder(node,deep){
    if(node === null) return;
    if(!res[deep]) res[deep] = [];
    res[deep].push(node.val);
    preorder(node.left,deep+1);
    preorder(node.right,deep+1);
  }
  preorder(root,0);
  // 返回结果
  return res;
};