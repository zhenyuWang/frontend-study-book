# State as a Snapshot
State variables might look like regular JavaScript variables that you can read and write to. However, state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render.

You will learn
- How setting state triggers re-renders
- When and how state updates
- Why state does not update immediately after you set it
- How event handlers access a “snapshot” of the state

## Setting state triggers renders
You might think of your user interface as changing directly in response to the user event like a click. In React, it works a little differently from this mental model. On the previous page, you saw that setting state requests a re-render from React. This means that for an interface to react to the event, you need to update the state.\
user interface 用户界面\
mental model 心智模型

In this example, when you press “send”, `setIsSent(true)` tells React to re-render the UI:
```jsx
// App.js
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}
```
Here’s what happens when you click the button:

1. The `onSubmit` event handler executes.
2. `setIsSent(true)` sets `isSent` to `true` and queues a new render.
3. React re-renders the component according to the new `isSent` value.

according to 根据

Let’s take a closer look at the relationship between state and rendering.

closer look 仔细看
