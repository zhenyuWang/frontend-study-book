// O(n²)/O(1)
export default function insertSort(original:number[]){
  const len = original.length

  for(let i = 0;i<len;i++){
    for(let j = i;j>0;j--){
      if(original[j-1]>original[j]){
        [original[j-1],original[j]] = [original[j],original[j-1]]
      }else{
        break
      }
    }
  }
}