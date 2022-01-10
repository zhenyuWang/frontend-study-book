// 通过鸡蛋数和楼层数推操作数

// dp[i][j] => 有 i 个鸡蛋和 j 层楼所需要的最小操作次数
// 如果此时我们在第 k 层扔鸡蛋 (1<=K<=j)
// 如果鸡蛋碎了，就变成了 dp[i-1][k-1] 也就是还有 i-1 个鸡蛋，还有 k-1 层楼
// 如果鸡蛋没碎，就变成了 dp[i][j-k] 也就是还有 i 个鸡蛋，j-k 层楼
// 所以状态转移方程应该是：
// dp[i][j] = min(dp[i][j],max(dp[i-1][k-1],dp[i][j-k])+1) (1<=k<=j)

// 无优化，超时解题
let superEggDrop = (K, N)=> {
  if(K===0 || N===0) return 0;
  if(K===1) return N;
  dp = Array(K+1);
  for(let i = 0;i<=K;i++){
    dp[i] = Array(N+1).fill(0)
  }
  for(let i = 1;i<=N;i++){
    dp[1][i] = i
  }
  for(let i = 2;i<=K;i++){
    for(let j = 1;j<=N;j++){
      dp[i][j] = j;
      for(let k = 1;k<=j;k++){
        dp[i][j] = Math.min(dp[i][j],Math.max(dp[i-1][k-1],dp[i][j-k])+1)
      }
    }
  }
  return dp[K][N];
};

// 二分查找中间 k
// 因为 dp[i-1][k-1] k 越大 值越大，dp[i][j-k] k 越小，值越大
// 这里要用的又是两个值中的最大值，所以应该让 k 值趋近于中间，也就是两个值趋近于相等，两个数的最大值才最小
// 所以可以利用二分查找，找到一个K值使 dp[i-1][mid-1]刚好大于等于dp[i][j-mid]
// 这样两个值中的最大值才最小
let superEggDrop = (K, N)=> {
  if(K===0 || N===0) return 0;
  if(K===1) return N;
  dp = Array(K+1);
  for(let i = 0;i<=K;i++){
    dp[i] = Array(N+1).fill(0)
  }
  for(let i = 1;i<=N;i++){
    dp[1][i] = i
  }
  for(let i = 2;i<=K;i++){
    for(let j = 1;j<=N;j++){
      dp[i][j] = j;
      let l = 1,r = j;
      while(l<r){
        const mid = (l+r)>>1;
        if(dp[i-1][mid-1]<dp[i][j-mid]) l = mid+1
        else r = mid
      }
      dp[i][j] = Math.min(dp[i][j],Math.max(dp[i-1][l-1],dp[i][j-l])+1)
    }
  }
  return dp[K][N];
};

// 记忆上次最优解
// 因为 k 值是不断增大的，所以我们每次没有必要再从 1 开始推导 k
// 可以记录上次的 k 值，下次只需要从上次 k 值向后查找即可
let superEggDrop = (K, N)=> {
  if(K===0 || N===0) return 0;
  if(K===1) return N;
  dp = Array(K+1);
  for(let i = 0;i<=K;i++){
    dp[i] = Array(N+1).fill(0)
  }
  for(let i = 1;i<=N;i++){
    dp[1][i] = i
  }
  for(let i = 2;i<=K;i++){
    let pre = 1;
    for(let j = 1;j<=N;j++){
      dp[i][j] = j;
      while(dp[i-1][pre-1]<dp[i][j-pre]) pre++
      dp[i][j] = Math.min(dp[i][j],Math.max(dp[i-1][pre-1],dp[i][j-pre])+1)
    }
  }
  return dp[K][N];
};


// 通过操作次数和鸡蛋数推楼层数

// dp[i][j] 表示操作 i 次，j 个鸡蛋，所能测出的最高楼层
// 如果上一次鸡蛋碎了，那么这个值可以从 dp[i-1][j-1]推导出来，即再拿一个鸡蛋，再试一次
// 所以 dp[i][j] = dp[i-1][j-1]+1
// 如果上一次鸡蛋没碎，那就可以再向上查找 dp[i-1][j] 层
// 所以 dp[i][j] = dp[i-1][j-1]+1+dp[i-1][j]
// 所以状态转移方程应该是：
// dp[i][j] = dp[i-1][j-1]+1+dp[i-1][j]

let superEggDrop = (K, N)=> {
  if(K===0 || N===0) return 0;
  if(K===1) return N;
  dp = Array(N+1);
  for(let i = 0;i<=N;i++){
    dp[i] = Array(K+1).fill(0)
  }
  let num = 0;
  while(dp[num][K]<N){
    num++
    for(let j = 1;j<=K;j++){
      dp[num][j] = dp[num-1][j-1]+1+dp[num-1][j]
    }
  }
  return num;
};

// 因为本次的值只依赖于上一个鸡蛋的值，所以可以将 dp 数组优化为一维 dp
// 然后从后向前返推 dp
let superEggDrop = (K, N)=> {
  if(K===0 || N===0) return 0;
  if(K===1) return N;
  const dp = Array(K+1).fill(0);
  let res = 0;
  while(dp[K]<N){
    res++;
    for(let i = K;i>0;i--){
      dp[i] = dp[i-1]+dp[i]+1
    }
  }
  return res;
};