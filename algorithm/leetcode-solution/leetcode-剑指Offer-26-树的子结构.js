var isSubStructure = function(A, B) {
  // 特判空树不是任意一个树的子结构
  if(B===null) return false;
  // 对比root2是否是root1的子树
  function compare(root1,root2){
    if((root1===null&&root2===null)||(root1&&root2===null)) return true;
    if((root1===null&&root2)||(root1.val!==root2.val)) return false;
    return compare(root1.left,root2.left)&&compare(root1.right,root2.right)
  }
  // 递归获取二叉树的子树
  function traverse(root){
    if(root === null) return false;
    if(compare(root,B)) return true;
    return traverse(root.left) || traverse(root.right);
  }
  // 返回结果
  return traverse(A);
};