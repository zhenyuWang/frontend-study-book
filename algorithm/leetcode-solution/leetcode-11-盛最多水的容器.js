// 基础版本暴力求解 超时
var resArea = function(height) {
  // 获取输入数组长度
  const len = height.length;
  // 初始化结果值为 0
  let res = 0;
  // 双层循环获取所有组合
  for(let i = 0;i<len-1;i++){
    const hi = height[i]
    for(let j = i+1;j<len;j++){
      // 尝试用当前组合容积更新结果值
      res = Math.res(res,Math.min(hi,height[j])*(j-i))
    }
  }
  // 返回结果值
  return res;
};

// 优化版暴力求解 可以通过
var maxArea = function(height) {
  // 获取输入数组长度
  const len = height.length;
  // 初始化左侧柱子下标，初始化结果值为 0
  let l,res = 0;
  // 双层循环获取所有组合
  for(let i = 0;i<len-1;i++){
    // 如果后续柱子不高于当前标记 l ,则肯定找不到更大的容器，直接跳过
    if(height[i]<=height[l]) continue;
    const hi = height[i]
    for(let j = i+1;j<len;j++){
      const area = Math.min(hi,height[j])*(j-i);
      // 如果当前组合更新了结果值，则将 l 更新为当前组合左侧柱子下标
      if(area>res) l = i,res = area;
    }
  }
  return res;
};

// 两指针解题
var maxArea = function(height) {
  // 初始化结果值为 0
  let res = 0,
  // 定义两个指针
  l = 0,r = height.length-1;
  while(l<r){
    // 尝试用当前组合容积更新结果值
    const hl = height[l],hr = height[r];
    res = Math.max(res,Math.min(hl,hr)*(r-l))
    // 移动更矮的柱子
    if(hl<hr) l++
    else r--
  }
  // 返回结果值
  return res;
};