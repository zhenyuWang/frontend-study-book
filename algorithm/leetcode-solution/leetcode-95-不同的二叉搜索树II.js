/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
 var generateTrees = function(n) {
  // 传入区间，返回可以构建的二叉搜索树
  function buildTree(l,r){
    // 如果区间内只有一个数字，则返回一个节点
    if(l===r) return [new TreeNode(l)]
    // 如果区间中没有数字，返回null
    if(l>r) return [null]
    // 初始化可创建树的结果数组
    const res = [];
    for(let i = l;i<=r;i++){
      // 获取可创建的左子树数组
      const left = buildTree(l,i-1),
      // 获取可创建的右子树数组
      right = buildTree(i+1,r);
      // 组合所有可能的二叉搜索树
      for(let j = 0;j<left.length;j++){
        const leftNode = left[j]
        for(let k = 0;k<right.length;k++){
          res.push(new TreeNode(i,leftNode,right[k]))
        }
      }
    }
    // 返回可创建的树的数组
    return res;
  }
  // 调用构建二叉搜索树方法并返回返回值
  return buildTree(1,n)
};
