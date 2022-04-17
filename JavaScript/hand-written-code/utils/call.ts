export default function myCall(target:any,...args){
  target = target?Object(target):window

  let callFnName = Symbol('call-fn-name')

  target[callFnName] = this

  const res = args?target[callFnName](...args):target[callFnName]()

  Reflect.deleteProperty(target, callFnName)

  return res
}