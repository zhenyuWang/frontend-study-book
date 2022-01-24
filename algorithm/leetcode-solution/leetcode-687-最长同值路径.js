var longestUnivaluePath = function(root) {
  // 初始化结果值为 0
  let max = 0;
  // 递归函数，求以每一个节点为顶点的同值路径的长度
  function findPath(node){
    // 递归函数退出条件，如果节点为 null，返回 0
    if(node === null) return 0;
    // 向下递归的过程中记录当前节点的父节点的值，以便的回溯的过程中使用
    if(node.left) node.left.parentVal = node.val
    if(node.right) node.right.parentVal = node.val
    // 获取左子树的返回值
    const l = findPath(node.left),
    // 获取右子树的返回值
    r = findPath(node.right)
    // 尝试用当前节点为顶点获取到的同值路径的长度更新结果值
    max = Math.max(max,l+r)
    // 如果有父节点节点值和当前节点是否相同
    // 如果相同，返回左右子树返回值的最大值 +1
    if(node.parentVal===node.val) return Math.max(l,r)+1
    // 如果不同，返回 0
    return 0;
  }
  // 调用方法
  findPath(root)
  // 返回结果值
  return max;
};