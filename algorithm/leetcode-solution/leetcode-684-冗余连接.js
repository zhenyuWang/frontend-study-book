class UnionSet {
  constructor(n){
    // 初始化节点数量数组
    this.size = Array(n).fill(1);
    // 初始化集合列表，每一个节点为一个集合
    this.list = Array(n)
    for(let i = 0;i<n;i++){
      this.list[i] = i;
    }
  }
  // 递归获取元素所在集合根节点
  find(x){
    if(this.list[x]===x) return x;
    // 获取到元素所在集合根节点
    const root = this.find(this.list[x])
    // 将当前节点挂载为根节点子节点，压缩路径
    this.list[x] = root;
    return root;
  }
  // 合并两个元素所在集合
  merge(a,b){
    // 获取两个元素所在集合的根节点
    const rootA = this.find(a),
    rootB = this.find(b);
    // 如果两个根节点相同，则两元素处于同一集合，无需再合并
    if(rootA===rootB) return;
    // 如果 a 所在集合元素数量更多，将 b 所在集合合并到 a 所在集合
    if(this.size[rootA]>this.size[rootB]){
      this.list[rootB] = rootA;
      this.size[rootA] += this.size[rootB]
    }else{
      // 反之将 a 所在集合合并到 b 所在集合
      this.list[rootA] = rootB;
      this.size[rootB] += this.size[rootA]
    }
  }
}
var findRedundantConnection = function(edges) {
  // 获取连接数量
  const len = edges.length,
  // 创建并查集实例
  unionset = new UnionSet(len+1);
  // 遍历连接
  for(let i = 0;i<len;i++){
    const [a,b] = edges[i]
    // 如果当前两个节点已经连接，则说明当前连接是冗余连接，返回当前连接
    if(unionset.find(a)===unionset.find(b)) return [a,b]
    // 连接当前连接两个节点
    unionset.merge(a,b)
  }
};