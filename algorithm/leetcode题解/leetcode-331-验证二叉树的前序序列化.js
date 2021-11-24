var isValidSerialization = function(preorder) {
    // 将输入的序列化转为数组
    const arr = preorder.split(',');
    // 将 x,#,# 更新为 # 
    for(let i = arr.length-1;i>=2;i--){
      if(arr[i]==='#'&&arr[i-1]==='#'&&arr[i-2]!=='#'){
        arr[i-2] = '#'
        arr.pop();
        arr.pop();
      }
    }
    // 如果最后只剩余一个#，则说明正确
    return arr.length===1&&arr[0]==='#'
  };