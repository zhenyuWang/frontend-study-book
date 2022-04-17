import myBind from '../bind'

test('happy path',async () => {
  (Function.prototype as any).myBind = myBind

  const obj = {
    name:'myBind'
  }

  function foo(){
    return this.name
  }

  const bar = (foo as any).myBind(obj)

  expect(bar()).toBe('myBind')
})

test('arguments',async () => {
  (Function.prototype as any).myBind = myBind

  const obj = {
    name:'myBind'
  }

  function foo(a,b){
    return `${this.name}${a+b}`
  }

  const bar = (foo as any).myBind(obj,1)

  expect(bar(2)).toBe('myBind3')
})