# Manipulating the DOM with Refs
React automatically updates the DOM to match your render output, so your components won’t often need to manipulate it. However, sometimes you might need access to the DOM elements managed by React—for example, to focus a node, scroll to it, or measure its size and position. There is no built-in way to do those things in React, so you will need a ref to the DOM node.\
manipulate [/məˈnɪpjuleɪt/] 操作，操纵

**You will learn**
- How to access a DOM node managed by React with the `ref` attribute
- How the `ref` JSX attribute relates to the `useRef` Hook
- How to access another component’s DOM node
- In which cases it’s safe to modify the DOM managed by React

## Adding a ref to your component
You can add a ref to your component by importing the useRef Hook from React:
```jsx
import { useRef } from 'react';
```
Inside your component, call the `useRef` Hook and pass the initial value that you want to reference as the only argument. For example, here is a ref to the value `0`:
```jsx
const ref = useRef(0);
```
`useRef` returns an object like this:
```jsx
{ 
  current: 0 // The value you passed to useRef
}
```
You can access the current value of that ref through the `ref.current` property. This value is intentionally mutable, meaning you can both read and write to it. It’s like a secret pocket of your component that React doesn’t track. (This is what makes it an “escape hatch” from React’s one-way data flow—more on that below!)\
intentionally [/ɪnˈtɛnʃənəli/] 故意地，故意的\
mutable [/ˈmjuːtəbl/] 可变的，易变的

Here, a button will increment ref.current on every click:
```jsx
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```
The ref points to a number, but, like state, you could point to anything: a string, an object, or even a function. Unlike state, ref is a plain JavaScript object with the `current` property that you can read and modify.

Note that the component doesn’t re-render with every increment. Like state, refs are retained by React between re-renders. However, setting state re-renders a component. Changing a ref does not!\
retained [/rɪˈteɪnd/] 保留，保持
