export default function myCall(target,...args){
  target = target?Object(target):window

  let callFnName = Symbol('call-fn-name')

  target[callFnName] = this

  const res = target[callFnName](args)

  Reflect.deleteProperty(target, callFnName)

  return res
}