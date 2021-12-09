var kthGrammar = function(n, k) {
  // 初始化 flag
  let flag = true;
  // 当 k != 1的时候
  while(k>1){
    // 判断当前 k 值奇偶，更新 flag
    if(!(k%2)) flag = !flag;
    // 向上更新 k
    k = Math.ceil(k/2);
  }
  // 根据 flag 结果推导目标字符的值
  if(flag) return 0;
  return 1;
};