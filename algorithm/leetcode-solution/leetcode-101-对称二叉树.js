// 递归
var isSymmetric = function(root) {
  function check(a,b){
    // 如果当前两节点都为null，符合对称要求
    if(a===null && b===null) return true;
    // 如果某一个节点为空或者两节点值不同，不符合对称要求
    if(a===null || b===null || (a.val!==b.val)) return false;
    // 递归校验子树
    return check(a.left,b.right)&&check(a.right,b.left)
  }
  return check(root.left,root.right)
};

// 迭代
var isSymmetric = function(root) {
  // 利用迭代的方式遍历左子树和右子树
  // 左子树 根左右顺序 右子树 根右左顺序
  // 如果两棵子树对称，则左子树根左右方式遍历与右子树根右左方式遍历结果相同
  const stack1 = [],stack2 = [];
  let a = root.left,b = root.right;
  while(a||stack1.length){
    while(a){
      if(b===null || (a.val!==b.val)) return false;
      stack1.push(a);
      stack2.push(b);
      a = a.left;
      b = b.right;
    }
    if(b) return false;
    a = stack1.pop().right;
    b = stack2.pop().left;
  }
  return b===null;
};