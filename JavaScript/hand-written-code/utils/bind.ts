export default function myBind(target,..._args){
  target = target?Object(target):window

  const bindFnName = Symbol('bind-fn-name')

  target[bindFnName] = this

  return function(...args){
    return _args?target[bindFnName](..._args,...args):target[bindFnName](...args)
  }
}