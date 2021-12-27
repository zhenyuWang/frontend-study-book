var findCircleNum = function(isConnected) {
  // 获取数组长度，即城市数量
  const len = isConnected.length,
  // 初始化标记数组
  tag = Array(len).fill(false);
  // 初始化省份数量为0
  let res = 0;
  // 遍历输入数组
  for(let i = 0;i<len;i++){
    // 如果当前城市已经被连通过，则跳过
    if(tag[i]) continue;
    // 否则说明找到了一个新的城市，它必然会属于一个新的省份，所以省份数量+1
    res++;
    // 处理当前城市
    handle(i);
  }
  // 将当前城市标记为已处理
  function handle(i){
    tag[i] = true;
    // 遍历当前城市数据，递归连通城市
    for(let j = 0;j<len;j++){
      if(j===i||tag[j]||isConnected[i][j]===0) continue;
      handle(j)
    }
  }
  return res;
};