# Queueing a Series of State Updates

a series of 一系列\
queue 排队\
Setting a state variable will queue another render. But sometimes you might want to perform multiple operations on the value before queueing the next render. To do this, it helps to understand how React batches state updates.\
perform [/pəˈfɔːrm/] 执行\
batch 批处理\

You will learn
- What “batching” is and how React uses it to process multiple state updates
- How to apply several updates to the same state variable in a row

## React batches state updates
You might expect that clicking the “+3” button will increment the counter three times because it calls `setNumber(number + 1)` three times:
```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```
However, as you might recall from the previous section, each render’s state values are fixed, so the value of `number` inside the first render’s event handler is always `0`, no matter how many times you call `setNumber(1)`:
```jsx
setNumber(0 + 1); // number is 0
setNumber(0 + 1); // number is 0
setNumber(0 + 1); // number is 0
```
But there is one other factor at play here. React waits until all code in the event handlers has run before processing your state updates. This is why the re-render only happens after all these `setNumber()` calls.

This might remind you of a waiter taking an order at the restaurant. A waiter doesn’t run to the kitchen at the mention of your first dish! Instead, they let you finish your order, let you make changes to it, and even take orders from other people at the table.

This lets you update multiple state variables—even from multiple components—without triggering too many re-renders. But this also means that the UI won’t be updated until after your event handler, and any code in it, completes. This behavior, also known as batching, makes your React app run much faster. It also avoids dealing with confusing “half-finished” renders where only some of the variables have been updated.\
batch 批处理\
avoid dealing with 避免处理

React does not batch across multiple intentional events like clicks—each click is handled separately. Rest assured that React only does batching when it’s generally safe to do. This ensures that, for example, if the first button click disables a form, the second click would not submit it again.\
intentional [ɪnˈtenʃənl] 故意的, 有意的\
rest assured [rest əˈʃʊrd] 放心, 请放心\
ensures [ɪnˈʃʊr] 确保
