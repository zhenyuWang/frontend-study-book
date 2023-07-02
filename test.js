function transform(arr) {
  const rowLen = arr[0].length;
  const colLen = arr.length;
  const result = [];
  for (let i = 0; i < rowLen; i++) {
    result[i] = [];
  }
  for (let i = 0; i < colLen; i++) {
    for (let j = 0; j < rowLen; j++) {
      result[j][i] = arr[i][j];
    }
  }
  return result
}

const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
const result = transform(arr);
console.log(result)
