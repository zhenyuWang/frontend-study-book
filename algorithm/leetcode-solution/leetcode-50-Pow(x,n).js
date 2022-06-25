var myPow = function(x, n) {
  if(x === 1 || n === 0){
      return 1
  }
  if(x===-1){
      return n % 2 ? -1 : 1
  }

  let res = 1
  if(n>0){
      for(let i = 0;i<n;i++){
          res *= x
      }
      return res
  }

  for(let i = 0;i<-n;i++){
      res /= x
      if(x>0 && res<0.000005){
          return res
      }

  }
  return res
}

var myPow = function(x, n) {
  if(n == 0){
    return 1
  }

  if(n < 0){
    return 1 / myPow(x, -n)
  }

  if(n % 2){
    return x * myPow(x, n - 1)
  }

  return myPow(x * x, n / 2)
}