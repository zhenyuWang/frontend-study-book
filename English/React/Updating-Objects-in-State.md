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

## Copying objects with the spread syntax
In the previous example, the position object is always created fresh from the current cursor position. But often, you will want to include existing data as a part of the new object you’re creating. For example, you may want to update only one field in a form, but keep the previous values for all other fields.

These input fields don’t work because the `onChange` handlers mutate the state:
```jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```
For example, this line mutates the state from a past render:
```jsx
person.firstName = e.target.value;
```
The reliable way to get the behavior you’re looking for is to create a new object and pass it to `setPerson`. But here, you want to also copy the existing data into it because only one of the fields has changed:\
reliable [rɪˈlaɪəbl] adj. 可靠的；可信赖的
```jsx
setPerson({
  firstName: e.target.value, // New first name from the input
  lastName: person.lastName,
  email: person.email
});
```
You can use the `...` object spread syntax so that you don’t need to copy every property separately.
```jsx
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});
```
Now the form works!

Notice how you didn’t declare a separate state variable for each input field. For large forms, keeping all data grouped in an object is very convenient—as long as you update it correctly!\
separate [ˈsepərət] adj. 分开的；独立的；单独的；个别的
```jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```
Note that the `...` spread syntax is “shallow”—it only copies things one level deep. This makes it fast, but it also means that if you want to update a nested property, you’ll have to use it more than once.

### Using a single event handler for multiple fields
You can also use the [ and ] braces inside your object definition to specify a property with a dynamic name. Here is the same example, but with a single event handler instead of three different ones:
```jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={person.email}
          onChange={handleChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```
Here, `e.target.name` refers to the `name` property given to the `<input>` DOM element.
