// O(nlogn)/O(nlogn)
export function quickSortByRecursive(original:number[]):number[]{
  if(original.length<2){
    return original
  }

  const base = original.pop()!
  const l:number[] = []
  const r:number[] = []

  for(let i = 0;i<original.length;i++){
    const item = original[i]

    if(item<=base){
      l.push(item)
    }else{
      r.push(item)
    }
  }

  return [...quickSortByRecursive(l),base,...quickSortByRecursive(r)]
}


function getMid(arr:number[],left:number,right:number):number{
  const l = left
  const base = arr[l]
  left++

  while(left<right){
    if(arr[left]<base){
      left++
    }else if(arr[right]>=base){
      right--
    }else{
      [arr[left],arr[right]] = [arr[right],arr[left]]
      left++
      right--
    }
  }

  if(arr[left]<base){
   [arr[l],arr[left]] = [arr[left],arr[l]]

   return left
  }

  [arr[l],arr[left-1]] = [arr[left-1],arr[l]]

  return left-1
}

// O(nlogn)/O(1)
export function quickSortByExchange(original:number[],left:number,right:number){
  if(left>=right){
    return
  }

  const mid = getMid(original,left,right)

  quickSortByExchange(original,left,mid-1)
  quickSortByExchange(original,mid+1,right)
}