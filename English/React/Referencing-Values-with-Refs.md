# Referencing Values with Refs
When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.

**You will learn**\
- How to add a ref to your component
- How to update a ref’s value
- How refs are different from state
- How to use refs safely

## Adding a ref to your component
You can add a ref to your component by importing the `useRef` Hook from React:
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
intentionally [/ɪnˈtenʃənəli/] 故意的\
mutable [/ˈmjuːtəbl/] 可变的\
escape hatch [/ɪˈskeɪp hætʃ/] 逃生口

Here, a button will increment `ref.current` on every click:
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
The ref points to a number, but, like state, you could point to anything: a string, an object, or even a function. Unlike state, ref is a plain JavaScript object with the current property that you can read and modify.\
plain [/pleɪn/] 普通的

Note that the component doesn’t re-render with every increment. Like state, refs are retained by React between re-renders. However, setting state re-renders a component. Changing a ref does not!
