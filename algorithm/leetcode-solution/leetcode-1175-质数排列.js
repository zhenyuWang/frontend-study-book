function isPrimeNumber(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false
    }
  }

  return true
}

var numPrimeArrangements = function (n) {
  let primeNum = 0

  for (let i = 2; i <= n; i++) {
    if (isPrimeNumber(i)) {
      primeNum++
    }
  }

  let res = BigInt(1)

  for (let i = 2; i <= primeNum; i++) {
    res *= BigInt(i)
  }

  for (let i = 2; i <= n - primeNum; i++) {
    res *= BigInt(i)
    res = res % BigInt(1000000007)
  }

  return res % BigInt(1000000007)
}