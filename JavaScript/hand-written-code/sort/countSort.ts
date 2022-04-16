// O(n)/O(1)
export default function countSort(original:number[]){
  const len = original.length
  const min = Math.min(...original)
  const counts:number[] = []

  for(let i = 0;i<len;i++){
    const item = original[i]
    const target = item-min

    if(counts[target]!==undefined){
      counts[target]++
    }else{
      counts[target] = 1
    }
  }

  original.length = 0

  for(let i = 0;i<counts.length;i++){
    while(counts[i]){
      original.push(i+min)
      counts[i]--
    }
  }
}