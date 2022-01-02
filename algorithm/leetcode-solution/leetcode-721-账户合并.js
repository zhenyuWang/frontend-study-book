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
var accountsMerge = function(accounts) {
  // 获取 email => ind 的映射
  const email_ind = new Map(),
  // 获取 email => name 的映射
  email_name = new Map(),
  // 获取账户数量
  accountLen = accounts.length;
  // 初始化邮箱数量为 0
  let count = 0;
  // 遍历账户数组
  for(let i = 0;i<accountLen;i++){
    const item = accounts[i],
    name = item[0];
    // 获取 email => ind，email => name 的映射
    for(let j = 1;j<item.length;j++){
      const email = item[j];
      email_ind.set(email,count++)
      email_name.set(email,name)
    }
  }
  // 实例化并查集
  const unionset = new UnionSet(count);
  // 合并邮箱集合
  for(let i = 0;i<accountLen;i++){
    const item = accounts[i],
    firstInd = email_ind.get(item[1]);
    for(let j = 2;j<item.length;j++){
      unionset.merge(firstInd,email_ind.get(item[j]))
    }
  }
  // 获取合并后的邮箱集合
  const map = new Map();
  email_ind.forEach((ind,email) => {
    const rootInd = unionset.find(ind);
    if(map.has(rootInd)){
      const list = map.get(rootInd);
      list.push(email)
    }else{
      map.set(rootInd,[email])
    }
  })
  // 根据邮箱集合，组装结果数组
  const res = [];
  map.forEach(item => {
    item.sort();
    res.push([email_name.get(item[0]),...item])
  })
  return res;
};