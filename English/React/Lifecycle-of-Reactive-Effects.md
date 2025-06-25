# Lifecycle of Reactive Effects
Effects have a different lifecycle from components. Components may mount, update, or unmount. An Effect can only do two things: to start synchronizing something, and later to stop synchronizing it. This cycle can happen multiple times if your Effect depends on props and state that change over time. React provides a linter rule to check that you’ve specified your Effect’s dependencies correctly. This keeps your Effect synchronized to the latest props and state.

You will learn
- How an Effect’s lifecycle is different from a component’s lifecycle
- How to think about each individual Effect in isolation
- When your Effect needs to re-synchronize, and why
- How your Effect’s dependencies are determined
- What it means for a value to be reactive
- What an empty dependency array means
- How React verifies your dependencies are correct with a linter
- What to do when you disagree with the linter

individual [/ˌɪndɪˈvɪdʒuəl/] adj. 单独的，个别的；n. 个人，个体\
isolation [/ˌaɪsəˈleɪʃn/] n. 隔离，孤立\
determine [/dɪˈtɜːrmɪn/] v. 决定，确定

## The lifecycle of an Effect
Every React component goes through the same lifecycle:

- A component mounts when it’s added to the screen.
- A component updates when it receives new props or state, usually in response to an interaction.
- A component unmounts when it’s removed from the screen.

It’s a good way to think about components, but not about Effects. Instead, try to think about each Effect independently from your component’s lifecycle. An Effect describes how to synchronize an external system to the current props and state. As your code changes, synchronization will need to happen more or less often.

To illustrate this point, consider this Effect connecting your component to a chat server:\
illustrate [/ˈɪləstreɪt/] v. 说明，阐明
```jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
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
Your Effect’s body specifies how to start synchronizing:
```jsx
   // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
    // ...
````
The cleanup function returned by your Effect specifies how to stop synchronizing:
```jsx
    // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
    // ...
```
Intuitively, you might think that React would start synchronizing when your component mounts and stop synchronizing when your component unmounts. However, this is not the end of the story! Sometimes, it may also be necessary to start and stop synchronizing multiple times while the component remains mounted.\
intuitively [/ɪnˈtjuːɪtɪvli/] adv. 直观地，凭直觉地\

Let’s look at why this is necessary, when it happens, and how you can control this behavior.

**Note**\
Some Effects don’t return a cleanup function at all. More often than not, you’ll want to return one—but if you don’t, React will behave as if you returned an empty cleanup function.

## Why synchronization may need to happen more than once
Imagine this `ChatRoom` component receives a `roomId` prop that the user picks in a dropdown. Let’s say that initially the user picks the `"general"` room as the `roomId`. Your app displays the `"general"` chat room:
```jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId /* "general" */ }) {
  // ...
  return <h1>Welcome to the {roomId} room!</h1>;
}
```
After the UI is displayed, React will run your Effect to start synchronizing. It connects to the `"general"` room:
```jsx
function ChatRoom({ roomId /* "general" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Connects to the "general" room
    connection.connect();
    return () => {
      connection.disconnect(); // Disconnects from the "general" room
    };
  }, [roomId]);
  // ...
```
So far, so good.

Later, the user picks a different room in the dropdown (for example, `"travel"`). First, React will update the UI:
```jsx
function ChatRoom({ roomId /* "travel" */ }) {
  // ...
  return <h1>Welcome to the {roomId} room!</h1>;
}
```
Think about what should happen next. The user sees that `"travel"` is the selected chat room in the UI. However, the Effect that ran the last time is still connected to the `"general"` room. The `roomId` prop has changed, so what your Effect did back then (connecting to the `"general"` room) no longer matches the UI.

At this point, you want React to do two things:

1. Stop synchronizing with the old roomId (disconnect from the `"general"` room)
2. Start synchronizing with the new roomId (connect to the `"travel"` room)

Luckily, you’ve already taught React how to do both of these things! Your Effect’s body specifies how to start synchronizing, and your cleanup function specifies how to stop synchronizing. All that React needs to do now is to call them in the correct order and with the correct props and state. Let’s see how exactly that happens.

### How React re-synchronizes your Effect
Recall that your `ChatRoom` component has received a new value for its `roomId` prop. It used to be `"general"`, and now it is `"travel"`. React needs to re-synchronize your Effect to re-connect you to a different room.

To stop synchronizing, React will call the cleanup function that your Effect returned after connecting to the `"general"` room. Since `roomId` was `"general"`, the cleanup function disconnects from the `"general"` room:
```jsx
function ChatRoom({ roomId /* "general" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Connects to the "general" room
    connection.connect();
    return () => {
      connection.disconnect(); // Disconnects from the "general" room
    };
    // ...
```
Then React will run the Effect that you’ve provided during this render. This time, `roomId` is `"travel"` so it will start synchronizing to the `"travel"` chat room (until its cleanup function is eventually called too):\
eventually [/ɪˈventʃuəli/] adv. 最终，最后
```jsx
function ChatRoom({ roomId /* "travel" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Connects to the "travel" room
    connection.connect();
    // ...
```
Thanks to this, you’re now connected to the same room that the user chose in the UI. Disaster averted!\
disaster [/dɪˈzæstər/] n. 灾难，灾祸\
averted [/əˈvɜːrtɪd/] v. 避免，防止

Every time after your component re-renders with a different `roomId`, your Effect will re-synchronize. For example, let’s say the user changes `roomId` from `"travel"` to `"music"`. React will again stop synchronizing your Effect by calling its cleanup function (disconnecting you from the `"travel"` room). Then it will start synchronizing again by running its body with the new `roomId` prop (connecting you to the `"music"` room).

Finally, when the user goes to a different screen, `ChatRoom` unmounts. Now there is no need to stay connected at all. React will stop synchronizing your Effect one last time and disconnect you from the `"music"` chat room.

### Thinking from the Effect’s perspective 
Let’s recap everything that’s happened from the `ChatRoom` component’s perspective:

1. `ChatRoom` mounted with `roomId` set to `"general"`
2. `ChatRoom` updated with `roomId` set to `"travel"`
3. `ChatRoom` updated with `roomId` set to `"music"`
4. `ChatRoom` unmounted

During each of these points in the component’s lifecycle, your Effect did different things:

1. Your Effect connected to the `"general"` room
2. Your Effect disconnected from the `"general"` room and connected to the `"travel"` room
3. Your Effect disconnected from the `"travel"` room and connected to the `"music"` room
4. Your Effect disconnected from the `"music"` room

Now let’s think about what happened from the perspective of the Effect itself:
```jsx
  useEffect(() => {
    // Your Effect connected to the room specified with roomId...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      // ...until it disconnected
      connection.disconnect();
    };
  }, [roomId]);
```
This code’s structure might inspire you to see what happened as a sequence of non-overlapping time periods:\
inspire [/ɪnˈspaɪər/] v. 激励，鼓舞\
sequence [/ˈsiːkwəns/] n. 顺序，连续\
overlapping [/ˌoʊvərˈlæpɪŋ/] adj. 重叠的

1. Your Effect connected to the `"general"` room (until it disconnected)
2. Your Effect connected to the `"travel"` room (until it disconnected)
3. Your Effect connected to the `"music"` room (until it disconnected)

Previously, you were thinking from the component’s perspective. When you looked from the component’s perspective, it was tempting to think of Effects as “callbacks” or “lifecycle events” that fire at a specific time like “after a render” or “before unmount”. This way of thinking gets complicated very fast, so it’s best to avoid.\
tempting [/ˈtemptɪŋ/] adj. 诱人的，吸引人的\
fire [/faɪər/] v. 开火，触发\
complicated [/ˈkɑːmplɪkeɪtɪd/] adj. 复杂的，难懂的

Instead, always focus on a single start/stop cycle at a time. It shouldn’t matter whether a component is mounting, updating, or unmounting. All you need to do is to describe how to start synchronization and how to stop it. If you do it well, your Effect will be resilient to being started and stopped as many times as it’s needed.\
resilient [/rɪˈzɪliənt/] adj. 有弹性的，适应力强的

This might remind you how you don’t think whether a component is mounting or updating when you write the rendering logic that creates JSX. You describe what should be on the screen, and React figures out the rest.

### How React verifies that your Effect can re-synchronize 
Here is a live example that you can play with. Press “Open chat” to mount the `ChatRoom` component:
```jsx
// App.js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  return <h1>Welcome to the {roomId} room!</h1>;
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
Notice that when the component mounts for the first time, you see three logs:

1. ✅ Connecting to "general" room at https://localhost:1234... (development-only)
2. ❌ Disconnected from "general" room at https://localhost:1234. (development-only)
3. ✅ Connecting to "general" room at https://localhost:1234...

The first two logs are development-only. In development, React always remounts each component once.

React verifies that your Effect can re-synchronize by forcing it to do that immediately in development. This might remind you of opening a door and closing it an extra time to check if the door lock works. React starts and stops your Effect one extra time in development to check you’ve implemented its cleanup well.

The main reason your Effect will re-synchronize in practice is if some data it uses has changed. In the sandbox above, change the selected chat room. Notice how, when the `roomId` changes, your Effect re-synchronizes.

However, there are also more unusual cases in which re-synchronization is necessary. For example, try editing the `serverUrl` in the sandbox above while the chat is open. Notice how the Effect re-synchronizes in response to your edits to the code. In the future, React may add more features that rely on re-synchronization.
