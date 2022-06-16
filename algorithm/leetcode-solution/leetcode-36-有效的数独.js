function getOrigin(){
  return {
      '1':0,
      '2':0,
      '3':0,
      '4':0,
      '5':0,
      '6':0,
      '7':0,
      '8':0,
      '9':0,
  }
}

function checkArr(arr){
  const counts = getOrigin()

  for(let i = 0;i<9;i++){
      if(counts[arr[i]]){
          return false
      }else{
          counts[arr[i]]++
      }
  }

  return true
}
var isValidSudoku = function(board) {
  // 处理每一行
  for(let i = 0;i<9;i++){
      if(!checkArr(board[i])){
          return false
      }
  }
  // 处理每一列
  for(let i = 0;i<9;i++){
      const arr = []
      for(let j = 0;j<9;j++){
          if(board[j][i] === '.'){
              continue
          }
          arr.push(board[j][i])
      }
      if(!checkArr(arr)){
          return false
      }
  }
  // 处理 9 个九宫格
  for(let i = 0;i<3;i++){
      for(let j = 0;j<3;j++){
          const arr = []

          for(let k = j*3;k<j*3+3;k++){
              for(let h = 3*i;h<3*i+3;h++){
                  if(board[k][h] === '.'){
                      continue
                  }
                  arr.push(board[k][h])
              }
          }

          if(!checkArr(arr)){
              return false
          }
      }
  }

  return true
}

function getOrigin(){
  return {
      '1':0,
      '2':0,
      '3':0,
      '4':0,
      '5':0,
      '6':0,
      '7':0,
      '8':0,
      '9':0,
  }
}
var isValidSudoku = function(board) {
  const lines = []
  const columns = []
  const scratchableLatexs = []

  for(let i = 0;i<9;i++){
      lines[i] = getOrigin()
      columns[i] = getOrigin()
      scratchableLatexs[i] = getOrigin()
  }

  for(let i = 0;i<9;i++){
      for(let j = 0;j<9;j++){
          const item = board[i][j]
          if(item === '.'){
              continue
          }

          if(lines[i][item]){
              return false
          }else{
              lines[i][item]++
          }

          if(columns[j][item]){
              return false
          }else{
              columns[j][item]++
          }

          if(i<3){
              if(j<3){
                  if(scratchableLatexs[0][item]){
                      return false
                  }else{
                      scratchableLatexs[0][item]++
                  }
              }else if(j<6){
                  if(scratchableLatexs[1][item]){
                      return false
                  }else{
                      scratchableLatexs[1][item]++
                  }
              }else{
                  if(scratchableLatexs[2][item]){
                      return false
                  }else{
                      scratchableLatexs[2][item]++
                  }
              }
          }else if(i<6){
              if(j<3){
                  if(scratchableLatexs[3][item]){
                      return false
                  }else{
                      scratchableLatexs[3][item]++
                  }
              }else if(j<6){
                  if(scratchableLatexs[4][item]){
                      return false
                  }else{
                      scratchableLatexs[4][item]++
                  }
              }else{
                  if(scratchableLatexs[5][item]){
                      return false
                  }else{
                      scratchableLatexs[5][item]++
                  }
              }
          }else{
              if(j<3){
                  if(scratchableLatexs[6][item]){
                      return false
                  }else{
                      scratchableLatexs[6][item]++
                  }
              }else if(j<6){
                  if(scratchableLatexs[7][item]){
                      return false
                  }else{
                      scratchableLatexs[7][item]++
                  }
              }else{
                  if(scratchableLatexs[8][item]){
                      return false
                  }else{
                      scratchableLatexs[8][item]++
                  }
              }
          }
      }
  }

  return true
}
