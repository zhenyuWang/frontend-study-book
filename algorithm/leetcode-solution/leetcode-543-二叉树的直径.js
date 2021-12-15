var diameterOfBinaryTree = function(root) {
  let res = 0;
  // 获取树高
  function getHeight(root){
      if(root === null) return 0;
      const l = getHeight(root.left),
      r = getHeight(root.right)
      // 获取该节点的路径长度
      res = Math.max(res,l+r)
      // 返回树高
      return Math.max(l,r)+1
  }
  getHeight(root);
  return res;
};