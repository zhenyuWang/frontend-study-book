/* 
  典型的二分查找问题
  二分查找即在每次取待查找区间的中间元素与目标值对比
  根据结果调整待查找区间为之前的一半
  直到区间中只有一个元素
*/
var searchInsert = function(nums, target) {
  if(target<nums[0]) return 0;
  if(target>nums[nums.length-1]) return nums.length;
  let l = 0,r = nums.length-1;
  // 二分查找
  while(l<r){
      const mid = (l+r)>>1;
      if(nums[mid]<target) l = mid+1
      else r = mid;
  }
  return l;
};