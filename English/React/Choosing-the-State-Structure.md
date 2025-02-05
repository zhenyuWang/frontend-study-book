# Choosing the State Structure
Structuring state well can make a difference between a component that is pleasant to modify and debug, and one that is a constant source of bugs. Here are some tips you should consider when structuring state.

You will learn
- When to use a single vs multiple state variables
- What to avoid when organizing state
- How to fix common issues with the state structure

## Principles for structuring state
When you write a component that holds some state, you’ll have to make choices about how many state variables to use and what the shape of their data should be. While it’s possible to write correct programs even with a suboptimal state structure, there are a few principles that can guide you to make better choices:\
suboptimal [ˌsʌbˈɒptɪməl] 次优的\
principal [ˈprɪnsəpl] 原则
1. Group related state. If you always update two or more state variables at the same time, consider merging them into a single state variable.
2. Avoid contradictions in state. When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes. Try to avoid this.
3. Avoid redundant state. If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.
4. Avoid duplication in state. When the same data is duplicated between multiple state variables, or within nested objects, it is difficult to keep them in sync. Reduce duplication when you can.
5. Avoid deeply nested state. Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.

contradicition [ˌkɒntrəˈdɪkʃən] 矛盾\
redundant [rɪˈdʌndənt] 多余的\
duplication [ˌdjuːplɪˈkeɪʃən] 重复\
higharchical [ˌhaɪəˈrɑːrkɪkl] 分层的

The goal behind these principles is to make state easy to update without introducing mistakes. Removing redundant and duplicate data from state helps ensure that all its pieces stay in sync. This is similar to how a database engineer might want to “normalize” the database structure to reduce the chance of bugs. To paraphrase Albert Einstein, “Make your state as simple as it can be—but no simpler.”\
redundant [rɪˈdʌndənt] 多余的\
ensure [ɪnˈʃʊər] 确保

Now let’s see how these principles apply in action.

## Group related state
You might sometimes be unsure between using a single or multiple state variables.

Should you do this?
```jsx
const [x, setX] = useState(0);
const [y, setY] = useState(0);
```
Or this?
```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
```
Technically, you can use either of these approaches. But if some two state variables always change together, it might be a good idea to unify them into a single state variable. Then you won’t forget to always keep them in sync, like in this example where moving the cursor updates both coordinates of the red dot:
```jsx
import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  )
}
```
Another case where you’ll group data into an object or an array is when you don’t know how many pieces of state you’ll need. For example, it’s helpful when you have a form where the user can add custom fields.

**Pitfall**\
If your state variable is an object, remember that you can’t update only one field in it without explicitly copying the other fields. For example, you can’t do `setPosition({ x: 100 })` in the above example because it would not have the `y` property at all! Instead, if you wanted to set `x` alone, you would either do `setPosition({ ...position, x: 100 })`, or split them into two state variables and do `setX(100)`.

## Avoid contradictions in state
Here is a hotel feedback form with `isSending` and `isSent` state variables:
```jsx
import { useState } from 'react';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);
    await sendMessage(text);
    setIsSending(false);
    setIsSent(true);
  }

  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button
        disabled={isSending}
        type="submit"
      >
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
}

// Pretend to send a message.
function sendMessage(text) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}
```
While this code works, it leaves the door open for “impossible” states. For example, if you forget to call `setIsSent` and `setIsSending` together, you may end up in a situation where both `isSending` and `isSent` are true at the same time. The more complex your component is, the harder it is to understand what happened.

Since `isSending` and `isSent` should never be true at the same time, it is better to replace them with one status state variable that may take one of three valid states: `'typing' (initial), 'sending', and 'sent'`:
```jsx
import { useState } from 'react';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('typing');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button
        disabled={isSending}
        type="submit"
      >
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
}

// Pretend to send a message.
function sendMessage(text) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}
```
You can still declare some constants for readability:
```jsx
const isSending = status === 'sending';
const isSent = status === 'sent';
```
But they’re not state variables, so you don’t need to worry about them getting out of sync with each other.

## Avoid redundant state

redundant [rɪˈdʌndənt] 多余的
If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.

For example, take this form. It works, but can you find any redundant state in it?
```jsx
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    setFullName(firstName + ' ' + e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```
This form has three state variables: `firstName`, `lastName`, and `fullName`. However, `fullName` is redundant. You can always calculate `fullName` from `firstName` and `lastName` during render, so remove it from state.

This is how you can do it:
```jsx
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```
Here, `fullName` is not a state variable. Instead, it’s calculated during render:
```jsx
const fullName = firstName + ' ' + lastName;
```
As a result, the change handlers don’t need to do anything special to update it. When you call `setFirstName` or `setLastName`, you trigger a re-render, and then the next `fullName` will be calculated from the fresh data.

**Don’t mirror props in state **\
mirror [ˈmɪrər] 镜像\
A common example of redundant state is code like this:
```jsx
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
```
Here, a `color` state variable is initialized to the `messageColor` prop. The problem is that if the parent component passes a different value of `messageColor` later (for example, 'red' instead of 'blue'), the color state variable would not be updated! The state is only initialized during the first render.

This is why “mirroring” some prop in a state variable can lead to confusion. Instead, use the `messageColor` prop directly in your code. If you want to give it a shorter name, use a constant:
```
function Message({ messageColor }) {
  const color = messageColor;
```
This way it won’t get out of sync with the prop passed from the parent component.

”Mirroring” props into state only makes sense when you want to ignore all updates for a specific prop. By convention, start the prop name with initial or default to clarify that its new values are ignored:
```jsx
function Message({ initialColor }) {
  // The `color` state variable holds the *first* value of `initialColor`.
  // Further changes to the `initialColor` prop are ignored.
  const [color, setColor] = useState(initialColor);
```

## Avoid duplication in state
This menu list component lets you choose a single travel snack out of several:
```jsx
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.title}
            {' '}
            <button onClick={() => {
              setSelectedItem(item);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
```
Currently, it stores the selected item as an object in the `selectedItem` state variable. However, this is not great: the contents of the `selectedItem` is the same object as one of the items inside the items list. This means that the information about the item itself is duplicated in two places.

Why is this a problem? Let’s make each item editable:
```jsx
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2> 
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedItem(item);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
```
Notice how if you first click “Choose” on an item and then edit it, the input updates but the label at the bottom does not reflect the edits. This is because you have duplicated state, and you forgot to update `selectedItem`.

Although you could update `selectedItem` too, an easier fix is to remove duplication. In this example, instead of a `selectedItem` object (which creates a duplication with objects inside `items`), you hold the `selectedId` in state, and then get the `selectedItem` by searching the `items` array for an item with that ID:
```jsx
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(item =>
    item.id === selectedId
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedId(item.id);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
```
The state used to be duplicated like this:

- items = [{ id: 0, title: 'pretzels'}, ...]
- selectedItem = {id: 0, title: 'pretzels'}

But after the change it’s like this:

- items = [{ id: 0, title: 'pretzels'}, ...]
- selectedId = 0

The duplication is gone, and you only keep the essential state!

Now if you edit the selected item, the message below will update immediately. This is because `setItems` triggers a re-render, and `items.find(...)` would find the item with the updated title. You didn’t need to hold the selected item in state, because only the selected ID is essential. The rest could be calculated during render.\
essential [ɪˈsenʃl] 必要的\
rest [rest] 其余的
