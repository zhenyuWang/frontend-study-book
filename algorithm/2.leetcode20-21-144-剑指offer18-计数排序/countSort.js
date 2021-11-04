let origin = [6,5,4,3,2,1,0,8,7,1,2,3]

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