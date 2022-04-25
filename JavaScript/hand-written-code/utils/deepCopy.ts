export default function deepCopy(original:any,hash = new WeakMap()){
  const type = Object.prototype.toString.call(original)

  switch(type){
    case '[object String]':
    case '[object Number]':
    case '[object Boolean]':
    case '[object Symbol]':
    case '[object Undefined]':
    case '[object Null]':
    case '[object BigInt]':
    case '[object Date]':
    case '[object RegExp]':
    case '[object Error]':
    case '[object Function]':
      return original
  }

  if(hash.has(original)){
    return hash.get(original)
  }

  const target = Array.isArray(original)?[]:{}

  hash.set(original,target)

  const keys = Reflect.ownKeys(original)

  for(let key of keys){
    const value = original[key]

    target[key] = deepCopy(value,hash)
  }

  return target
}