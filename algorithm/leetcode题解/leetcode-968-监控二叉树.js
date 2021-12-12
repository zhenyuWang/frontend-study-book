// 递归记录父节点，回溯推导摄像头数量
var minCameraCover = function(root) {
  let res = 0;
  function preorder(node){
    // 当前节点为叶子节点
    if(node.left===null && node.right===null){
      // 如果有父节点，优先父节点安装摄像头
      if(node.parent) node.parent.val = 2,node.val = 1;
      // 否则只能自己放置摄像头
      else node.val = 2,res++;
      return;
    }
    // 如果有左子树
    if(node.left){
      // 定义parent属性指向当前节点
      node.left.parent = node;
      // 递归处理左子树
      preorder(node.left);
    }
    // 如果有右子树
    if(node.right){
      // 定义parent属性指向当前节点
      node.right.parent = node;
      // 递归处理右子树
      preorder(node.right);
    }
    // 如果当前节点放置摄像头
    if(node.val === 2){
      // 数量加1
      res++;
      // 如果有父节点且父节点值不为2,将父节点值 val = 1,标识父节点可以被监视到
      // 如果父节点已经放置了摄像头，不能修改父节点val
      if(node.parent&&node.parent.val!==2) node.parent.val = 1;
    }else if(node.val === 0){
      // 如果当前节点没有被监视到
      // 如果有父节点，优先让父节点放置摄像头，覆盖当前节点
      if(node.parent) node.parent.val = 2,node.val = 1;
      // 否则只能自己放置摄像头
      else node.val = 2,res++;
    }
  }
  // 递归处理二叉树
  preorder(root);
  // 返回结果值
  return res;
};

/**
  动态规划

  状态定义
    dp[0][0] 覆盖当前子树父节点不放置摄像头，根节点不放置摄像头的摄像头数量
    dp[0][1] 覆盖当前子树父节点不放置摄像头，根节点放置摄像头的摄像头数量
    dp[1][0] 覆盖当前子树父节点放置摄像头，根节点不放置摄像头的摄像头数量
    dp[1][1] 覆盖当前子树父节点放置摄像头，根节点放置摄像头的摄像头数量

  转移方程
    dp[0][0] = Math.min(l[0][0]+r[0][1],l[0][1]+r[0][0],l[0][1]+r[0][1]);
    dp[1][0] = Math.min(dp[0][0],l[0][0]+r[0][0]);
    dp[0][1] = Math.min(l[1][0]+r[1][0],l[1][1]+r[1][0],l[1][0]+r[1][1],l[1][1]+r[1][1])+1;
    dp[1][1] = dp[0][1];
*/
var minCameraCover = function(root) {
  function getDp(root){
    const dp = [[],[]];
    if(root === null){
      dp[0][0] = 0;
      dp[0][1] = 10000;
      dp[1][0] = 0;
      dp[1][1] = 10000;
      return dp;
    }
    if(root.left===null&&root.right===null){
      dp[0][0] = 10000;
      dp[0][1] = 1;
      dp[1][0] = 0;
      dp[1][1] = 1;
      return dp;
    }
    const l = getDp(root.left),
    r = getDp(root.right);
    dp[0][0] = Math.min(l[0][0]+r[0][1],l[0][1]+r[0][0],l[0][1]+r[0][1]);
    dp[1][0] = Math.min(dp[0][0],l[0][0]+r[0][0]);
    dp[0][1] = Math.min(l[1][0]+r[1][0],l[1][1]+r[1][0],l[1][0]+r[1][1],l[1][1]+r[1][1])+1;
    dp[1][1] = dp[0][1];
    return dp;
  }
  const dp = getDp(root);
  return Math.min(dp[0][1],dp[0][0]);
}