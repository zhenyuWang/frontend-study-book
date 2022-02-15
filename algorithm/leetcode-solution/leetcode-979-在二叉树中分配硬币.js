var distributeCoins = function (root) {
  // 初始化结果值为 0
  let res = 0
  // 前序遍历二叉树
  function preorder(node) {
    // 如果当前节点为空节点，不需要操作次数，返回 0
    if (node === null) return 0
    // 获取左右子树返回的值，对应其多余或需要的硬币数量
    const l = preorder(node.left),
      r = preorder(node.right),
      // 计算当前结点多余或所需的硬币数量
      step = l + r + node.val - 1
    // 记录操作次数
    res += Math.abs(step)
    // 返回当前节点值
    return step
  }
  // 调用前序遍历处理二叉树
  preorder(root)
  // 返回结果值
  return res
}
