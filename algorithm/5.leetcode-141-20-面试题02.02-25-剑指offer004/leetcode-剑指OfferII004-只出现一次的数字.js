var singleNumber = function(nums) {
  const map = new Map();
  for(let i = 0;i<nums.length;i++){
      if(map.has(nums[i])){
          if(map.get(nums[i])===2) map.delete(nums[i])
          else map.set(nums[i],2)
      }
      else map.set(nums[i],1)
  }

  let ret;
  map.forEach((val,key) => {
      ret = key;
  })
  return ret;
};