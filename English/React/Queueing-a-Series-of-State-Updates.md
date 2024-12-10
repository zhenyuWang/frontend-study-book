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

## Updating the same state multiple times before the next render
It is an uncommon use case, but if you would like to update the same state variable multiple times before the next render, instead of passing the next state value like `setNumber(number + 1)`, you can pass a function that calculates the next state based on the previous one in the queue, like `setNumber(n => n + 1)`. It is a way to tell React to “do something with the state value” instead of just replacing it.

Try incrementing the counter now:
```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```
Here, `n => n + 1` is called an updater function. When you pass it to a state setter:

1. React queues this function to be processed after all the other code in the event handler has run.
2. During the next render, React goes through the queue and gives you the final updated state.
```jsx
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```
Here’s how React works through these lines of code while executing the event handler:

1. `setNumber(n => n + 1): n => n + 1` is a function. React adds it to a queue.
2. `setNumber(n => n + 1): n => n + 1` is a function. React adds it to a queue.
3. `setNumber(n => n + 1): n => n + 1` is a function. React adds it to a queue.

When you call `useState` during the next render, React goes through the queue. The previous `number` state was `0`, so that’s what React passes to the first updater function as the `n` argument. Then React takes the return value of your previous updater function and passes it to the next updater as `n`, and so on:

React stores `3` as the final result and returns it from `useState`.

This is why clicking “+3” in the above example correctly increments the value by 3.

### What happens if you update state after replacing it
What about this event handler? What do you think `number` will be in the next render?
```jsx
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```
```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>Increase the number</button>
    </>
  )
}
```
Here’s what this event handler tells React to do:

1. `setNumber(number + 5)`: `number` is `0`, so `setNumber(0 + 5)`. React adds “replace with `5`” to its queue.
2. `setNumber(n => n + 1)`: `n => n + 1` is an updater function. React adds that function to its queue.

During the next render, React goes through the state queue:

React stores `6` as the final result and returns it from useState.

**Note**\
You may have noticed that `setState(5)` actually works like `setState(n => 5)`, but `n` is unused!
