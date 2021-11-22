// 递归
var postorderTraversal = function(root) {
    const res = [];
    function postorder(root){
      if(root === null) return;
      postorder(root.left);
      postorder(root.right);
      res.push(root.val);
    }
    postorder(root);
    return res;
  };
  
//   遍历
  var postorderTraversal = function(root) {
    // 初始化栈和结果数组
    const stack =[],
    res = [];
  
    while (root || stack.length){
      // 一直向下找右子树
      while(root){
        // 将每个节点压入栈中
        stack.push(root);
        // 过程中将每个结点的值倒序的插入结果数组
        res.unshift(root.val);
        root = root.right;
      }
      // 将压入栈的元素取出，并将root指向它的左子树
      // 此时如果左子树存在，则左子树的值会被插入到结果数组的头部
      root = stack.pop().left;
    }
    // 如此一个一个的三元组处理完成，直到根结点，则会进入左子树处理
    // 这个过程，结点值插入的顺序是 根 右 左
    // 因为节点的值每次是插入结果数组头部的，所以结果数组值的顺序为左 右 根
    return res;
  };