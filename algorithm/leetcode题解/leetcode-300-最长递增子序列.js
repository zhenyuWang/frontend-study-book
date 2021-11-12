/*
  状态定义
  i下标位置的最长递增子序列长度

  状态转移方程
  dp[i] = Math.max(dp[i],dp[j]+1)
  j<i && nums[j]<nums[i]
 */
var lengthOfLIS = function(nums) {
  const len = nums.length,
  dp = Array(len).fill(1);
  let res = 1;
  for(let i = 1;i<len;i++){
      for(let j = 0;j<i;j++){
          if(nums[j]<nums[i]) dp[i] = Math.max(dp[i],dp[j]+1)
      }
      res = Math.max(res,dp[i])
  }
  return res
};

/* 
  把数组元素想象成根据元素值大小不同高度不一的柱子

  那我们想要求得的最长递增子序列，就是找到一个最长的连续上升的阶梯
  就是要把那些违反该性质的柱子，也就是元素，干掉

  遍历所有的柱子，当前面的柱子大于它的时候，它就替换前面的柱子
  如果前面没有大于它的柱子，就放在前面柱子的后面
  而为了保证我们找到的上升阶梯最长，所以我们优先替换左侧的柱子

  因为我们遍历元素的过程是从左向右的，也就是从下标 0 到数组末尾，所以在一次柱子从低到高排列的过程中，下标肯定是有序的
  又因为我们把高的柱子放在矮的柱子后面，所以柱子的高低，也就是元素值的大小也是有序的
  可能最后我们最终的柱子不是对应原数组的一组阶梯柱子，那是因为后续更新的柱子没有完整覆盖上一组柱子


  以数组 [10,9,2,5,3,101,18,7,1,2] 为例
  1 2 7    在更新下一次阶梯
  1 3 7    在更新下一次阶梯
  2 3 7    此时为一次完成阶梯
  2 3 18   此时为一次完成阶梯
  2 3 101  此时为一次完成阶梯
  2 3
  2 5
  2
  9
  10

  以数组 [10,9,2,5,3,18,7,1,2,101] 为例
  1 2 101 此时为一次完成阶梯
  1 2 7   在更新下一次阶梯
  1 3 7   在更新下一次阶梯
  2 3 7   此时为一次完成阶梯
  2 3 18  此时为一次完成阶梯
  2 3
  2 5
  2
  9
  10
*/

var lengthOfLIS = function(nums) {
  const pillars = [nums[0]];
  let num = 1;
  for(let i = 1;i<nums.length;i++){
      let cur = nums[i],l = 0,r = num-1;
      // 如果比现有最高的柱子还要高,放在末尾
      if(cur>pillars[r]){
          pillars[num] = cur;
          num++;
      }else{
          // 二分查找合适的柱子
          while(l<r){
              const mid = (l+r) >> 1;
              if(pillars[mid]<cur) l = mid+1
              else if(pillars[mid]>cur) r = mid
              else l = r = mid;
          }
          pillars[l] = cur;
      }
  }
  // 返回柱子数量
  return num;
};