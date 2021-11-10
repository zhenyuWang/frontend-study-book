/* 
  递归获取左右子树的高度
  回溯过程中更新当前子树的高度
*/

var maxDepth = function(root) {
  function getHeight(root){
      if(root === null) return 0;
      return Math.max(getHeight(root.left),getHeight(root.right))+1
  }
  return getHeight(root);
};