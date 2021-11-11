/* 
  二分查找
  在有序待查找区间中
  每次获取中间元素与目标值对比
  通过对比结果，将待查找区间调整为前半区间或者后半区间
  直到待查找区间中只有一个元素
*/
var search = function(nums, target) {
  let l = 0,r = nums.length-1;
  while(l<r){
      const mid = (l+r) >> 1;
      if(nums[mid]<target) l = mid+1
      else r = mid
  }
  return nums[l]===target?l:-1
};