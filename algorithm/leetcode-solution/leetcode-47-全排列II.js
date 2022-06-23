var permuteUnique = function(nums) {
  const res = []
  nums.sort((a,b) => a-b)

  function getRes(nums,arr){
      if(nums.length===0){
          res.push(arr)
          return;
      }
      for(let i = 0;i<nums.length;i++){
          if(i>0 && nums[i] === nums[i-1]){
              continue
          }

          const _nums = [...nums]
          const _arr = [...arr]
          _arr.push([_nums.splice(i,1)])
          getRes(_nums,_arr)
      }
  }
  getRes(nums,[])

  return res
}
