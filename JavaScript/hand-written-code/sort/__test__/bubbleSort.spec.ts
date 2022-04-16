import bubbleSort from '../bubbleSort'

test('bubbleSort',() => {
  const original = [5, 2, 6, 3, 8, -24, 43, 0, 1, 9, 7, -1, 4]
  const expected = [-24, -1 ,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 43]

  bubbleSort(original)

  expect(original).toStrictEqual(expected)
})