var isSameTree = function(p, q) {
  // 校验两棵树是否相等
  function check(a,b){
    // 如果当前两节点都为null，相等
    if(a===null && b===null) return true;
    // 如果某一个节点为空或者两节点值不同，不相等
    if(a===null || b===null || (a.val!==b.val)) return false;
    // 递归校验左右子树
    return check(a.left,b.left)&&check(a.right,b.right)
  }
  // 返回结果
  return check(p,q)
};