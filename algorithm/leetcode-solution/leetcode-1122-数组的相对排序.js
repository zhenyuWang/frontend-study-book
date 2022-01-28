var relativeSortArray = function(arr1, arr2) {
  // 创建额外存储空间存储每个值的出现次数
  const temp = []
  // 遍历输入数组，并计数
  for(let i = 0;i<arr1.length;i++){
    const num = arr1[i]
    if(temp[num]===undefined) temp[num] = 1
    else temp[num]++
  }
  // 创建结果数组
  const res = []
  // 按照 arr2 中元素的顺序放入 arr1 中相同的元素
  for(let i = 0;i<arr2.length;i++){
    const num = arr2[i]
    while(temp[num]){
      res.push(num)
      temp[num]--
    }
  }
  // 将剩余元素从小到大插入结果数组
  for(let i = 0;i<temp.length;i++){
    if(temp[i]===0) continue
    while(temp[i]){
      res.push(i)
      temp[i]--
    }
  }
  // 返回结果数组
  return res;
};