import {quickSortByRecursive,quickSortByExchange} from '../quickSort'

test('quickSortByRecursive',() => {
  const original = [5, 2, 6, 3, 8, -24, 43, 0, 1, 9, 7, -1, 4]
  const expected = [-24, -1 ,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 43]

  expect(quickSortByRecursive(original)).toStrictEqual(expected)
})

test('quickSortByExchange',() => {
  const original = [5, 2, 6, 3, 8, -24, 43, 0, 1, 9, 7, -1, 4]
  const expected = [-24, -1 ,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 43]

  quickSortByExchange(original,0,original.length-1)

  expect(original).toStrictEqual(expected)
})