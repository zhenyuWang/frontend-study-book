var searchInsert = function(nums, target) {
  if(target<nums[0]) return 0;
  if(target>nums[nums.length-1]) return nums.length;
  let l = 0,r = nums.length-1;
  while(l<r){
      const mid = (l+r)>>1;
      if(nums[mid]<target) l = mid+1
      else r = mid;
  }
  return l;
};