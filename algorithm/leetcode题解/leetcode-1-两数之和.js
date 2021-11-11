/* 
  双层循环，暴力查找
  时间复杂度 n 方
*/
var twoSum = function(nums, target) {
  const len = nums.length,
  indArr = [];
  for(let i = 0;i<len;i++){
      indArr[i] = i;
  }
  indArr.sort((a,b) => nums[indArr[a]]-nums[indArr[b]])
  return[0,1]
}

/*
  对下标数组排序
  通过二分查找匹配目标值
  时间复杂度 n+n*logn
*/
var twoSum = function(nums, target) {
  const len = nums.length,
  // 获取下标数组
  indArr = [];
  for(let i = 0;i<len;i++){
      indArr[i] = i;
  }
  // 对下标数组排序
  indArr.sort((a,b) => nums[indArr[a]]-nums[indArr[b]])
  // 循环查找符合条件的两个整数
  for(let i = 0;i<len-1;i++){
      const ind = find(i+1,target-nums[indArr[i]])
      if(ind>-1) return [indArr[i],indArr[ind]]
  }
  // 在待查找区间二分查找目标值
  function find(l,target){
      let r = len-1;
      while(l<r){
          const mid = (l+r) >> 1;
          if(nums[indArr[mid]]<target) l = mid+1
          else r = mid
      }
      // 判断找到的元素是否等于target
      return nums[indArr[l]]===target?l:-1
  }
};