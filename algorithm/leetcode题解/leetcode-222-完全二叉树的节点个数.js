var countNodes = function(root) {
  // 创建结果值，初始化为0
  let res = 0;
  // 递归遍历每个节点，记录节点数量
  function getNum(root){
    if(root === null) return;
    res++;
    getNum(root.left);
    getNum(root.right);
  }
  getNum(root);
  // 返回结果值
  return res;
};