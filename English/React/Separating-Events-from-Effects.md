# Separating Events from Effects
Event handlers only re-run when you perform the same interaction again. Unlike event handlers, Effects re-synchronize if some value they read, like a prop or a state variable, is different from what it was during the last render. Sometimes, you also want a mix of both behaviors: an Effect that re-runs in response to some values but not others. This page will teach you how to do that.

**You will learn**
- How to choose between an event handler and an Effect
- Why Effects are reactive, and event handlers are not
- What to do when you want a part of your Effect’s code to not be reactive
- What Effect Events are, and how to extract them from your Effects
- How to read the latest props and state from Effects using Effect Events

## Choosing between event handlers and Effects
First, let’s recap the difference between event handlers and Effects.

Imagine you’re implementing a chat room component. Your requirements look like this:

1. Your component should automatically connect to the selected chat room.
2. When you click the “Send” button, it should send a message to the chat.

Let’s say you’ve already implemented the code for them, but you’re not sure where to put it. Should you use event handlers or Effects? Every time you need to answer this question, consider why the code needs to run.

### Event handlers run in response to specific interactions 
From the user’s perspective, sending a message should happen because the particular “Send” button was clicked. The user will get rather upset if you send their message at any other time or for any other reason. This is why sending a message should be an event handler. Event handlers let you handle specific interactions:\
perspective [/pərˈspektɪv/] 视角
```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  // ...
  function handleSendClick() {
    sendMessage(message);
  }
  // ...
  return (
    <>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}
```
With an event handler, you can be sure that `sendMessage(message)` will only run if the user presses the button.

### Effects run whenever synchronization is needed 
Recall that you also need to keep the component connected to the chat room. Where does that code go?\
recall [/rɪˈkɔːl/] 回想起

The reason to run this code is not some particular interaction. It doesn’t matter why or how the user navigated to the chat room screen. Now that they’re looking at it and could interact with it, the component needs to stay connected to the selected chat server. Even if the chat room component was the initial screen of your app, and the user has not performed any interactions at all, you would still need to connect. This is why it’s an Effect:\
performed [/pərˈfɔːrmd/] 执行
```jsx
function ChatRoom({ roomId }) {
  // ...
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
```
With this code, you can be sure that there is always an active connection to the currently selected chat server, regardless of the specific interactions performed by the user. Whether the user has only opened your app, selected a different room, or navigated to another screen and back, your Effect ensures that the component will remain synchronized with the currently selected room, and will re-connect whenever it’s necessary.\
regardless [/rɪˈɡɑːrdləs/] 无论\
remain [/rɪˈmeɪn/] 保持
```jsx
// App.js
import { useState, useEffect } from 'react';
import { createConnection, sendMessage } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  function handleSendClick() {
    sendMessage(message);
  }

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
// chat.js
export function sendMessage(message) {
  console.log('🔵 You sent: ' + message);
}

export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

## Reactive values and reactive logic 
Intuitively, you could say that event handlers are always triggered “manually”, for example by clicking a button. Effects, on the other hand, are “automatic”: they run and re-run as often as it’s needed to stay synchronized.\
intuitively [/ɪnˈtuːɪtɪvli/] 直观地

There is a more precise way to think about this.\
precise [/prɪˈsaɪs/] 精确的

Props, state, and variables declared inside your component’s body are called reactive values. In this example, `serverUrl` is not a reactive value, but `roomId` and `message` are. They participate in the rendering data flow:\
participate [/pɑːrˈtɪsɪpeɪt/] 参与
```jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  // ...
}
```
Reactive values like these can change due to a re-render. For example, the user may edit the `message` or choose a different `roomId` in a dropdown. Event handlers and Effects respond to changes differently:

- Logic inside event handlers is not reactive. It will not run again unless the user performs the same interaction (e.g. a click) again. Event handlers can read reactive values without “reacting” to their changes.
- Logic inside Effects is reactive. If your Effect reads a reactive value, you have to specify it as a dependency. Then, if a re-render causes that value to change, React will re-run your Effect’s logic with the new value.

Let’s revisit the previous example to illustrate this difference.\
illustrate [/ˈɪlʌstreɪt/] 说明

### Logic inside event handlers is not reactive 
Take a look at this line of code. Should this logic be reactive or not?
```jsx
    // ...
    sendMessage(message);
    // ...
```
From the user’s perspective, a change to the message does not mean that they want to send a message. It only means that the user is typing. In other words, the logic that sends a message should not be reactive. It should not run again only because the reactive value has changed. That’s why it belongs in the event handler:
```jsx
  function handleSendClick() {
    sendMessage(message);
  }
```
Event handlers aren’t reactive, so `sendMessage(message)` will only run when the user clicks the Send button.

### Logic inside Effects is reactive 
Now let’s return to these lines:
```jsx
    // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    // ...
```
From the user’s perspective, a change to the `roomId` does mean that they want to connect to a different room. In other words, the logic for connecting to the room should be reactive. You want these lines of code to “keep up” with the reactive value, and to run again if that value is different. That’s why it belongs in an Effect:
```jsx
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId]);
```
Effects are reactive, so `createConnection(serverUrl, roomId)` and `connection.connect()` will run for every distinct value of `roomId`. Your Effect keeps the chat connection synchronized to the currently selected room.\
distinct [/dɪˈstɪŋkt/] 不同的

## Extracting non-reactive logic out of Effects 
Things get more tricky when you want to mix reactive logic with non-reactive logic.\
tricky [ˈtrɪki/] 棘手的

For example, imagine that you want to show a notification when the user connects to the chat. You read the current theme (dark or light) from the props so that you can show the notification in the correct color:
```jsx
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    // ...
```
However, `theme` is a reactive value (it can change as a result of re-rendering), and every reactive value read by an Effect must be declared as its dependency. Now you have to specify `theme` as a dependency of your Effect:
```jsx
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId, theme]); // ✅ All dependencies declared
  // ...
```
Play with this example and see if you can spot the problem with this user experience:
```jsx
// App.js
import { useState, useEffect } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
// chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
// notifications.js
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showNotification(message, theme) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    },
  }).showToast();
}
```
When the `roomId` changes, the chat re-connects as you would expect. But since `theme` is also a dependency, the chat also re-connects every time you switch between the dark and the light theme. That’s not great!

In other words, you don’t want this line to be reactive, even though it is inside an Effect (which is reactive):
```jsx
      // ...
      showNotification('Connected!', theme);
      // ...
```
You need a way to separate this non-reactive logic from the reactive Effect around it.

### Declaring an Effect Event 
**Under Construction**\
This section describes an experimental API that has not yet been released in a stable version of React.\
experimental [/ɪkˈsperɪməntl/] 实验性的

Use a special Hook called `useEffectEvent` to extract this non-reactive logic out of your Effect:
```jsx
import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });
  // ...
```
Here, `onConnected` is called an Effect Event. It’s a part of your Effect logic, but it behaves a lot more like an event handler. The logic inside it is not reactive, and it always “sees” the latest values of your props and state.

Now you can call the `onConnected` Effect Event from inside your Effect:
```jsx
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```
This solves the problem. Note that you had to remove `theme` from the list of your Effect’s dependencies, because it’s no longer used in the Effect. You also don’t need to add `onConnected` to it, because Effect Events are not reactive and must be omitted from dependencies.

Verify that the new behavior works as you would expect:
```jsx
// App.js
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
// chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
```
You can think of Effect Events as being very similar to event handlers. The main difference is that event handlers run in response to a user interactions, whereas Effect Events are triggered by you from Effects. Effect Events let you “break the chain” between the reactivity of Effects and code that should not be reactive.\
whereas [/ˈwerəz/] 而

### Reading latest props and state with Effect Events 
**Under Construction**\
This section describes an experimental API that has not yet been released in a stable version of React.

Effect Events let you fix many patterns where you might be tempted to suppress the dependency linter.\
pattern [/ˈpætərn/] 模式\
tempted [/ˈtemptɪd/] 诱惑\
suppress [/səˈpres/] 压制

For example, say you have an Effect to log the page visits:
```jsx
function Page() {
  useEffect(() => {
    logVisit();
  }, []);
  // ...
}
```
Later, you add multiple routes to your site. Now your `Page` component receives a `url` prop with the current path. You want to pass the `url` as a part of your `logVisit` call, but the dependency linter complains:

```jsx
function Page({ url }) {
  useEffect(() => {
    logVisit(url);
  }, []); // 🔴 React Hook useEffect has a missing dependency: 'url'
  // ...
}
```
Think about what you want the code to do. You want to log a separate visit for different URLs since each URL represents a different page. In other words, this `logVisit` call should be reactive with respect to the `url`. This is why, in this case, it makes sense to follow the dependency linter, and add `url` as a dependency:

```jsx
function Page({ url }) {
  useEffect(() => {
    logVisit(url);
  }, [url]); // ✅ All dependencies declared
  // ...
}
```
Now let’s say you want to include the number of items in the shopping cart together with every page visit:

```jsx
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  useEffect(() => {
    logVisit(url, numberOfItems);
  }, [url]); // 🔴 React Hook useEffect has a missing dependency: 'numberOfItems'
  // ...
}
```
You used `numberOfItems` inside the Effect, so the linter asks you to add it as a dependency. However, you don’t want the `logVisit` call to be reactive with respect to `numberOfItems`. If the user puts something into the shopping cart, and the `numberOfItems` changes, this does not mean that the user visited the page again. In other words, visiting the page is, in some sense, an “event”. It happens at a precise moment in time.\
precise [/prɪˈsaɪs/] 精确的

Split the code in two parts:
```jsx
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // ✅ All dependencies declared
  // ...
}
```
Here, `onVisit` is an Effect Event. The code inside it isn’t reactive. This is why you can use `numberOfItems` (or any other reactive value!) without worrying that it will cause the surrounding code to re-execute on changes.

On the other hand, the Effect itself remains reactive. Code inside the Effect uses the `url` prop, so the Effect will re-run after every re-render with a different `url`. This, in turn, will call the `onVisit` Effect Event.

As a result, you will call `logVisit` for every change to the `url`, and always read the latest `numberOfItems`. However, if `numberOfItems` changes on its own, this will not cause any of the code to re-run.
