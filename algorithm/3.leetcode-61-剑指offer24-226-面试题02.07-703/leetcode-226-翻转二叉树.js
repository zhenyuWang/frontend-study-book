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