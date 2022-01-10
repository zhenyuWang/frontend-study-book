var reversePairs = function(nums) {
  // 获取数组长度
  const len = nums.length,
  // 根据输入数组长度，创建额外存储区暂存区间排序结果
  arr = Array(len);
  // 归并排序 并返回逆序对数量
  function getCount(l,r){
    // 如果当前区间中元素数量小于等于1，则返回0
    if(l>=r) return 0;
    // 获取中间下标，拆分左右子区间
    const mid = (l+r)>>1;
    // 初始化区间中逆序对数量为0
    let res = 0;
    // 获取左区间逆序对数量
    res += getCount(l,mid);
    // 获取右区间逆序对数量
    res += getCount(mid+1,r);
    // 回溯组合过程
    let k = l,i = l,j = mid+1;
    while(i<=mid || j<=r){
      if(j>r || (i<=mid && nums[i]<=nums[j])){
        arr[k++] = nums[i++]
      }else{
        // 如果此时放入的是右侧数组的元素，当前左侧数组中未处理的元素都与当前元素组成逆序对
        arr[k++] = nums[j++]
        res += mid-i+1
      }
    }
    // 将排序后的结果更新到原数组
    for(let i = l;i<=r;i++){
      nums[i] = arr[i]
    }
    return res;
  }
  // 返回归并排序后的返回值
  return getCount(0,len-1)
};