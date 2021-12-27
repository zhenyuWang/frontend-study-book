var numIslands = function(grid) {
  // 获取数组长度，方便后续使用
  const x = grid[0].length,y = grid.length;
  // 初始化岛屿数量为0
  let res = 0;
  // 遍历输入数组
  for(let i = 0;i<y;i++){
    for(let j = 0;j<x;j++){
      // 如果当前值为1，说明找到了一块陆地，而陆地必然属于一个岛屿，所以岛屿数量+1
      if(grid[i][j]==='1'){
        res++;
        // 处理当前陆地
        handle(i,j)
      }
    }
  }
  // 将当前陆地修改为 0,并递归处理相邻陆地
  function handle(i,j){
    if(i<0||i>=y||j<0||j>=x||grid[i][j]==='0') return;
    grid[i][j] = '0';
    handle(i-1,j)
    handle(i+1,j)
    handle(i,j-1)
    handle(i,j+1)
  }
  return res;
};