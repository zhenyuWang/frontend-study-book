/* 
  遍历原数组并将值存储到计数数组的对应下标位置并用该下标位置的值记录出现次数
  遍历计数数组，当该下标位置值不为0，将下标数值插入到结果数组末尾，切该下标位置值-1
*/

let origin = [6,5,4,3,2,1,0,8,7,1,2,3]

// 只可以处理非负整数
function countSort(arr){
  countArr = [],
  res = [];
  for(let i = 0;i<arr.length;i++){
    if(countArr[arr[i]] === undefined) countArr[arr[i]] = 0
    countArr[arr[i]]++
  }
  for(let i = 0;i<countArr.length;i++){
    while(countArr[i]){
      res.push(i)
      countArr[i]--
    }
  }
  return res;
}
console.log('countSort',countSort([...origin]));

origin = [6,5,4,3,2,1,0,8,7,1,2,3,-3,-2,-1,-3,-3,-2]

// 可以处理负数
function countSort(arr){
  const min = Math.min(...arr),
  countArr = [],
  res = [];
  for(let i = 0;i<arr.length;i++){
    if(countArr[arr[i]-min] === undefined) countArr[arr[i]-min] = 0
    countArr[arr[i]-min]++
  }
  for(let i = 0;i<countArr.length;i++){
    while(countArr[i]){
      res.push(i+min)
      countArr[i]--
    }
  }
  return res;
}

console.log('countSort',countSort([...origin]));