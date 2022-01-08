// sort排序
var getAllElements = function(root1, root2) {
  // 创建节点值数组
  const arr = [];
  // 中序遍历
  function inorder(node){
    if(node === null) return;
    inorder(node.left);
    // 将每个节点值插入数组
    arr.push(node.val);
    inorder(node.right);
  }
  inorder(root1);
  inorder(root2);
  // 将数组进行升序排序并返回
  return arr.sort((a,b) => a-b)
};

// 优化排序
var getAllElements = function(root1, root2) {
  // 创建两个数组，分别保存两棵树的节点值
  const arr1 = [],arr2 = [];
  function inorder(node,arr){
    if(node === null) return;
    inorder(node.left,arr);
    arr.push(node.val);
    inorder(node.right,arr);
  }
  inorder(root1,arr1);
  inorder(root2,arr2);
  // 创建结果数组
  const res = [],
  // 对两个有序数组进行归并排序
  len1 = arr1.length,len2 = arr2.length;
  let i = 0,j = 0;
  while(i<len1 || j<len2){
    if(j===len2 || (i<len1 && (arr1[i]<arr2[j]))){
      res.push(arr1[i]);
      i++
    }else{
      res.push(arr2[j])
      j++
    }
  }
  // 返回排序后的结果
  return res;
};