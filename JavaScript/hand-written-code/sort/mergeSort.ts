function merge(left:number[],right:number[]):number[]{
  const res:number[] = []

  while(left.length && right.length){
    if(left[0]<right[0]){
      res.push(left.shift()!)
    }else{
      res.push(right.shift()!)
    }
  }

  return res.concat(left).concat(right)
}

// O(nlogn)
export default function mergeSort(original:number[]):number[]{
  if(original.length<2){
    return original
  }

  const mid = original.length>>1

  return merge(mergeSort(original.slice(0,mid)),mergeSort(original.slice(mid)))
}