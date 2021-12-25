var lowestCommonAncestor = function(root, p, q) {
  let list1,list2;
  // 遍历二叉树查找目标节点并记录根节点到目标节点的路径
  function preorder(node,list){
    if(node === null) return;
    list.push(node);
    if(node === p){
      list1 = list;
      if(list2) return;
    }
    if(node === q){
      list2 = list;
      if(list1) return;
    }
    // 根据二叉搜索树的性质，减小查找范围
    if((!list1&&p.val<node.val)||(!list2&&q.val<node.val)){
      preorder(node.left,[...list])
    }
    if((!list1&&p.val>node.val)||(!list2&&q.val>node.val)){
      preorder(node.right,[...list])
    }
  }
  preorder(root,[])

  // 从后向前遍历长度更短的路径数组，第一个在另一个路径数组同时存在的节点即为最近的公共祖先节点
  if(list1.length<list2.length){
    for(let i = list1.length-1;i>=0;i--){
      if(list2.indexOf(list1[i])>-1) return list1[i]
    }
  }
  for(let i = list2.length-1;i>=0;i--){
    if(list1.indexOf(list2[i])>-1) return list2[i]
  }
};