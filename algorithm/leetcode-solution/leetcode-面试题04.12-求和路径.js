var pathSum = function(root, sum) {
  // 获取路径 传入节点和目标值
  function getPath(node,target){
    // 如果当前节点为空，递归结束，返回 0
    // 因为空节点肯定是找不到等于目标值的路径的
    if(node===null) return 0;
    // 初始化数量为0，并记录当前节点值
    let num = 0,nodeVal = node.val
    // 如果当前节点值等于目标值，数量+1
    if(nodeVal === target) num++
    // 获取后续的目标值
    const val = target-nodeVal
    // 递归处理左子树
    num += getPath(node.left,val)
    // 递归处理右子树
    num += getPath(node.right,val)
    // 如果左子树不为空并且左子树没有被作为起点进行过查找
    // 以左子树为起点查找路径
    if(node.left&&!node.left.tag){
      // 给左子树打上标记，证明作为起点使用过
      node.left.tag = true;
      num += getPath(node.left,sum)
    }
    // 如果右子树不为空并且右子树没有被作为起点进行过查找
    // 以右子树为起点查找路径
    if(node.right&&!node.right.tag){
      // 给右子树打上标记，证明作为起点使用过
      node.right.tag = true;
      num += getPath(node.right,sum)
    }
    // 返回符合条件的路径的数量
    return num;
  }
  // 返回结果值
  return getPath(root,sum)
};