// 递归
var preorder = function(root) {
  // 创建结果数组
  const res = [];
  // 递归函数
  function _preorder(root){
    if(root === null) return;
    // 处理当前节点
    res.push(root.val);
    // 从左向右处理子节点
    for(let i = 0;i<root.children.length;i++){
      _preorder(root.children[i])
    }
  }
  _preorder(root);
  // 返回结果数组
  return res;
};

// 迭代
var preorder = function(root) {
  // 创建栈和结果数组
  const stack = [],res = [];
  // 当前节点不为空或者栈不为空的时候，遍历N叉树
  while(root||stack.length){
    // 节点不为空的时候
    while(root){
      // 当前节点值放入结果数组
      res.push(root.val);
      // 从右向左将子树入栈
      for(let i = root.children.length-1;i>0;i--){
        stack.push(root.children[i])
      }
      // 最左侧子树直接处理
      root = root.children[0];
    }
    // 当节点为空时，处理栈顶节点
    root = stack.pop();
  }
  // 返回结果数组
  return res;
}