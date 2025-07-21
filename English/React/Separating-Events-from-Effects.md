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
