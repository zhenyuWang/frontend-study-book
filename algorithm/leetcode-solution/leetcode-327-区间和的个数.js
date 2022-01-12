var countRangeSum = function(nums, lower, upper) {
  // 初始化前缀和数组
  const sums = [0]
  // 获取前缀和数组
  for(let i = 0;i<nums.length;i++){
    sums[i+1] = sums[i]+nums[i]
  }
  // 初始化结果值
  let num = 0;
  // 获取前缀和数组长度并初始化归并排序暂存数组
  const len = sums.length,temp = Array(len);
  // 归并排序
  function mergeSort(l,r){
    // 如果区间中元素小于两个，直接返回
    if(l>=r) return;
    // 获取当前区间中间下标
    const mid = (l+r)>>1;
    // 递归处理左区间
    mergeSort(l,mid)
    // 递归处理右区间
    mergeSort(mid+1,r);
    // 初始化满足条件的起始位置和结束位置
    let start = l,end = l;
    // 遍历右区间的元素
    for(let j = mid+1;j<=r;j++){
      // 计算左区间中满足条件的匹配项的最大最小值
      const min = sums[j]-upper,
      max = sums[j]-lower;
      // 获取做区间中满足条件的匹配项的开始下标
      while(sums[start]<min&&start<=mid) start++
      // 获取做区间中满足条件的匹配项的结束下标
      while(sums[end]<=max&&end<=mid) end++
      // 计算满足条件元素的数量，并累加到结果值
      num += end-start
    }
    // 回溯过程合并左右有序区间
    let k = l,p1 = l,p2 = mid+1;
    while(p1<=mid || p2<=r){
      if(p2>r || (p1<=mid&&sums[p1]<=sums[p2])){
        temp[k++] = sums[p1++]
      }else{
        temp[k++] = sums[p2++]
      }
    }
    for(let i = l;i<=r;i++) sums[i] = temp[i]
  }
  mergeSort(0,len-1)
  // 返回结果
  return num;
};