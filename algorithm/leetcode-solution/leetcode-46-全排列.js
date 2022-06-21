var permute = function(nums) {
  let res = []

  function getRes(nums,arr){
    if(nums.length===0){
      res.push(arr)
      return
    }

    for(let i = 0;i<nums.length;i++){
      const _arr = [...arr]
      const nums = [...nums]
      _arr.push(_nums.splice(i,1))
      getRes(_nums,_arr)
    }
  }

  getRes(nums,[])

  return res
}
