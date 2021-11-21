// O(nlogn)
var findMedianSortedArrays = function(nums1, nums2) {
  // 合并数组
  const arr = [...nums1,...nums2],
  // 获取数组长度
  len = arr.length;
  // sort 排序
  arr.sort((a,b) => a-b)
  // 获取中间下标
  const midIndex = len>>1
  // 判断数组长度奇偶返回对应结果
  return len%2?arr[midIndex]:(arr[midIndex-1]+arr[midIndex])/2
}

// O((m+n)>>1+1)
var findMedianSortedArrays = function(nums1, nums2) {
  // 获取两数组长度
 const len1 = nums1.length;len2 = nums2.length,
//  获取两数组中长度
  len = len1+len2,
  // 初始化arr存放有序元素
  arr = [],
  // 获取第一个中位数下标
  mid=len>>1;
  // 初始化指针
  let tail1 = tail2 = 0;
  // 当两数组不为空，将两指针更小值放入arr
  while(tail1<len1||tail2<len2){
    if(tail1===len1){
      arr.push(nums2[tail2]);
      tail2++;
    }else if(tail2===len2){
      arr.push(nums1[tail1]);
      tail1++;
    }else if(nums1[tail1]>nums2[tail2]){
      arr.push(nums2[tail2]);
      tail2++;
    }else{
      arr.push(nums1[tail1]);
      tail1++;
    }
    // 如果数组中有mid+1个元素的时候，即可返回结果
    if(arr.length>mid){
      if(len%2) return arr[mid]
      return (arr[mid-1]+arr[mid])/2
    }
  }
}


// 二分 O(logn)
var findMedianSortedArrays = function (nums1, nums2) {
  const len1 =nums1.length,
  len2 = nums2.length,
  // 两数组长度之和
  len = len1+len2,
  // 中位数为第 mid 大的值
  // 如果len为奇数，则中位数就是第 mid 大的值
  // 否则是第 mid 和第 mid+1 大的值
  mid = (len+1)>>1;
  // 奇数
  if(len%2) return getNum(nums1,0,nums2,0,mid)
  // 偶数 
  return (getNum(nums1,0,nums2,0,mid)+getNum(nums1,0,nums2,0,mid+1))/2
  /**
    @param  {array} arr1 被寻找的第一个数组
    @param  {number} ind1 第一个数组的起始下标 
    @param  {array} arr2 被寻找的第二个数组
    @param  {number} ind2 第二个数组的起始下标 
    @param  {number} k 要寻找的是第k大值
    @return {number} 找到的第k大值
   */
  function getNum(arr1,ind1,arr2,ind2,k){
    // 某个数组空了，剩下的个数取另一个没空的数组的值
    if(ind1 === arr1.length) return arr2[ind2+k-1]
    if(ind2 === arr2.length) return arr1[ind1+k-1]
    // 还差一步，返回当前两个值中的最小值
    if(k==1) return Math.min(arr1[ind1],arr2[ind2])
    // 第一个数组尝试向后走一半距离，如果不够，走到数组末尾
    let step1 = Math.min(k>>1,arr1.length-ind1)
    // 第二个数组尝试向后走k-第一个数组走的距离，如果不够，走到数组末尾
    let step2 = Math.min(k-step1,arr2.length-ind2)
    // 再用step2倒推一下step1
    step1 = k-step2
    // 说明 arr1[ind1+step1] 之前的元素可以排除
    if(arr1[ind1+step1-1]<arr2[ind2+step2-1]){
      return getNum(arr1,ind1+step1,arr2,ind2,k-step1)
    }
    // 反之 arr2[ind2+step2] 之前的元素可以排除
    return getNum(arr1,ind1,arr2,ind2+step2,k-step2)
  }
};