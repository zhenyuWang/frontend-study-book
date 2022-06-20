var jump = function(nums) {
  if(nums.length===1){
      return 0
  }

  let tail = 0
  let step = 1

  // 如果当前下标加上当前值达不到数组末尾位置，继续执行
  while(tail+nums[tail]<nums.length-1){
      let targetIndex
      let max = 0
      // 每次在范围内找到可以跳的最远的位置跳
      for(let i = tail;i<=tail+nums[tail];i++){
          if(i+nums[i]>max){
              max = i+nums[i]
              targetIndex = i
          }
      }

      tail = targetIndex
      step++
  }

  return step
}
