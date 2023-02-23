function getCombination(candidates, start, combination, sum, target) {
  const result = []

  for (let i = start; i < candidates.length; i++) {
    if (i > start && candidates[i - 1] === candidates[i]) {
      continue
    }

    const _sum = sum + candidates[i]
    if (_sum < target) {
      result.push(...getCombination(candidates, i + 1, [...combination, candidates[i]], _sum, target))
    } else if (_sum === target) {
      result.push([...combination, candidates[i]])
    } else {
      break
    }
  }

  return result
}

var combinationSum2 = function (candidates, target) {
  const result = []

  candidates.sort((a, b) => a - b)

  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i] === target && !result.includes(target)) {
      result.push([target])
      candidates.splice(i + 1)
    }
    if (candidates[i] > target) {
      candidates.splice(i)
    }
  }

  for (let i = 0; i < candidates.length; i++) {
    if (i > 0 && candidates[i - 1] === candidates[i]) {
      continue
    }
    result.push(...getCombination(candidates, i + 1, [candidates[i]], candidates[i], target))
  }

  return result
}