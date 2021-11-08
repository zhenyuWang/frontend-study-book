var isBalanced = function(root) {
  function getHeight(root){
      if(root === null) return 0;
      const l = getHeight(root.left),
      r = getHeight(root.right);

      if(Math.abs(l-r)>1) return 10000;
      return Math.max(l,r)+1;
  }
  return getHeight(root)<10000
};