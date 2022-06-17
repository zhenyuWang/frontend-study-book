var combinationSum = function(candidates, target) {
  const res = []

  const dfs = (target, combine, index) => {
     if (index === candidates.length) {
         return
     }
     if (target === 0) {
         res.push(combine)
         return;
     }

     // 不选择当前元素
     dfs(target, combine, index + 1)

     // 选择当前元素
     if (target - candidates[index] >= 0) {
         dfs(target - candidates[index], [...combine, candidates[index]], index)
     }
  }

  dfs(target, [], 0)

  return res
 }
