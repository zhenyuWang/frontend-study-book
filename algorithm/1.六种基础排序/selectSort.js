/* 
  选择排序
  每次获取到待排序区间的最值，放到以排序区间的末尾
*/
const origin = [5,4,3,2,1,0,9,8,7,6]
function selectSort(arr){
  for(let i = 0;i<arr.length-1;i++){
    let ind = i
    for(let j = i+1;j<arr.length;j++){
      if(arr[j]<arr[ind]) ind = j;
    }
    if(ind!==i){
      const tmp = arr[ind]
      arr[ind] = arr[i]
      arr[i] = tmp
    }
  }
  return arr;
}
console.log('selectSort',selectSort([...origin]));