// 二叉搜索树的性质：左子树的节点值都小于等于根节点值，右子树的节点值都大于等于根节点值
var kthLargest = function(root, k) {
  // 初始化 num
  let num = 0;
  // 右根左顺序遍历二叉搜索树
  function getNodeVal(root){
    if(root === null) return;
    let right = getNodeVal(root.right);
    if(right!==undefined) return right;
    num++;
    // 如果 num = k,说明当前节点为第k个节点
    if(num===k) return root.val;
    return getNodeVal(root.left);
  }
  // 返回结果
  return getNodeVal(root);
};