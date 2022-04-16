// O(n)/O(n)
export default function radixSort(original:number[]){
  function low16(num:number):number{
    return num & 0xffff
  }

  function _high16(num:number):number{
    return num & 0xffff0000 >> 16
  }

  function hight16(num:number):number{
    const h = _high16(num)

    return h>32767?h-32768:h+32768
  }

  const len = original.length
  const temp = Array(len)
  const counts = Array(65536).fill(0)

  for(let i = 0;i<len;i++){
    counts[low16(original[i])]++
  }

  for(let i = 1;i<65536;i++){
    counts[i] += counts[i-1]
  }

  for(let i = len-1;i>=0;i--){
    temp[--counts[low16(original[i])]] = original[i]
  }

  for(let i = 0;i<65536;i++){
    counts[i] = 0
  }

  for(let i = 0;i<len;i++){
    counts[hight16(original[i])]++
  }

  for(let i = 1;i<65536;i++){
    counts[i] += counts[i-1]
  }

  for(let i = len-1;i>=0;i--){
    original[--counts[hight16(temp[i])]] = temp[i]
  }
}