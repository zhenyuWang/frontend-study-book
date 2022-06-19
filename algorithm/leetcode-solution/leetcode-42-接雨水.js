var trap = function(height) {
  const len = height.length
  let maxInd = 0
  let res = 0

  // 获取最高点下标
  for(let i = 1;i<len;i++){
      if(height[i]>height[maxInd]){
          maxInd = i
      }
  }

  // 计算最高点左边可以接到的雨水
  let curMax = 0
  for(let i = 1;i<maxInd;i++){
      if(height[i]>height[curMax]){
          curMax = i
      }

      res += height[curMax]-height[i]
  }

  // 计算最高点右边可以接到的雨水
  curMax = len-1

  for(let i = len-2;i>maxInd;i--){
      if(height[i]>height[curMax]){
          curMax = i
      }

      res += height[curMax]-height[i]
  }

  return res
}
