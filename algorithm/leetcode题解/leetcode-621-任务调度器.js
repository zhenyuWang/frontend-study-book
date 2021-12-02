/**
  1. n===0 无需间隔 则最短需要tasks.lenth
  2. 找到出现次数最多的任务，将它按间隔排好 即获取该任务执行用时
    2-1. 剩余任务的数量如果比该间隔还要多，说明剩余任务的种类肯定比间隔多
        此时，将任务适当排列即可，最短时间是任务数量
        tasks =
        ["A","A","A","A","A","A","B","B","B","B","C","C","C","C","D","E","E","F","F"],
        n = 2
        A,B,C,A,B,C,A,B,C,A,B,C,A,E,F,A,E,F,D
    2-2. 如果剩余任务的数量比间隔少，此时间隔无法填满，
        最短时间是出现次数最多任务的执行用时
        tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"],
        n = 2
        A,B,C,A,D,E,A,F,G,A,,,A,,,A
    2-3. 要注意的是可能次数最多的任务有多个，这个时候的最短用时等于出现次数最多的任务执行用时加上任务数量-1
        ["A","A","A","B","B","B"],
        n = 2
        A,B,,A,B,,A,B
 */

var leastInterval = function(tasks, n) {
  const length = tasks.length;
  // 间隔为零，直接返回任务长度
  if(n===0) return length;
  // 记录每种任务执行次数
  const map = new Map();
  for(let i = 0;i<length;i++){
    const item = tasks[i]
    if(map.has(item)){
      map.set(item,map.get(item)+1)
    }else{
      map.set(item,1)
    }
  }
  // 获取执行次数最多的任务的次数以及相同次数的任务的数量
  let max = 0,maxNum = 0;
  map.forEach(item => {
    if(item>max){
      max = item;
      maxNum = 1
    }else if(item === max){
      maxNum++
    }
  })
  // 返回执行次数最多任务执行用时与任务数量的最大值
  return Math.max((n+1)*(max-1)+maxNum,length)
};