# Updating Objects in State
State can hold any kind of JavaScript value, including objects. But you shouldn’t change objects that you hold in the React state directly. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use that copy.

You will learn
- How to correctly update an object in React state
- How to update a nested object without mutating it
- What immutability is, and how not to break it
- How to make object copying less repetitive with Immer

mutate [mjuːˈteɪt] v. 变异；使变异；使突变；使变化\
immutability [ˌɪmjuːtəˈbɪləti] n. 不变性；恒定性\
repetitive [rɪˈpetətɪv] adj. 重复的；反复的；重复性的\
immer [ɪmər] n. 沉浸；专心；陷入；沉浸式

## What’s a mutation?
You can store any kind of JavaScript value in state.
```jsx
const [x, setX] = useState(0);
```
So far you’ve been working with numbers, strings, and booleans. These kinds of JavaScript values are “immutable”, meaning unchangeable or “read-only”. You can trigger a re-render to replace a value:
```jsx
setX(5);
```
The `x` state changed from `0` to `5`, but the number `0` itself did not change. It’s not possible to make any changes to the built-in primitive values like numbers, strings, and booleans in JavaScript.

Now consider an object in state:
```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
```
Technically, it is possible to change the contents of the object itself. This is called a mutation:\
technically [ˈteknɪkli] adv. 技术上；学术上；专门地
```jsx
position.x = 5;
```
However, although objects in React state are technically mutable, you should treat them as if they were immutable—like numbers, booleans, and strings. Instead of mutating them, you should always replace them.

## Treat state as read-only
In other words, you should treat any JavaScript object that you put into state as read-only.

This example holds an object in state to represent the current pointer position. The red dot is supposed to move when you touch or move the cursor over the preview area. But the dot stays in the initial position:
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
        position.x = e.clientX;
        position.y = e.clientY;
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
  );
}
```
The problem is with this bit of code.
```jsx
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
```
This code modifies the object assigned to position from the previous render. But without using the state setting function, React has no idea that object has changed. So React does not do anything in response. It’s like trying to change the order after you’ve already eaten the meal. While mutating state can work in some cases, we don’t recommend it. You should treat the state value you have access to in a render as read-only.

To actually trigger a re-render in this case, create a new object and pass it to the state setting function:
```jsx
onPointerMove={e => {
	setPosition({
		x: e.clientX,
		y: e.clientY
	});
}}
```
With `setPosition`, you’re telling React:

- Replace position with this new object
- And render this component again

Notice how the red dot now follows your pointer when you touch or hover over the preview area:
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
  );
}
```
