var countSmaller = function(nums) {
  // 获取原数组长度
  const len = nums.length,
  // 初始化temp数组座位归并排序的额外存储空间
  temp = Array(len),
  // 创建下标数组
  inds = Array(len),
  // 初始化结果数组
  res = Array(len).fill(0);
  // 初始化下标数组
  for(let i = 0;i<len;i++){
    inds[i] = i;
  }
  // 因为我们要修改当前值在结果数组对应下标位置的值
  // 所以，如果针对数值进行排序的话，排序后是无法得到该数值之前的下标的
  // 所以我们需要对下标数组进行排序

  // 归并排序
  function mergeSort(l,r){
    if(l>=r) return;
    const mid = (l+r)>>1;
    mergeSort(l,mid)
    mergeSort(mid+1,r)
    // 合并之前，假设右区间元素都小于左区间元素，给左区间元素的结果值累加右区间元素数量
    for(let i = l;i<=mid;i++){
      res[inds[i]] += r-mid
    }
    // 回溯合并过程
    let k = l,i = l,j = mid+1
    while(i<=mid || j<=r){
      if(j>r || (i<=mid && nums[inds[i]]<=nums[inds[j]])){
        // 插入左区间元素后，右区间剩余的元素一定大于它，所以要给它的结果值减去右区间剩余元素
        res[inds[i]] -= r-j+1
        temp[k++] = inds[i++]
      }else{
        temp[k++] = inds[j++]
      }
    }
    for(let i = l;i<=r;i++){
      inds[i] = temp[i]
    }
  }
  // 调用归并排序方法
  mergeSort(0,len-1)
  // 返回结果数组
  return res;
};