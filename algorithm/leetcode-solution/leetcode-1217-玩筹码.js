var minCostToMoveChips = function (position) {
  const len = position.length
  let oddNum = 0

  for (let i = 0; i < len; i++) {
    if (position[i] % 2) {
      oddNum++
    }
  }

  return Math.min(oddNum, len - oddNum)
}