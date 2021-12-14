var zigzagLevelOrder = function(root) {
  // 初始化结果数组
  const res = [];
  // 前序遍历函数
  function preorder(node,deep){
    // 如果当前节点为 null,退出递归
    if(node === null) return;
    // 如果当前深度对应子数组未创建，创建子数组
    if(!res[deep]) res[deep] = [];
    // 如果当前深度为奇数，从右向左记录节点值
    if(deep%2) res[deep].unshift(node.val);
    // 如果当前深度为偶数，从左向右记录节点值
    else res[deep].push(node.val);
    // 递归处理左右子树
    preorder(node.left,deep+1);
    preorder(node.right,deep+1);
  }
  // 调用前序遍历方法
  preorder(root,0);
  // 返回结果数组
  return res;
};