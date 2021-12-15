/* 
  递归的获取左右子树高度，判断高度差的绝对值是否大于1
  这里有一个技巧即如果大于1，返回一个极大值
  通过判断整棵树的高度是否是极大值，即可得到整棵树是否是平衡二叉树
*/

var isBalanced = function(root) {
  function getHeight(root){
      if(root === null) return 0;
      const l = getHeight(root.left),
      r = getHeight(root.right);

      if(Math.abs(l-r)>1) return 10000;
      return Math.max(l,r)+1;
  }
  return getHeight(root)<10000
};