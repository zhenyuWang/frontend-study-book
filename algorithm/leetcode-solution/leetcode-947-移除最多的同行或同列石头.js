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
    if(this.list[x] === x) return x;
    // 获取到元素所在集合根节点
    const root = this.find(this.list[x])
    // 将当前节点挂载为根节点子节点，压缩路径
    this.list[x] = root;
    return root;
  }
  // 合并两个集合
  merge(rootA,rootB){
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
var removeStones = function(stones) {
  // 获取石头数量
  const len = stones.length,
  // 创建并查集实例
  unionset = new UnionSet(len);
  // 初始化结果值
  let res = 0;
  for(let i = 0;i<len-1;i++){
    for(let j = i+1;j<len;j++){
      if(stones[i][0]===stones[j][0]||stones[i][1]===stones[j][1]){
        // 获取两个元素所在集合的根节点
        const rootA = unionset.find(i),rootB = unionset.find(j)
        // 如果两个根节点不同，则进行合并，同时一次合并可以看做删除一个石头，结果值+1
        if(rootA!==rootB){
          res++;
          unionset.merge(rootA,rootB)
        }
      }
    }
  }
  // 返回结果值
  return res;
};