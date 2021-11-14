var sortArray = function(nums) {
  // bubbleSort 8480ms
  // selectSort 2576ms
  // insertSort 6080ms
  // shellSort   136ms
  // mergeSort  4056ms
  // quickSort  2944ms
  // countSort   132ms
  // sort        136ms
  nums.sort((a,b) => a-b)
  return nums;
}