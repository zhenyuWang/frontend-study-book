var kthSmallest = function(root, k) {
  // 记录当前遍历的节点数量
  let num = 0,res;
  // 中序遍历
  function inorder(node){
    if(node === null) return;
    inorder(node.left);
    num++;
    // 如果当前节点是第K个节点，则就是要找的第k个最小元素
    if(num===k){
      // 记录节点值
      res = node.val
      // 退出递归
      return;
    }
    inorder(node.right);
  }
  inorder(root);
  // 返回结果
  return res;
};