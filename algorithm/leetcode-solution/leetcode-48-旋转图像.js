// 整个矩阵旋转 90 度，相当于每一圈分别旋转 90 度
// 把每一圈想象成一个正方形，旋转 90 度相当于每条边依次向后换一下
// 最内圈需要旋转的正方形起始坐标是 (x,x), x = Math.floor(n /2 ) - 1，边长 sideLen = n - 2 * x
var rotate = function (matrix) {
  const n = matrix.length
  const minSquareTopLeftX = Math.floor(n / 2) - 1

  for (let min = minSquareTopLeftX; min >= 0; min--) {
    const sideLen = n - 2 * min
    const max = min + sideLen - 1
    let preSideNumList = initPreSideNumList(min, sideLen)
    let currentSideNumList = []

    for (let step = 1; step <= 4; step++) {
      if (step === 1) {
        handleRightSide(preSideNumList, currentSideNumList, min, sideLen, max)
      }
      if (step === 2) {
        preSideNumList = currentSideNumList
        currentSideNumList = []
        handleBottomSide(preSideNumList, currentSideNumList, min, max)
      }
      if (step === 3) {
        preSideNumList = currentSideNumList
        currentSideNumList = []
        handleLeftSide(preSideNumList, currentSideNumList, min, max)
      }
      if (step === 4) {
        preSideNumList = currentSideNumList
        handleTopSide(preSideNumList, min, sideLen, max)
      }
    }
  }

  function initPreSideNumList(min, sideLen) {
    const result = []
    for (let j = min; j < min + sideLen; j++) {
      result.push(matrix[min][j])
    }
    return result
  }
  function handleRightSide(preSideNumList, currentSideNumList, min, sideLen, max) {
    for (let j = min; j < min + sideLen; j++) {
      currentSideNumList.push(matrix[j][max])
      matrix[j][max] = preSideNumList[j - min]
    }
  }
  function handleBottomSide(preSideNumList, currentSideNumList, min, max) {
    for (let j = max; j >= min; j--) {
      if (j === max) {
        currentSideNumList.push(preSideNumList.at(-1))
      } else {
        currentSideNumList.push(matrix[max][j])
      }
      matrix[max][j] = preSideNumList[max - j]
    }
  }
  function handleLeftSide(preSideNumList, currentSideNumList, min, max) {
    for (let j = max; j >= min; j--) {
      if (j === max) {
        currentSideNumList.push(preSideNumList.at(-1))
      } else {
        currentSideNumList.push(matrix[j][min])
      }
      matrix[j][min] = preSideNumList[max - j]
    }
  }
  function handleTopSide(preSideNumList, min, sideLen) {
    for (let j = min; j < min + sideLen; j++) {
      matrix[min][j] = preSideNumList[j - min]
    }
  }
}

var rotate = function (matrix) {
  const n = matrix.length

  // 水平翻转
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < n; j++) {
      [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]]
    }
  }
  // 对角线翻转
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
}