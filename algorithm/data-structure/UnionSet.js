// 染色法
class UnionSet {
  constructor(n){
    // 初始化节点数组
    this.colors = Array(n);
    // 将每个元素染色为其下标
    for(let i = 0;i<n;i++){
      this.colors[i] = i;
    }
  }
  // 获取当前元素色值
  find(x){
    return this.colors[x]
  }
  merge(a,b){
    // 获取元素 a 的颜色，b 的颜色
    const ca = this.colors[a],cb = this.colors[b];
    // 将颜色为和 b 相同的元素染为 a 的颜色
    for(let i =0;i<this.colors.length;i++){
      if(this.colors[i]===cb){
        this.colors[i] = ca
      }
    }
  }
}

// 树型结构
class UnionSet {
  constructor(n){
    // 初始化节点集合数组
    this.list = Array(n);
    // 把每个元素的集合初始化为其自身
    for(let i = 0;i<n;i++){
      this.list[i] = i
    }
  }
  // 获取元素所在集合根节点
  find(x){
    // 如果当前元素为根节点，返回
    if(this.list[x]===x) return x;
    // 否则递归获取根节点并返回
    return this.find(this.list[x])
  }
  // 集合合并
  merge(a,b){
    // 获取元素所在集合根节点
    const rootA = this.find(a),rootB = this.find(b);
    // 如果两元素在同一个集合，取消合并
    if(rootA===rootB) return;
    // 将b所在集合合并到a所在集合
    this.list[rootB] = rootA;
  }
}

// // 优化树高
class UnionSet {
  constructor(n){
    // 初始化节点数量数组
    this.size = Array(n).fill(1);
    // 初始化节点集合数组
    this.list = Array(n);
    // 把每个元素的集合初始化为其自身
    for(let i = 0;i<n;i++){
      this.list[i] = i
    }
  }
  // 获取元素所在集合根节点
  find(x){
    // 如果当前元素为根节点，返回
    if(this.list[x]===x) return x;
    // 否则递归获取根节点并返回
    return this.find(this.list[x])
  }
  // 集合合并
  merge(a,b){
    // 获取元素所在集合根节点
    const rootA = this.find(a),rootB = this.find(b);
    // 如果两元素在同一个集合，取消合并
    if(rootA===rootB) return;
    // 将节点更少的树挂载到节点更多的树下，并更新该树节点数量
    if(this.size[rootA]<this.size[rootB]){
      this.list[rootA] = rootB;
      this.size[rootB] += this.size[rootA]
    }else{
      this.list[rootB] = rootA;
      this.size[rootA] += this.size[rootB]
    }
  }
}

// 路径压缩
class UnionSet {
  constructor(n){
    // 初始化节点数量数组
    this.size = Array(n).fill(1);
    // 初始化节点集合数组
    this.list = Array(n);
    // 把每个元素的集合初始化为其自身
    for(let i = 0;i<n;i++){
      this.list[i] = i
    }
  }
  // 获取元素所在集合根节点
  find(x){
    // 如果当前元素为根节点，返回
    if(this.list[x]===x) return x;
    // 否则递归获取根节点
    const root = this.find(this.list[x])
    // 将当前节点挂载为根节点子节点，实现路径压缩优化
    this.list[x] = root;
    // 返回根节点
    return root;
  }
  // 集合合并
  merge(a,b){
    // 获取元素所在集合根节点
    const rootA = this.find(a),rootB = this.find(b);
    // 如果两元素在同一个集合，取消合并
    if(rootA===rootB) return;
    // 将节点更少的树挂载到节点更多的树下，并更新该树节点数量
    if(this.size[rootA]<this.size[rootB]){
      this.list[rootA] = rootB;
      this.size[rootB] += this.size[rootA]
    }else{
      this.list[rootB] = rootA;
      this.size[rootA] += this.size[rootB]
    }
  }
}