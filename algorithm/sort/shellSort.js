/* 
  希尔排序
  插入排序再遇到比它小的值之前，要不停的交换
  针对这个问题，一个名叫希尔的大佬设计了该算法，将数据分组进行插入排序
  分组的依据就是步长
  步长每次/2
  直到步长为1
  这样可以让交换的过程尽量变短
  插入排序的优化排序算法
*/
const origin = [5,4,3,2,1,0,9,8,7,6]

function shellSort(arr){
  const len = arr.length;
  // 处理步长
  for(let step = len >> 1;0<step;step = step >> 1){
    // 分组插入排序
    for(let i = step;i<len;i++){
      for(let j = i;j>=step&&arr[j]<arr[j-step];j-=step){
        [arr[j-step],arr[j]] = [arr[j],arr[j-step]]
      }
    }
  }
  return arr
}
console.log('shellSort',shellSort([...origin]));