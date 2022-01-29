// 并查集
class UnionFind {
  constructor(n){
    this.list = Array(n)
    for(let i = 0;i<n;i++){
      this.list[i] = i;
    }
  }
  // 查找
  find(x){
    if(this.list[x]===x) return x
    // 路径压缩
    this.list[x] = this.find(this.list[x])
    return this.list[x]
  }
  // 合并
  merge(a,b){
    const rootA = this.find(a),
    rootB = this.find(b)
    this.list[rootA] = rootB
  }
}
var maxEvents = function(events) {
  // 对会议排序，结束时间晚的排在后面，结束时间相同，开始时间早的排在前面
  events.sort((a,b) => a[1]===b[1]?a[0]-b[0]:a[1]-b[1])
  // 初始化并查集，长度为最晚天数+1
  const uf = new UnionFind(events[events.length-1][1]+1)
  // 初始化结果值
  let res = 0
  // 遍历排序后的会议列表
  for(let i = 0;i<events.length;i++){
    // 获取会议开始结束天数
    const [a,b] = events[i],
    // 获取开始时间在并查集中对应的未使用天数
    day = uf.find(a)
    // 如果该天数可以参加当前会议，则可参加会议+1，更新并查集当前天数为下一天
    if(day<=b) uf.merge(day,day+1),res++
  }
  return res
};