var maximumScore = function(a, b, c) {
  // 获取较小两堆的和值
  const arr = [a,b,c]
  arr.sort((a,b) => a-b)
  const sum = arr[0]+arr[1]
  // 判断较小两堆和值是否小于最大堆数量
  if(sum<=arr[2]){
    // 如果最大堆数量大于其余两堆数量，最大分数为其余两堆数量之和
    return sum;
  }else{
    // 否则为石子总数除以2向下取整
    return (sum+arr[2])>>1
  }
};