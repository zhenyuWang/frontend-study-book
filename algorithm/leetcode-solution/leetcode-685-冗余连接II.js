// 并查集
class UnionSet {
  // 初始化list
  constructor(n){
    this.list = Array(n);
    for(let i = 0;i<n;i++){
      this.list[i] = i;
    }
  }
  // 查找元素所在集合并进行路径压缩
  find(x){
    if(this.list[x] === x) return x;
    const root = this.find(this.list[x])
    this.list[x] = root;
    return root;
  }
  // 合并子节点集合到父节点集合
  merge(rootA,rootB){
    this.list[rootB] = rootA;
  }
}
var findRedundantDirectedConnection = function(edges) {
  // 获取顶点数量
  const len = edges.length,
  // 根据顶点数量创建并查集
  unionset = new UnionSet(len+1),
  // 根据顶点数量创建parent数组，维护顶点父节点
  parent = Array(len+1);
  for(let i = 1;i<=len;i++){
    parent[i] = i;
  }
  // 初始化双入度边及成环边的下标
  let doubleInd = -1,circleInd = -1;
  // 遍历输入数组
  for(let i = 0;i<len;i++){
    const [a,b] = edges[i];
    // 如果当前子节点已经被作为子节点连接过，则此时形成了双入度
    if(parent[b]!==b) doubleInd = i;
    else{
      // 否则更新子节点的父节点
      parent[b] = a;
      // 如果两个顶点在同一个集合，则此时形成了环
      const rootA = unionset.find(a),
      rootB = unionset.find(b);
      if(rootA===rootB) circleInd = i;
      // 否则将子节点所在集合合并到父节点所在集合
      else unionset.merge(rootA,rootB)
    }
  }
  // 如果当前只是成环的情况，返回成环的边
  if(doubleInd===-1) return edges[circleInd]
  // 如果只是双入度的情况，返回双入度的边
  if(circleInd===-1) return edges[doubleInd]
  // 如果是成环且双入度的情况，返回双入度子节点及其父节点组成的边
  const child = edges[doubleInd][1];
  return [parent[child],child]
};