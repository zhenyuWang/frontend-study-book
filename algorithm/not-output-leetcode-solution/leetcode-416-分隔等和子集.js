// 利用可达数组的思想
// 判断数组中的数组，当前值是否可以组合出
var canPartition = function(nums) {
  const len = nums.length;
  let sum = 0;
  // 求得数组数字总和
  for(let i = 0;i<len;i++){
      sum+=nums[i]
  }
  // 如果总和为奇数，返回false
  if(sum%2) return false;

  // 判断可达位置
  const dp = Array(sum+1).fill(0);
  dp[0] = 1;
  sum = 0;
  for(let i = 0;i<len;i++){
      sum+=nums[i];
      for(let j = sum;j>=nums[i];j--){
          // dp[i][j] = dp[i-1][j] || dp[i-1][j-x]
          dp[j] = dp[j] || dp[j-nums[i]]
      }
  }
  // 返回总和/2位置是否可达
  return dp[sum/2]
};