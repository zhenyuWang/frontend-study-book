var nthUglyNumber = function(n) {
  // 创建结果数组
  const arr = Array(n).fill(1);
  // 创建质因数指针
  let ind2 = 0,ind3 = 0,ind5 = 0,
  // 创建质因数与指针值乘积结果
  num2 = 0,num3 = 0,num5 = 0;
  // 遍历求解每一个丑数
  for(let i = 1;i<n;i++){
    // 更新质因数与指针值乘积结果
    num2 = 2*arr[ind2],
    num3 = 3*arr[ind3],
    num5 = 5*arr[ind5];
    // 获取乘积最小值
    const min = Math.min(num2,num3,num5);
    // 更新当前位置丑数
    arr[i] = min;
    // 更新质因数指针
    if(min===num2) ind2++;
    if(min===num3) ind3++;
    if(min===num5) ind5++;
  }
  // 返回第n个丑数
  return arr[n-1]
};