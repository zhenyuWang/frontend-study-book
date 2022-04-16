  import {mergeSortByRecursive,mergeSortByExchange} from '../mergeSort'

  test('mergeSortByRecursive',() => {
    const original = [5, 2, 6, 3, 8, -24, 43, 0, 1, 9, 7, -1, 4]
    const expected = [-24, -1 ,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 43]

    expect(mergeSortByRecursive(original)).toStrictEqual(expected)
  })

  test('mergeSortByExchange',() => {
    const original = [5, 2, 6, 3, 8, -24, 43, 0, 1, 9, 7, -1, 4]
    const len =original.length
    const expected = [-24, -1 ,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 43]

    mergeSortByExchange(original,0,len-1)

    expect(original).toStrictEqual(expected)
  })