export default function myApply(target:any,args?:any[]){
  target = target?Object(target):window

  const applyFnName = Symbol('apply-fn-name')

  target[applyFnName] = this

  const res = (args?.length)?target[applyFnName](...args):target[applyFnName]()

  Reflect.deleteProperty(target,applyFnName)

  return res
}