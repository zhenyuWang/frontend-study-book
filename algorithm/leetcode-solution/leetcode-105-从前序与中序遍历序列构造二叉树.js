var buildTree = function(preorder, inorder) {
  // 如果前序遍历序列为空，返回空
  if(preorder.length === 0) return null;
  // 创建子树根节点
  const root = new TreeNode(preorder.shift()),
  // 获取根节点值在中序遍历序列的下标
  ind = inorder.indexOf(root.val);
  // 通过根节点值在中序遍历序列的下标，截取左子树前序遍历，中序遍历序列，创建左子树
  root.left = buildTree(preorder.splice(0,ind),inorder.splice(0,ind));
  // 根据剩余部分截取右子树前序遍历，中序遍历序列，创建右子树
  root.right = buildTree(preorder,inorder.splice(1));
  // 返回根节点
  return root;
};



var buildTree = function(preorder, inorder) {
  // 传入前序遍历序列开始下标，结束下标，中序遍历序列开始下标
  function build(preStart,preEnd,inStart){
    // 如果前序遍历序列开始下标大于结束下标，说明区间处理完成，返回 null
    if(preStart>preEnd) return null;
    // 通过前序遍历开始下标值构建根节点
    const root = new TreeNode(preorder[preStart]),
    // 获取根节点值在中序遍历序列的下标
    ind = inorder.indexOf(root.val),
    // 获取中序遍历左子树的长度
    leftSize = ind-inStart;
    // 递归的构建左右子树
    root.left = build(preStart+1,preStart+leftSize,inStart);
    root.right = build(preStart+leftSize+1,preEnd,ind+1);
    return root;
  }
  // 返回构建后二叉树的根节点
  return build(0,preorder.length-1,0)
};