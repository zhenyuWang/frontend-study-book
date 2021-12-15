/**
    不偷第i间房子
    dp[i][0] = max(dp[i-1][0],dp[i-1][1])
    偷第i间房子
    dp[i][1] = dp[i-1][0]+nums[i]
 */
var rob = function(nums) {
  // 因为房子连成一个环，所以偷第一间的话，最后一间不可以偷
  if(nums.length===1) return nums[0]
  const n = nums.length,
  dp = [[]];
  dp[0][0] = 0,dp[0][1] = nums[0]
  for(let i = 1;i<n;i++){
      dp[i] = []
      dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1])
      dp[i][1] = dp[i-1][0]+nums[i]
  }
  let res = dp[n-1][0];
  // 如果不偷第一间，最后一间可偷可不偷
  dp[0][1] = 0;
  for(let i = 1;i<n;i++){
      dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1])
      dp[i][1] = Math.max(dp[i-1][0]+nums[i])
  }
  return Math.max(res,dp[n-1][0],dp[n-1][1])
};