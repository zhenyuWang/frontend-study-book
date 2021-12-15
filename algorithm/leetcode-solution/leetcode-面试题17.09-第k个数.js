// 1,3,5,7,9,15,21,15,25,35,21,35,49,27,45,63
// 3 3 3 3 3
// 5 5 5 5 5
// 7 7 7 7 7
var getKthMagicNumber = function(k) {
  // 初始化数组
  let arr = [1],
  // 标识当前处理数值的下标
  cur = 0;
  // 当数组中数值数量小于 k*1.3 的时候，求得更多的符合条件的数字
  // 不是k个是因为会出现前大后小的情况，所以第k个值出现的位置是在大于k的位置
  while(arr.length<Math.floor(k*1.3)){
    const num1 = arr[cur]*3,
    num2 = arr[cur]*5,
    num3 = arr[cur]*7;
    if(arr.indexOf(num1)===-1) arr = insert(arr,num1);
    if(arr.indexOf(num2)===-1) arr = insert(arr,num2);
    if(arr.indexOf(num3)===-1) arr = insert(arr,num3);
    cur++;
  }
  return arr[k-1]
  // 将num插入到合适的位置
  function insert(arr,num){
    let cur = arr.length-1;
    while(arr[cur]>num){
      cur--;
    }
    arr.splice(cur+1,0,num);
    return arr;
  }
}

var getKthMagicNumber = function(k) {
  // 初始化数组
  const arr = [1];
  // 初始化三个指针
  let tail3 = tail5 = tail7 = 0;
  for(let i = 1;i<k;i++){
    // 获取每个素因子与其指针对应值的乘积
    const num1 = arr[tail3]*3,
    num2 = arr[tail5]*5,
    num3 = arr[tail7]*7;
    // 将最小值更新为当前位置的值
    arr[i] = Math.min(num1,num2,num3);
    // 将对应指针的位置向后移动一位
    if(arr[i]===num1) tail3++
    if(arr[i]===num2) tail5++
    if(arr[i]===num3) tail7++
  }
  return arr[k-1]
};