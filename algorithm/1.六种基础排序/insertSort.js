/* 
  插入排序
  就像码牌一样，每次将新的值放到有序数组的合适位置
*/

const origin = [5,4,3,2,1,0,9,8,7,6]

function insertSort(arr){
  for(let i = 1;i<arr.length;i++){
    // 将新的值插入到已排序区间的合适位置
    for(let j = i;0<j;j--){
      if(arr[j]<arr[j-1]) [arr[j-1],arr[j]] = [arr[j],arr[j-1]]
    }
  }
  return arr;
}

console.log('insertSort',insertSort([...origin]));