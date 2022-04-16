import debounce from '../debounce'
import {delay} from '../../../../utils/jest'

test('happy path',async () => {
  const originalFn = jest.fn()

  const debounceFn = debounce(originalFn)

  debounceFn()

  await delay(100)
  debounceFn()

  await delay(310)

  expect(originalFn).toBeCalledTimes(1)

  debounceFn()
  await delay(310)

  expect(originalFn).toBeCalledTimes(2)
})

test('custom delay',async () => {
  const originalFn = jest.fn()
  const timerDelay = 500

  const debounceFn = debounce(originalFn,timerDelay)

  debounceFn()
  debounceFn()

  await delay(timerDelay+10)

  expect(originalFn).toBeCalledTimes(1)

  debounceFn()
  await delay(timerDelay+10)

  expect(originalFn).toBeCalledTimes(2)
})