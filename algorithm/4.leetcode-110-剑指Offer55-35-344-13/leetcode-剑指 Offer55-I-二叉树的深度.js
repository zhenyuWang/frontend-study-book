var maxDepth = function(root) {
  function getHeight(root){
      if(root === null) return 0;
      return Math.max(getHeight(root.left),getHeight(root.right))+1
  }
  return getHeight(root);
};