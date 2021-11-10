/* 
  归并排序
  在递归回溯的过程中，组合左右两部分数组
  组合过程中，每次比较两个数组的第一位，将更小的值取出放入结果数组，直到两个数组中某一个清空，组合结果返回
  通过递归每次两分的拆分数组，直到数组中只有一个元素为止
*/
const origin = [5,4,3,2,1,0,9,8,7,6]

function mergeSort(arr){
  if(arr.length===1) return arr;
  function merge(left,right){
    const res = [];
    while(left.length&&right.length){
      if(left[0]<right[0])
        res.push(left.shift())
      else
        res.push(right.shift())
    }
    return [...res,...left,...right]
  }
  const mid = arr.length >> 1;
  return merge(
    mergeSort(arr.slice(0,mid)),
    mergeSort(arr.slice(mid))
  )
}
console.log('mergeSort',mergeSort([...origin]));