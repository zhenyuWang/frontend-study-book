// 通过鸡蛋数和楼层数推操作数

// dp[i][j] => 有 i 个鸡蛋和 j 层楼所需要的最小操作次数
// 如果此时我们在第 k 层扔鸡蛋 (1<=K<=j)
// 如果鸡蛋碎了，就变成了 dp[i-1][k-1] 也就是还有 i-1 个鸡蛋，还有 k-1 层楼
// 如果鸡蛋没碎，就变成了 dp[i][j-k] 也就是还有 i 个鸡蛋，j-k 层楼
// 所以状态转移方程应该是：
// dp[i][j] = min(dp[i][j],max(dp[i-1][k-1],dp[i][j-k])+1) (1<=k<=j)

// 无优化，超时解题
// 时间复杂度 O(KN²)
// 空间复杂度 O(KN)
let superEggDrop = (K, N)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(K===1) return N;
  // 初始化 dp 数组
  dp = Array(K+1);
  for(let i = 0;i<=K;i++){
    dp[i] = Array(N+1).fill(0)
  }
  // 将鸡蛋为 1 的情况赋值对应楼层
  for(let i = 1;i<=N;i++){
    dp[1][i] = i
  }
  // 利用状态转移方程，推导出 dp[K][N]
  for(let i = 2;i<=K;i++){
    for(let j = 1;j<=N;j++){
      dp[i][j] = j;
      for(let k = 1;k<=j;k++){
        dp[i][j] = Math.min(dp[i][j],Math.max(dp[i-1][k-1],dp[i][j-k])+1)
      }
    }
  }
  // 返回结果
  return dp[K][N];
};

// 二分查找中间 k
// 因为 dp[i-1][k-1] k 越大 值越大，dp[i][j-k] k 越小，值越大
// 这里要用的又是两个值中的最大值，所以应该让 k 值趋近于中间，也就是两个值趋近于相等，两个数的最大值才最小
// 所以可以利用二分查找，找到一个K值使 dp[i-1][mid-1]刚好大于等于dp[i][j-mid]
// 这样两个值中的最大值才最小
// 时间复杂度 O(KNlogN)
// 空间复杂度 O(KN)
let superEggDrop = (K, N)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(K===1) return N;
  // 初始化 dp 数组
  dp = Array(K+1);
  for(let i = 0;i<=K;i++){
    dp[i] = Array(N+1).fill(0)
  }
  // 将鸡蛋为 1 的情况赋值对应楼层
  for(let i = 1;i<=N;i++){
    dp[1][i] = i
  }
  // 利用状态转移方程，推导出 dp[K][N]
  for(let i = 2;i<=K;i++){
    for(let j = 1;j<=N;j++){
      dp[i][j] = j;
      // 利用二分查找最优 K 值
      let l = 1,r = j;
      while(l<r){
        const mid = (l+r)>>1;
        if(dp[i-1][mid-1]<dp[i][j-mid]) l = mid+1
        else r = mid
      }
      dp[i][j] = Math.min(dp[i][j],Math.max(dp[i-1][l-1],dp[i][j-l])+1)
    }
  }
  // 返回结果
  return dp[K][N];
};

// 记忆 K 值
// 因为在每次循环中， j 是单调递增的，所以其对应的 k 值也是单调递增的
// 所以可以记录上次的 k 值，下次只需要从上次 k 值向后查找即可
// 时间复杂度 O(KN)
// 空间复杂度 O(KN)
let superEggDrop = (K, N)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(K===1) return N;
  // 初始化 dp 数组
  dp = Array(K+1);
  for(let i = 0;i<=K;i++){
    dp[i] = Array(N+1).fill(0)
  }
  // 将鸡蛋为 1 的情况赋值对应楼层
  for(let i = 1;i<=N;i++){
    dp[1][i] = i
  }
  // 利用状态转移方程，推导出 dp[K][N]
  for(let i = 2;i<=K;i++){
    // 通过记忆 K 值优化推导过程
    let k = 1;
    for(let j = 1;j<=N;j++){
      dp[i][j] = j;
      while(dp[i-1][k-1]<dp[i][j-k]) k++
      dp[i][j] = Math.min(dp[i][j],Math.max(dp[i-1][k-1],dp[i][j-k])+1)
    }
  }
  // 返回结果
  return dp[K][N];
};

// 滚动数组优化空间复杂度
// 时间复杂度 O(KN)
// 空间复杂度 O(N)
let superEggDrop = (K, N)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(K===1) return N;
  // 初始化 dp 数组
  dp = Array(2);
  for(let i = 0;i<2;i++){
    dp[i] = Array(N+1).fill(0)
  }
  // 将鸡蛋为 1 的情况赋值对应楼层
  for(let i = 1;i<=N;i++){
    dp[1][i] = i
  }
  // 利用状态转移方程，推导出 dp[K][N]
  for(let i = 2;i<=K;i++){
    // 通过滚动数组优化空间复杂度
    let cur = i%2,pre = !cur*1;
    // 通过记忆 K 值优化推导过程
    let k = 1;
    for(let j = 1;j<=N;j++){
      dp[cur][j] = j;
      while(dp[pre][k-1]<dp[cur][j-k]) k++
      dp[cur][j] = Math.min(dp[cur][j],Math.max(dp[pre][k-1],dp[cur][j-k])+1)
    }
  }
  // 返回结果
  return dp[K%2][N];
};

// 通过操作次数和鸡蛋数推楼层数

// dp[i][j] 表示操作 i 次，j 个鸡蛋，所能测出的最高楼层
// 推导转移方程和之前类似，同样只有两种情况，鸡蛋碎以及鸡蛋没碎。
// 如果鸡蛋碎了，说明可以测到不会碎的楼层是 `dp[i-1][j-1]`
// 如果没碎，那么这个鸡蛋我们还可以继续使用，此时还可以继续向上查找 `dp[i-1][j]` 层。
// 那么再加上当前层，所以可以得到状态转移方程：
// `dp[i][j] = dp[i-1][j-1]+1+dp[i-1][j]`
// 以 num 表示最终操作次数，此时
// 时间复杂度 O(numK)
// 空间复杂度 O(numK)
// 又因为 num 和 N 之间是指数级的关系，所以本题解的
// 时间复杂度 O(KlogN)
// 空间复杂度 O(KlogN)

let superEggDrop = (K, N)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(K===1) return N;
  // 初始化 dp 数组
  dp = [Array(K+1).fill(0)];
  // 初始化操作次数
  let num = 0;
  // 当 dp[num][K] 小于目标楼层的时候，递增操作次数，直到可以测出目标楼层
  while(dp[num][K]<N){
    // 递增操作次数
    num++
    // 初始化 dp[num]
    dp[num] = [0]
    // 推导 dp
    for(let j = 1;j<=K;j++){
      dp[num][j] = dp[num-1][j-1]+1+dp[num-1][j]
    }
  }
  // 返回操作次数
  return num;
};

// 因为本次的值只依赖于上一次操作次数，所以可以将 dp 数组优化为一维 dp
// dp[i] 表示当前次数下 i 个鸡蛋可以测出的最高楼层
// 因为下一次依赖上一次的值，所以应该是从后向前推
// 如此一层一层的更新 dp
let superEggDrop = (K, N)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(K===1) return N;
  // / 初始化 dp 数组
  const dp = Array(K+1).fill(0);
  // 初始化操作次数
  let num = 0;
  // 当 dp[num][K] 小于目标楼层的时候，递增操作次数，直到可以测出目标楼层
  // 要注意的是这里的 num 没没有表现在 dp 数组中，但是是切实存在的
  while(dp[K]<N){
    // 递增操作次数
    num++;
    // 推导 dp
    for(let i = K;i>0;i--){
      dp[i] = dp[i-1]+1+dp[i]
    }
  }
  // 返回操作次数
  return num;
};