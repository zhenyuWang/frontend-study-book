var firstMissingPositive = function(nums) {
  const map = new Map()
  let max = 0

  for(let i = 0;i<nums.length;i++){
      const num = nums[i]
      if(num<=0){
          nums[i] = Math.MAX_VALUE
      }else{
          max = Math.max(max,num)
      }

      map.set(num,i)
  }

  for(let i = 1;i<max;i++){
      if(map.has(i)){
          continue
      }

      return i
  }

  return max+1
}


var firstMissingPositive = function(nums) {
  const len = nums.length

  for(let i = 0;i<len;i++){
      while(nums[i] !== i+1){
          if(nums[i]<0||nums[i]>len){
              break
          }

          const ind = nums[i]-1
          if(nums[i]===nums[ind]){
              break
          }

          [nums[i],nums[ind]] = [nums[ind],nums[i]]
      }
  }

  for(let i = 0;i<len;i++){
      if(nums[i]===i+1){
          continue
      }

      return i+1
  }

  return len+1
}
