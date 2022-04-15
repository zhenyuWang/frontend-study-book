// O(n²)/O(1)
export default function bubbleSort(original:number[]) {
  const len = original.length

  for (let i = 0; i < len - 1; i++) {
    for (let j = 1; j < len - i; j++) {
      if (original[j - 1] > original[j]) {
        [original[j - 1], original[j]] = [original[j], original[j - 1]]
      }
    }
  }
}