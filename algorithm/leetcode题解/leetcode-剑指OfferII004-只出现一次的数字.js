/* 
  利用map记录每个值出现的次数
  当值出现三次的时候，从map中删除
  最后map中保存的就是出现一次的元素的值，以及对应的次数1
*/

var singleNumber = function(nums) {
  const map = new Map();
  for(let i = 0;i<nums.length;i++){
      if(map.has(nums[i])){
          if(map.get(nums[i])===2) map.delete(nums[i])
          else map.set(nums[i],2)
      }
      else map.set(nums[i],1)
  }

  let ret;
  map.forEach((val,key) => {
      ret = key;
  })
  return ret;
};