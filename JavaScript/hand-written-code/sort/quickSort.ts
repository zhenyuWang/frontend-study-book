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

function getMid(original:number[],left:number,right:number){
  const mid = original[left]
  let l = left+1
  let r = right

  while(l<r){
    if(original[l]<mid){
      l++
    }else if(original[r]>=mid){
      r--
    }else{
      [original[l],original[r]] = [original[r],original[l]]

      l++
      r--
    }
  }

  if(original[l]<mid){
    [original[left],original[l]] = [original[l],original[left]]

    return l
  }

  [original[left],original[l-1]] = [original[l-1],original[left]]

  return l-1
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