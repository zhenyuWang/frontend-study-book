import throttle from '../throttle'
import {delay} from '../../../../utils/jest'

test('happy path',async () => {
  const originalFn = jest.fn()

  const throttleFn = throttle(originalFn)

  throttleFn()

  await delay(100)
  throttleFn()

  await delay(110)

  expect(originalFn).toBeCalledTimes(0)

  await delay(100)

  expect(originalFn).toBeCalledTimes(1)

  throttleFn()
  await delay(310)

  expect(originalFn).toBeCalledTimes(2)
})

test('custom delay',async () => {
  const originalFn = jest.fn()
  const timerDelay = 500

  const throttleFn = throttle(originalFn,timerDelay)

  throttleFn()
  throttleFn()

  await delay(timerDelay-100)

  expect(originalFn).toBeCalledTimes(0)

  await delay(110)

  expect(originalFn).toBeCalledTimes(1)

  throttleFn()

  await delay(timerDelay+10)

  expect(originalFn).toBeCalledTimes(2)
})