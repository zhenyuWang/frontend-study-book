var judgeSquareSum = function(c) {
  // 获取给定数字开方后的值
  const max = Math.sqrt(c);
  // 判断该值是否是整数，如果是，则证明c是平方数之和
  if(is_integer(max)) return true;
  // 从1到max循环
  for(let i = 1;i<max;i++){
      // 获取(c-i的平方)开方后的值
      const target = Math.sqrt(c-Math.pow(i,2))
      // 判断是否是整数，如果是，则证明c是平方数之和
      if(is_integer(target)) return true;
  }
  return false;
};

/**
 * 判断是否是整数
 * @param {number} num
 * @return {boolean}
 */
function is_integer(num){
  return Math.floor(num)===num;
}

// 优化版本 => 调整max
var judgeSquareSum = function(c) {
  let max = Math.sqrt(c);
  if(isInteger(max)) return true;
  // 依次判断大于0的整数是否是满足条件的一个整数
  for(let i = 1;i<max;i++){
      const target = Math.sqrt(c-Math.pow(i,2))
      // console.log(i,target)
      if(isInteger(target)) return true;
      max = target;
  }
  return false;
  // 判断传入数值是否是整数
  function isInteger(num){
      return Math.floor(num) === num
  }
};