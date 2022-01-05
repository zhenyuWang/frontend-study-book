// 基础版
var rand10 = function() {
  let num;
  while(true){
    // 获取 1~49 的均匀随机整数
    num = (rand7()-1)*7+rand7();
    // 如果小于等于40，则模10+1 返回
    if(num<=40) return num%10+1
    // 否则舍弃
  }
};

// 优化版
var rand10 = function() {
  let num;
  while(true){
    // 获取 1~49 的均匀随机整数
    num = (rand7()-1)*7+rand7();
    // 如果小于等于40，则模10+1 返回
    if(num<=40) return num%10+1
    // 利用41~49获取 1~63 的均匀随机整数
    num = (num-41)*7+rand7()
    // 如果小于等于60，则模10+1 返回
    if(num<=60) return num%10+1
    // 利用61~63获取 1~21 的均匀随机整数
    num = (num-61)*7+rand7()
    // 如果小于等于20，则模10+1 返回
    if(num<=20) return num%10+1
    // 经过以上优化，只会舍弃一个数字
  }
};