import myCall from '../call'

test('myCall',async () => {
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