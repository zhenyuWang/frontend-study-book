// optimize insertSort
// O(n1.5)/O(1)
export default function shellSort(original:number[]){
  const len = original.length

  for(let step = len>>1;step>0;step = step>>1){
    for(let i = step;i<len;i+=step){
      for(let j = i-step;j>=0 && original[j]>original[j+step];j-=step){
        [original[j],original[j+step]] = [original[j+step],original[j]]
      }
    }
  }
}