var groupAnagrams = function(strs) {
  let _strs = [...strs]
  const res = []
  const map = new Map()

  for(let i = 0;i<_strs.length;i++){
      let str = _strs[i]
      str = str.split('').sort((a,b) => a.localeCompare(b)).join('')

      if(map.has(str)){
          map.get(str).push(i)
          continue
      }

      map.set(str,[i])
  }

  map.forEach(item => {
      const arr = []

      for(let i = 0;i<item.length;i++){
          arr.push(strs[item[i]])
      }

      res.push(arr)
  })

  return res
}