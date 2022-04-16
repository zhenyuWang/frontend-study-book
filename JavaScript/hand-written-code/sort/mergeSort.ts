
function mergeByRecursive(left:number[],right:number[]):number[]{
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

// O(nlogn)/O(nlogn)
export function mergeSortByRecursive(original:number[]):number[]{
  if(original.length<2){
    return original
  }

  const mid = original.length>>1

  return mergeByRecursive(mergeSortByRecursive(original.slice(0,mid)),mergeSortByRecursive(original.slice(mid)))
}


function mergeByExchange(arr:number[],l:number,mid:number,r:number){
  const temp = [...arr]
  let i = l
  let j = mid+1

  for(let k = l;k<=r;k++){
    if(i>mid){
      arr[k] = temp[j++]
    }else if(j>r){
      arr[k] = temp[i++]
    }else if(temp[i]<temp[j]){
      arr[k] = temp[i++]
    }else{
      arr[k] = temp[j++]
    }
  }
}

// O(nlogn)/O(n)
export function mergeSortByExchange(original:number[],left:number,right:number){
  if(left>=right){
    return
  }

  const mid = (left+right)>>1

  mergeSortByExchange(original,left,mid)
  mergeSortByExchange(original,mid+1,right)

  mergeByExchange(original,left,mid,right)

}