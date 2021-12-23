var isValidBST = function(root) {
  // 前一个节点的值 是否是合法二叉搜索树标识
  let pre = null,res = true;
  // 中序遍历
  function inorder(node){
    if(node === null) return;
    inorder(node.left);
    // 如果pre为null，说明当前是第一个节点，更新pre值为当前节点值
    if(pre === null) pre = node.val
    else{
      // 如果pre小于当前节点值，更新pre
      if(pre<node.val) pre = node.val
      else{
        // 否则说明当前节点处违反了二叉搜索树的性质
        res = false;
        return;
      }
    }
    inorder(node.right);
  }
  inorder(root);
  // 返回结果
  return res;
};