// 通过鸡蛋数和楼层数推操作数

// dp[i][j] => 有 i 个鸡蛋和 j 层楼所需要的最小操作次数
// 如果此时我们在第 x 层扔鸡蛋 (1<=x<=j)
// 如果鸡蛋碎了，就变成了 dp[i-1][x-1] 也就是还有 i-1 个鸡蛋，还有 x-1 层楼
// 如果鸡蛋没碎，就变成了 dp[i][j-x] 也就是还有 i 个鸡蛋，j-x 层楼
// 所以状态转移方程应该是：
// dp[i][j] = min(dp[i][j],max(dp[i-1][x-1],dp[i][j-x])+1) (1<=x<=j)

// 无优化，超时解题
// 时间复杂度 O(kn²)
// 空间复杂度 O(kn)
var superEggDrop = (k, n)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(k===1) return n;
  // 初始化 dp 数组
  dp = Array(k+1);
  for(let i = 0;i<=k;i++){
    dp[i] = Array(n+1).fill(0)
  }
  // 将鸡蛋为 1 的情况赋值对应楼层
  for(let j = 1;j<=n;j++){
    dp[1][j] = j
  }
  // 利用状态转移方程，推导出 dp[k][n]
  for(let i = 2;i<=k;i++){
    for(let j = 1;j<=n;j++){
      dp[i][j] = j;
      for(let x = 1;x<=j;x++){
        dp[i][j] = Math.min(dp[i][j],Math.max(dp[i-1][x-1],dp[i][j-x])+1)
      }
    }
  }
  // 返回结果
  return dp[k][n];
};

// 二分查找中间 x
// 因为 dp[i-1][x-1] x 越大 值越大，dp[i][j-x] x 越小，值越大
// 这里要用的又是两个值中的最大值，所以应该让 x 值趋近于中间，也就是两个值趋近于相等，两个数的最大值才最小
// 所以可以利用二分查找，找到一个k值使 dp[i-1][mid-1]刚好大于等于dp[i][j-mid]
// 这样两个值中的最大值才最小
// 时间复杂度 O(knlogn)
// 空间复杂度 O(kn)
var superEggDrop = (k, n)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(k===1) return n;
  // 初始化 dp 数组
  dp = Array(k+1);
  for(let i = 0;i<=k;i++){
    dp[i] = Array(n+1).fill(0)
  }
  // 将鸡蛋为 1 的情况赋值对应楼层
  for(let j = 1;j<=n;j++){
    dp[1][j] = j
  }
  // 利用状态转移方程，推导出 dp[k][n]
  for(let i = 2;i<=k;i++){
    for(let j = 1;j<=n;j++){
      dp[i][j] = j;
      // 利用二分查找最优 x 值
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
  return dp[k][n];
};

// 记忆 x 值
// 因为在每次循环中， j 是单调递增的，所以其对应的 x 值也是单调递增的
// 所以可以记录上次的 x 值，下次只需要从上次 x 值向后查找即可
// 时间复杂度 O(kn)
// 空间复杂度 O(kn)
var superEggDrop = (k, n)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(k===1) return n;
  // 初始化 dp 数组
  dp = Array(k+1);
  for(let i = 0;i<=k;i++){
    dp[i] = Array(n+1).fill(0)
  }
  // 将鸡蛋为 1 的情况赋值对应楼层
  for(let j = 1;j<=n;j++){
    dp[1][j] = j
  }
  // 利用状态转移方程，推导出 dp[k][n]
  for(let i = 2;i<=k;i++){
    // 通过记忆 x 值优化推导过程
    let x = 1;
    for(let j = 1;j<=n;j++){
      dp[i][j] = j;
      while(dp[i-1][x-1]<dp[i][j-x]) x++
      dp[i][j] = Math.min(dp[i][j],Math.max(dp[i-1][x-1],dp[i][j-x])+1)
    }
  }
  // 返回结果
  return dp[k][n];
};

// 滚动数组优化空间复杂度
// 时间复杂度 O(kn)
// 空间复杂度 O(n)
var superEggDrop = (k, n)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(k===1) return n;
  // 初始化 dp 数组
  dp = Array(2);
  for(let i = 0;i<2;i++){
    dp[i] = Array(n+1).fill(0)
  }
  // 将鸡蛋为 1 的情况赋值对应楼层
  for(let j = 1;j<=n;j++){
    dp[1][j] = j
  }
  // 利用状态转移方程，推导出 dp[k][n]
  for(let i = 2;i<=k;i++){
    // 通过滚动数组优化空间复杂度
    let cur = i%2,pre = !cur*1;
    // 通过记忆 x 值优化推导过程
    let x = 1;
    for(let j = 1;j<=n;j++){
      dp[cur][j] = j;
      while(dp[pre][x-1]<dp[cur][j-x]) x++
      dp[cur][j] = Math.min(dp[cur][j],Math.max(dp[pre][x-1],dp[cur][j-x])+1)
    }
  }
  // 返回结果
  return dp[k%2][n];
};

// 通过操作次数和鸡蛋数推楼层数

// dp[i][j] 表示操作 i 次，j 个鸡蛋，所能测出的最高楼层
// 这一种状态定义之所以更高效是因为
// 之前的 `dp` 是 `[鸡蛋数量][楼层高度]`，而现在是 `[操作次数][鸡蛋数量]`
// 而通过之前的解题过程我们可以知道，操作次数和楼层高度之间是指数级关系的
// 所以我们这里推导二维 `dp` 的时候，要比之前循环的次数少很多。
// 推导转移方程和之前类似，同样只有两种情况，鸡蛋碎以及鸡蛋没碎。
// 假设当前在第 `x` 层扔鸡蛋
// 如果鸡蛋碎了，说明 x 层到第 n 层都是大于 f 的，所以可以确定 dp[i-1][j-1]<=f<x
// 可以发现，这种情况是比较好的，不管楼层有多高，通过这一次，我们都把范围确定在了 dp[i-1][j-1]~x
// 如果没碎，那么这个鸡蛋我们还可以继续使用
// 此时有 i-1 次操作机会，j 个鸡蛋，所有还可以查找 dp[i-1][j] 个楼层
// 所以这个时候我们 dp[i][j] 可以求解 dp[i-1][j-1]+1+dp[i-1][j]
// dp[i-1][j-1] 为之前确定的楼层，1为当前楼层，dp[i-1][j]为剩余操作次数和鸡蛋能确定的楼层

// 因为第一种情况虽好，但是是可遇不可求的，如果没有发生第一种情况，则第二种情况是必然的
// 所以这里我们最差的情况就是每次都是第二种情况，为了一定能求得结果，所以这里采用第二种情况的转移方程

// 以 cnt 表示最终操作次数，此时
// 时间复杂度 O(numk)
// 空间复杂度 O(numk)
// 又因为 cnt 和 n 之间是指数级的关系，所以本题解的
// 时间复杂度 O(klogn)
// 空间复杂度 O(klogn)

var superEggDrop = (k, n)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(k===1) return n;
  // 初始化 dp 数组
  dp = [Array(k+1).fill(0)];
  // 初始化操作次数
  let cnt = 0;
  // 当 dp[cnt][k] 小于目标楼层的时候，递增操作次数，直到可以测出目标楼层
  while(dp[cnt][k]<n){
    // 递增操作次数
    cnt++
    // 初始化 dp[cnt]
    dp[cnt] = [0]
    // 推导 dp
    for(let j = 1;j<=k;j++){
      dp[cnt][j] = dp[cnt-1][j-1]+1+dp[cnt-1][j]
    }
  }
  // 返回操作次数
  return cnt;
};

// 因为本次的值只依赖于上一次操作次数，所以可以将 dp 数组优化为一维 dp
// dp[i] 表示当前次数下 i 个鸡蛋可以测出的最高楼层
// 因为下一次依赖上一次的值，所以应该是从后向前推
// 如此一层一层的更新 dp

// 时间复杂度不变，空间复杂度降为 O(k)
var superEggDrop = (k, n)=> {
  // 特判，如果只有一枚鸡蛋，返回楼层数
  if(k===1) return n;
  // / 初始化 dp 数组
  const dp = Array(k+1).fill(0);
  // 初始化操作次数
  let cnt = 0;
  // 当 dp[cnt][k] 小于目标楼层的时候，递增操作次数，直到可以测出目标楼层
  // 要注意的是这里的 cnt 没没有表现在 dp 数组中，但是是切实存在的
  while(dp[k]<n){
    // 递增操作次数
    cnt++;
    // 推导 dp
    for(let j = k;j>0;j--){
      dp[j] = dp[j-1]+1+dp[j]
    }
  }
  // 返回操作次数
  return cnt;
};