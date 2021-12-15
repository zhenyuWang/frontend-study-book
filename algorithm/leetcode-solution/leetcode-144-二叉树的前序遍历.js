// 递归将根节点及左右子树的值push到结果数组即可
var preorderTraversal = function(root) {
  // 根 左 右
  const res = [];
  function preorder(root){
      if(root === null) return;
      res.push(root.val);
      preorder(root.left);
      preorder(root.right);
  }
  preorder(root);
  return res;
};