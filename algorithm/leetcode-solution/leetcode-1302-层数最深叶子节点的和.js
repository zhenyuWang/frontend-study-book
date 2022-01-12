var deepestLeavesSum = function(root) {
  // 创建节点值数组
  const arr = [];
  // 前序遍历二叉树
  function preorder(node,deep){
    if(node === null) return;
    // 如果当前深度对应子数组未创建，创建子数组
    if(arr[deep] === undefined) arr[deep] = []
    // 将当前节点值插入其深度对应子数组中
    arr[deep].push(node.val);
    // 递归处理左子树
    preorder(node.left,deep+1)
    // 递归处理右子树
    preorder(node.right,deep+1)
  }
  // 前序遍历二叉树
  preorder(root,0);
  // 获取最后一个子数组
  const last = arr[arr.length-1]
  // 初始化和值为 0
  let sum = 0;
  // 遍历保存层数最深叶子节点值的数组，累加和值
  for(let i = 0;i<last.length;i++){
    sum += last[i]
  }
  // 返回结果
  return sum;
};