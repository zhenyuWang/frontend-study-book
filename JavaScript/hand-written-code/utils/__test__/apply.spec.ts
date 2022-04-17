import myApply from '../apply'

test('happy path',() => {
  (Function as any).prototype.myApply = myApply

  const obj = {
    name:'myApply'
  }

  function foo(){
    return this.name
  }

  const res = (foo as any).myApply(obj)

  expect(res).toBe('myApply')

})

test('arguments',() => {
  (Function as any).prototype.myApply = myApply

  const obj = {
    name:'myApply'
  }

  function foo(a,b){
    return `${this.name}${a+b}`
  }

  const res = (foo as any).myApply(obj,[1,2])

  expect(res).toBe('myApply3')
})