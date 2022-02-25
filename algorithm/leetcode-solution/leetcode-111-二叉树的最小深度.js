var minDepth = function (root) {
  // 如果二叉树为空，返回 0
  if (root === null) return 0
  // 因为二叉树中节点数量最多为100000，所以我们初始化结果值为100000
  let res = 100000
  // 前序遍历二叉树
  function preorder(node, d) {
    // 如果当前节点为叶子节点
    if (node.left === null && node.right === null) {
      // 尝试用它的深度更新结果值
      res = Math.min(res, d)
      return
    }
    // 否则递归处理左右子树
    if (node.left) preorder(node.left, d + 1)
    if (node.right) preorder(node.right, d + 1)
  }
  // 前序遍历二叉树，并传入根节点和初始深度1
  preorder(root, 1)
  // 返回结果值
  return res
}
