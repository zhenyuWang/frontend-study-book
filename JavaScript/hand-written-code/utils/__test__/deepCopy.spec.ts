import deepCopy from '../deepCopy'

test('Basic data types',() => {
  const str = 'abc'
  expect(deepCopy(str)).toStrictEqual(str)

  const num = 100
  expect(deepCopy(num)).toStrictEqual(num)

  const bol = false
  expect(deepCopy(bol)).toStrictEqual(bol)

  const und = undefined
  expect(deepCopy(und)).toStrictEqual(und)

  const Null = null
  expect(deepCopy(Null)).toStrictEqual(Null)

  const symbol = Symbol()
  expect(deepCopy(symbol)).toStrictEqual(symbol)

  const bigInt = BigInt(100)
  expect(deepCopy(bigInt)).toStrictEqual(bigInt)
})

test('object',() => {
  const original = {
    name:Symbol('original'),
    age:18,
    sex:'F',
    hobby:['篮球','乒乓球','足球']
  }

  expect(deepCopy(original)).toStrictEqual(original)
})

test('array',() => {
  const original = [
    Symbol('original'),
    18,
    'str',
    ['篮球','乒乓球','足球']
  ]

  expect(deepCopy(original)).toStrictEqual(original)
})

test('Circular reference',() => {
  type Original = {
    name:Symbol,
    age:number,
    sex:string,
    hobby:string[],
    circularReference?:any
  }

  const original:Original = {
    name:Symbol('original'),
    age:18,
    sex:'F',
    hobby:['篮球','乒乓球','足球'],
  }

  original.circularReference = original

  const res = deepCopy(original)

  expect(res).toStrictEqual(original)
})