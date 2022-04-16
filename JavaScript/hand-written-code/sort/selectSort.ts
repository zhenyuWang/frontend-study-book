// O(n²)/O(1)
export default function selectSort(original:number[]){
  const len = original.length

  for(let i = 0;i<len-1;i++){
    for(let j = i+1;j<len;j++){
      if(original[j]<original[i]){
        [original[i],original[j]] = [original[j],original[i]]
      }
    }
  }
}