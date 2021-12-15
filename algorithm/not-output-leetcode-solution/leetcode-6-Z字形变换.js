var convert = function(s, numRows) {
  if(s.length===1 || numRows === 1 || s.length<=numRows) return s;
  let direction = false,
  status='line',
  curInd = 0;
  arr = Array(numRows);
  if(numRows === 2){
    arr = [[],[]]
    for(let i = 0;i<s.length;i++){
      arr[i%2].push(s[i])
    }
  }else{
    for(let i = 0;i<s.length;i++){
      if(arr[curInd]===undefined) arr[curInd] = [];
      arr[curInd].push(s[i])
      if(status==='line'){
        if(curInd===numRows-1){
          if(direction) curInd = 1;
          else curInd = numRows-2;
          status = 'dot'
        }else{
          curInd++
        }
      }else{
        if((curInd === 1 && !direction) || (curInd === numRows-2 && direction)){
          curInd = 0
          status = 'line';
          direction != direction
        }else{
          curInd += direction?1:-1
        }
      }
    }
  }

  let res = '';
  for(let i = 0;i<arr.length;i++){
    res += arr[i].join('')
  }
  return res;
};