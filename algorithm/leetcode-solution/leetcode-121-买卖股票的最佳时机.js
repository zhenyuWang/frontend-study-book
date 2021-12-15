var maxProfit = function(prices) {
  const len = prices.length
  // 初始化最低价格为第一天价格
  let min = prices[0],
  // 初始化最大利润为0
  res = 0;
  // 遍历每天价格
  for(let i = 1;i<len;i++){
      // 当天价格小于最低价格，更新最低价格
      if(min>prices[i]) min = prices[i]
      // 试着更新最大利润
      else res = Math.max(res,prices[i]-min)
  }
  return res;
};