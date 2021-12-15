/*
  快速排序
  不停递归拆分数组直到数组长度为1
  递归回溯过程中组合left,base,right
  取数组的某一项为基准 base，将小于该基准的数组放到left，反之放到right
*/
let origin = [5,4,3,2,1,0,9,8,7,6]
function quickSort1(arr){
  if(arr.length<2) return arr;
  const base = arr.pop(),left = [],right = [];
  for(let i = 0;i<arr.length;i++){
    if(arr[i]<base)
      left.push(arr[i])
    else
      right.push(arr[i])
  }
  return [...quickSort1(left),base,...quickSort1(right)]
}
console.log('quickSort1',quickSort1([...origin]));

/*
  通过交换元素完成快排，
  相对第一种方法，优点是无需创建大量数组，空间复杂度为O(1)
*/
origin = [5,4,9,3,2,5,1,0,8,7,6]
function handle(arr, left, right) {
  if(left>=right) return left;

  const base = arr[left]
  let l = left + 1;
  let r = right;
  while (l <= r) {
    if(arr[l] < base) {
      l++;
    } else if(arr[r] >= base) {
      r--;
    } else {
      // 存在 l<r && arr[l]>arr[r] 的情况 进行交换
      [arr[l],arr[r]] = [arr[r],arr[l]]
      l++,r--
    }
  }
  // 将起始元素与最后一个小于它的值交换
  [arr[left],arr[l-1]] = [arr[l-1],arr[left]]
  // 返回基准值下标
  return l - 1;
}

function quickSort2(arr, l, r) {
  if (l < r) {
    const ind = handle(arr, l, r);
    // 递归处理基准值左侧区间
    quickSort2(arr, l, ind - 1);
    // 递归处理基准值右侧区间
    quickSort2(arr, ind + 1, r);
  }
  return arr;
}
