var preorderTraversal = function(root) {
  // 特判如果是空树，返回空数组
  if(root===null) return [];
  // 初始化结果数组 栈
  const res = [],stack = [];
  // 当当前节点不为空或者栈不为空的时候，遍历二叉树
  while(root!==null || stack.length){
    // 如果当前节点不为空，处理它的左子树
    while(root!==null){
      res.push(root.val);
      stack.push(root);
      root = root.left;
    }
    // 如果当前节点没有左子树，向上回溯处理父节点的右子树
    root = stack.pop().right;
  }
  // 返回结果数组
  return res;
};