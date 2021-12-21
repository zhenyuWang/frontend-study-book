var nthSuperUglyNumber = function(n, primes) {
  // 创建结果数组
  const arr = Array(n).fill(1),
  len = primes.length,
  // 创建质因数指针
  inds = Array(len).fill(0),
  // 创建质因数与指针值乘积结果数组
  nums = [...primes];
  // 遍历求解每一个丑数
  for(let i = 1;i<n;i++){
    // 获取乘积最小值
    const min = Math.min(...nums);
    // 更新当前位置丑数
    arr[i] = min;
    // 更新质因数指针及质因数与指针值乘积结果
    for(let j = 0;j<len;j++){
      if(min === nums[j]){
        inds[j]++;
        nums[j] = arr[inds[j]]*primes[j]
      }
    }
  }
  // 返回第n个丑数
  return arr[n-1]
};