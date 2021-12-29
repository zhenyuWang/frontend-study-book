class UnionSet {
  constructor(n){
    // 初始化节点数量数组
    this.size = Array(n).fill(1);
    // 初始化集合列表，每一个节点为一个集合
    this.list = Array(n);
    for(let i = 0;i<n;i++){
      this.list[i] = i;
    }
  }
  // 递归获取元素所在集合根节点
  find(x){
    if(this.list[x]===x) return x;
    // 获取到元素所在集合根节点
    const root = this.find(this.list[x]);
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
var makeConnected = function(n, connections) {
  // 获取网线数量
  const len = connections.length;
  // 如果网线数量比计算机数量-1还少，则无法连接所有计算机
  if(len<n-1) return -1;
  // 创建并查集实例
  const unionset = new UnionSet(n);
  // 遍历连接
  for(let i = 0;i<len;i++){
    // 将两台电脑放入一个集合
    unionset.merge(connections[i][0],connections[i][1])
  }
  // 获取最后并查集中集合数量
  const set = new Set();
  for(let i = 0;i<n;i++){
    set.add(unionset.find(i))
  }
  // 集合数量-1即未连接电脑数量，也就是最少操作次数
  return set.size-1;
};