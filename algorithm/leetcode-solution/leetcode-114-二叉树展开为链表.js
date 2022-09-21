// 基础
function treeToList(root){
  const list = []
  function preorder(node){
      if(node === null){
          return
      }
      list.push(node)
      preorder(node.left)
      preorder(node.right)
  }
  preorder(root)
  return list
}
var flatten = function(root) {
  if(root === null){
      return null
  }

  const list = treeToList(root)

  for(let i = 1;i<list.length;i++){
      list[i-1].left = null
      list[i-1].right = list[i]
  }
}

// 进阶
var flatten = function(root) {
  if(root === null){
      return null
  }

  let current = {}

  function preorder(node){
      if(node === null){
          return
      }
      current.left = null
      current.right = node
      current = current.right
      const left = current.left
      const right = node.right
      preorder(left)
      preorder(right)
  }
  preorder(root)
}
