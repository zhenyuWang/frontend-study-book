var equationsPossible = function(equations) {
  // 初始化map存储变量及集合关系
  const map = new Map(),
  // 初始化不等式方程数组
  notEqual = [];
  // 获取当前元素所在集合根节点方法
  function find(x){
    if(map.get(x)===x) return x;
    return find(map.get(x))
  }
  // 循环输入数组
  for(let i = 0;i<equations.length;i++){
    const [a,symbol,,b] = equations[i]
    // 如果当前为不等式，将方程式放入不等式方程数组
    if(symbol==='!'){
      notEqual.push(equations[i])
    }else{
      // 如果集合中存储了a 和 b
      if(map.has(a)&&map.has(b)){
        // 获取两个变量所在集合的根节点
        const rootA = find(a),
        rootB = find(b);
        // 如果两个变量所处不同集合，合并集合
        if(rootA!==rootB){
          map.set(rootA,rootB);
        }
        // 如果 b 未存储，将 b 加入 a 所在集合
      }else if(map.has(a)){
        map.set(b,find(a))
        // 如果 a 未存储，将 a 加入 b 所在集合
      }else if(map.has(b)){
        map.set(a,find(b))
      }else{
        // 如果都未存储，将 a b 存储在一个新集合
        map.set(a,a)
        map.set(b,a)
      }
    }
  }
  // 遍历不等方程
  for(let i = 0;i<notEqual.length;i++){
    const [a,,,b] = notEqual[i];
    // 如果两个变量为同一个变量，此时又是不等式，所以无法满足方程
    if(a===b) return false;
    // 如果两个变量都被存储过，且所处相同集合，则无法满足方程
    if(map.has(a)&&map.has(b)&&(find(a)===find(b))) return false;
  }
  // 所有方程都可以满足，返回 true
  return true;
};