// 基础
var sortedListToBST = function(head) {
  if(head === null){
      return null
  }

  const list = []

  while(head){
      list.push(head.val)
      head = head.next
  }

  function buildTree(list){
      const len = list.length

      if(len===0){
          return null
      }

      const mid = len>>1
      const nodeVal = list[mid]
      const l = list.slice(0,mid)
      const r = list.slice(mid+1)

      return new TreeNode(nodeVal,buildTree(l),buildTree(r))
  }
  return buildTree(list)
};
// 基础优化
var sortedListToBST = function(head) {
  if(head === null){
      return null
  }

  const list = []

  while(head){
      list.push(head.val)
      head = head.next
  }

  function buildTree(l,r){
      if(l>r){
          return null
      }

      const mid = (l+r)>>1
      const nodeVal = list[mid]

      return new TreeNode(nodeVal,buildTree(l,mid-1),buildTree(mid+1,r))
  }
  return buildTree(0,list.length-1)
};
// 进阶
const sortedListToBST = (head) => {
  if (head == null){
      return null
  }

  let len = 0
  let cur = head
  while (head) {
      len++
      head = head.next
  }

  function buildTree(l,r){
      if (l > r){
          return null
      }
      const mid = (l + r) >>> 1

      const leftTree = buildTree(l, mid - 1)

      const node = new TreeNode(cur.val)
      node.left = leftTree

      cur = cur.next
      node.right = buildTree(mid + 1, r)
      return node
}

return buildTree(0, len - 1)
};