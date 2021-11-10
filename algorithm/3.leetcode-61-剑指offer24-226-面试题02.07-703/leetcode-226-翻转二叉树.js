/* 
  如果当前节点不为空，交换左右子树
  递归处理左右子树
*/
var invertTree = function(root) {
  function reverse(root){
      if(root === null) return null;
      [root.left,root.right] = [root.right,root.left]
      reverse(root.left);
      reverse(root.right);
      return root;
  }

  return reverse(root)
};