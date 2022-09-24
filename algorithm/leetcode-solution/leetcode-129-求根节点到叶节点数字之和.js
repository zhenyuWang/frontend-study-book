var sumNumbers = function(root) {
  // 初始化结果
  let total = 0

  function getNum(node,sum){
      // 累加 sum
      sum = sum*10+node.val
      // 如果当前为叶节点，累加结果值
      if(!node.left && !node.right){
          total += sum
      }
      // 否则继续向下处理子节点
      if(node.left){
          getNum(node.left,sum)
      }
      if(node.right){
          getNum(node.right,sum)
      }
  }

  getNum(root,0)
  return total
};