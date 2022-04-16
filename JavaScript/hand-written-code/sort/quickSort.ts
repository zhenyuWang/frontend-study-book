// O(nlogn)
export default function quickSort(original:number[]):number[]{
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

  return [...quickSort(l),base,...quickSort(r)]
}