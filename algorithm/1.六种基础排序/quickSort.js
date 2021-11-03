/* 
  快速排序
  不停递归拆分数组直到数组长度为1
  递归回溯过程中组合left,base,right
  取数组的某一项为基准 base，将小于该基准的数组放到left，反之放到right
*/
const origin = [5,4,3,2,1,0,9,8,7,6]

function quickSort(arr){
  if(arr.length<2) return arr;
  const base = arr.pop(),left = [],right = [];
  for(let i = 0;i<arr.length;i++){
    if(arr[i]<base)
      left.push(arr[i])
    else
      right .push(arr[i])
  }
  return [...quickSort(left),base,...quickSort(right)]
}
console.log('quickSort',quickSort([...origin]));