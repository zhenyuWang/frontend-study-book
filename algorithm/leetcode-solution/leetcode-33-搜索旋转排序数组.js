function find(nums,l,r,target){
  while(l<r){
      const mid = (l+r)>>1

      if(nums[mid]<target){
          l = mid+1
      }else{
          r = mid
      }
  }

  return nums[l]===target?l:-1
}
var search = function(nums, target) {
  const len = nums.length

  if(nums[0]<=nums[len-1]){
      return find(nums,0,len-1,target)
  }

  for(let i = 1;i<len;i++){
      if(nums[i]<nums[i-1]){
          if(nums[0]<=target){
              return find(nums,0,i-1,target)
          }

          return find(nums,i,len-1,target)
      }
  }
}

var search = function(nums, target) {
  const len = nums.length

  if(len === 1){
      return nums[0]===target?0:-1
  }

  let l = 0
  let r = len-1

  while(l<=r){
      const mid = (l+r)>>1

      if(nums[mid] === target){
          return mid
      }
      // 落在前半区间
      if(nums[0]<=nums[mid]){
          if(nums[0]<=target && target<nums[mid]){
              r = mid-1
          }else{
              l = mid+1
          }
      // 落在后半区间
      }else{
          if(nums[mid]<target && target <= nums[len-1]){
              l = mid+1
          }else{
              r = mid-1
          }
      }
  }

  return -1
}
