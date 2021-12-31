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
  merge(a,b){
    // 获取两元素所在集合的根节点
    const rootA = this.find(a),rootB = this.find(b);
    // 如果根节点相同，则两元素处于同一集合，无需合并
    if(rootA === rootB) return;
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
var smallestStringWithSwaps = function(s, pairs) {
  // 获取字符串长度
  const len =s.length,
  // 创建并查集实例
  unionset = new UnionSet(len);
  // 遍历索引对
  for(let i = 0;i<pairs.length;i++){
    // 将对应字符合并到一个集合
    unionset.merge(pairs[i][0],pairs[i][1])
  }
  // 获取集合
  const map = new Map();
  for(let i = 0;i<len;i++){
    const root = unionset.find(i);
    if(map.has(root)){
      const item = map.get(root);
      item.vals.push(s[i])
      item.inds.push(i)
    }else{
      map.set(root,{vals:[s[i]],inds:[i]})
    }
  }
  // 创建结果字符数组
  const arr = Array(len);
  // 遍历集合
  map.forEach(item => {
    // 对每个集合中的字符及下标排序
    item.vals.sort();
    item.inds.sort((a,b) => a-b);
    // 根据排序后的结果组装结果字符串
    for(let i = 0;i<item.vals.length;i++){
      arr[item.inds[i]] = item.vals[i]
    }
  })
  // 返回结果值
  return arr.join('')
};