import myCall from '../call'

test('happy path',async () => {
  (Function.prototype as any).myCall = myCall

  const obj = {
    name:'myCall'
  }

  function foo(){
    return this.name
  }

  const res = (foo as any).myCall(obj)

  expect(res).toBe('myCall')
})

test('arguments',async () => {
  (Function.prototype as any).myCall = myCall

  const obj = {
    name:'myCall'
  }

  function foo(a,b){
    return `${this.name}${a+b}`
  }

  const res = (foo as any).myCall(obj,1,2)

  expect(res).toBe('myCall3')
})