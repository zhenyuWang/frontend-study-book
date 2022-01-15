var buildTree = function(inorder, postorder) {
  // 根据中序遍历与后续遍历序列创建二叉树方法
  function createTree(l1,r1,l2,r2){
    // 如果区间为空，返回 null
    if(l1>r1) return null;
    // 获取根节点值
    const root = postorder[r2];
    // 根据根节点值获取中序遍历左子树区间末尾元素下标
    let tail = l1-1;
    while(tail<r1&&inorder[tail+1]!==root) tail++
    // 获取左子树区间长度
    const diff = tail-l1;
    // 根据根节点值，创建当前子树
    return new TreeNode(
      root,
      // 根据左子树中序，后续遍历序列，构造左子树
      createTree(l1,tail,l2,l2+diff),
      // 根据右子树中序，后续遍历序列，构造右子树
      createTree(tail+2,r1,l2+diff+1,r2-1)
    )
  }
  const len = inorder.length;
  // 调用创建二叉树方法，并返回结果值
  return createTree(0,len-1,0,len-1)
};