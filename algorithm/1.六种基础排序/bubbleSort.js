/* 
  冒泡排序
  就像水中的气泡向上浮动一样，只不过这里是浮动到对应的下标为终点位置
*/
const origin = [5,4,3,2,1,0,9,8,7,6]
function bubbleSort(arr){
  const len = arr.length;
  for(let i = 0;i<len-1;i++){
    for(let j = 0;j<len-1-i;j++){
      if(arr[j+1]<arr[j]) [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
    }
  }
  return arr;
}
console.log('bubbleSort',bubbleSort([...origin]))