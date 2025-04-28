# Manipulating the DOM with Refs
React automatically updates the DOM to match your render output, so your components won’t often need to manipulate it. However, sometimes you might need access to the DOM elements managed by React—for example, to focus a node, scroll to it, or measure its size and position. There is no built-in way to do those things in React, so you will need a ref to the DOM node.\
manipulate [/məˈnɪpjuleɪt/] 操作，操纵

**You will learn**
- How to access a DOM node managed by React with the `ref` attribute
- How the `ref` JSX attribute relates to the `useRef` Hook
- How to access another component’s DOM node
- In which cases it’s safe to modify the DOM managed by React

## Getting a ref to the node
To access a DOM node managed by React, first, import the `useRef` Hook:
```jsx
import { useRef } from 'react';
```
Then, use it to declare a ref inside your component:
```jsx
const myRef = useRef(null);
```
Finally, pass your ref as the `ref` attribute to the JSX tag for which you want to get the DOM node:
```jsx
<div ref={myRef}>
```
The `useRef` Hook returns an object with a single property called `current`. Initially, `myRef.current` will be `null`. When React creates a DOM node for this `<div>`, React will put a reference to this node into `myRef.current`. You can then access this DOM node from your event handlers and use the built-in browser APIs defined on it.
```jsx
// You can use any browser APIs, for example:
myRef.current.scrollIntoView();
```

### Example: Focusing a text input 
In this example, clicking the button will focus the input:
```jsx
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```
To implement this:

1. Declare `inputRef` with the useRef Hook.
2. Pass it as `<input ref={inputRef}>`. This tells React to put this `<input>`’s DOM node into `inputRef.current`.
3. In the `handleClick` function, read the input DOM node from `inputRef.current` and call `focus()` on it with `inputRef.current.focus()`.
4. Pass the `handleClick` event handler to `<button>` with `onClick`.

While DOM manipulation is the most common use case for refs, the `useRef` Hook can be used for storing other things outside React, like timer IDs. Similarly to state, refs remain between renders. Refs are like state variables that don’t trigger re-renders when you set them. Read about refs in Referencing Values with Refs.\
manipulation [/ˌmænɪpjuˈleɪʃən/] 操作，操纵

### Example: Scrolling to an element 
You can have more than a single ref in a component. In this example, there is a carousel of three images. Each button centers an image by calling the browser `scrollIntoView()` method on the corresponding DOM node:\
carousel [/ˈkærəsoʊl/] 旋转木马\
corresponding [/kəˈrɛspɒndɪŋ/] 相应的
```jsx
import { useRef } from 'react';

export default function CatFriends() {
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);

  function handleScrollToFirstCat() {
    firstCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToSecondCat() {
    secondCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToThirdCat() {
    thirdCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>
          Neo
        </button>
        <button onClick={handleScrollToSecondCat}>
          Millie
        </button>
        <button onClick={handleScrollToThirdCat}>
          Bella
        </button>
      </nav>
      <div>
        <ul>
          <li>
            <img
              src="https://placecats.com/neo/300/200"
              alt="Neo"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/millie/200/200"
              alt="Millie"
              ref={secondCatRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/bella/199/200"
              alt="Bella"
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
```

**How to manage a list of refs using a ref callback**

In the above examples, there is a predefined number of refs. However, sometimes you might need a ref to each item in the list, and you don’t know how many you will have. Something like this wouldn’t work:\
predefined [/ˌpriːdɪˈfaɪnd/] 预定义的
```jsx
<ul>
  {items.map((item) => {
    // Doesn't work!
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
</ul>
```
This is because Hooks must only be called at the top-level of your component. You can’t call `useRef` in a loop, in a condition, or inside a `map()` call.

One possible way around this is to get a single ref to their parent element, and then use DOM manipulation methods like `querySelectorAll` to “find” the individual child nodes from it. However, this is brittle and can break if your DOM structure changes.\
individual [/ˌɪndɪˈvɪdʒuəl/] 单独的，个别的\
brittle [/ˈbrɪtəl/] 脆弱的，易损坏的

Another solution is to pass a function to the `ref` attribute. This is called a `ref` callback. React will call your ref callback with the DOM node when it’s time to set the ref, and with `null` when it’s time to clear it. This lets you maintain your own array or a Map, and access any ref by its index or some kind of ID.\
maintain [/meɪnˈteɪn/] 维护，保持

This example shows how you can use this approach to scroll to an arbitrary node in a long list:\
arbitrary [/ˈɑːrbɪtrəri/] 任意的，随意的
```jsx
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);

  function scrollToCat(cat) {
    const map = getMap();
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Neo</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie</button>
        <button onClick={() => scrollToCat(catList[9])}>Bella</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              ref={(node) => {
                const map = getMap();
                map.set(cat, node);

                return () => {
                  map.delete(cat);
                };
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
  }

  return catList;
}
```
In this example, `itemsRef` doesn’t hold a single DOM node. Instead, it holds a Map from item ID to a DOM node. (Refs can hold any values!) The `ref` callback on every list item takes care to update the Map:
```jsx
<li
  key={cat.id}
  ref={node => {
    const map = getMap();
    // Add to the Map
    map.set(cat, node);

    return () => {
      // Remove from the Map
      map.delete(cat);
    };
  }}
>
```
This lets you read individual DOM nodes from the Map later.

**Note**\
When Strict Mode is enabled, ref callbacks will run twice in development.

Read more about how this helps find bugs in callback refs.

## Accessing another component’s DOM nodes
**Pitfall**\
Refs are an escape hatch. Manually manipulating another component’s DOM nodes can make your code fragile.\
manually [/ˈmænʊəli/] 手动地\
fragile [/ˈfrædʒaɪl/] 脆弱的，易损坏的

You can pass refs from parent component to child components just like any other prop.
```jsx
import { useRef } from 'react';

function MyInput({ ref }) {
  return <input ref={ref} />;
}

function MyForm() {
  const inputRef = useRef(null);
  return <MyInput ref={inputRef} />
}
```
In the above example, a ref is created in the parent component, `MyForm`, and is passed to the child component, `MyInput`. `MyInput` then passes the ref to `<input>`. Because `<input>` is a built-in component React sets the `.current` property of the ref to the `<input>` DOM element.

The `inputRef` created in `MyForm` now points to the `<input>` DOM element returned by `MyInput`. A click handler created in `MyForm` can access `inputRef` and call `focus()` to set the focus on `<input>`.
```jsx
import { useRef } from 'react';

function MyInput({ ref }) {
  return <input ref={ref} />;
}

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```
### Exposing a subset of the API with an imperative handle
In the above example, the ref passed to `MyInput` is passed on to the original DOM input element. This lets the parent component call `focus()` on it. However, this also lets the parent component do something else—for example, change its CSS styles. In uncommon cases, you may want to restrict the exposed functionality. You can do that with `useImperativeHandle`:\
restrict [/rɪˈstrɪkt/] 限制，约束\
functionality [/fʌŋkʃəˈnælɪti/] 功能
```jsx
import { useRef, useImperativeHandle } from "react";

function MyInput({ ref }) {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input ref={realInputRef} />;
};

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```
Here, r`ealInputRef` inside `MyInput` holds the actual input DOM node. However, `useImperativeHandle` instructs React to provide your own special object as the value of a ref to the parent component. So `inputRef.current` inside the `Form` component will only have the focus method. In this case, the ref “handle” is not the DOM node, but the custom object you create inside `useImperativeHandle` call.

## When React attaches the refs
In React, every update is split in two phases:\
phase [/feɪz/] 阶段，时期

- During render, React calls your components to figure out what should be on the screen.
- During commit, React applies changes to the DOM.

In general, you don’t want to access refs during rendering. That goes for refs holding DOM nodes as well. During the first render, the DOM nodes have not yet been created, so `ref.current` will be null. And during the rendering of updates, the DOM nodes haven’t been updated yet. So it’s too early to read them.

React sets `ref.current` during the commit. Before updating the DOM, React sets the affected `ref.current` values to null. After updating the DOM, React immediately sets them to the corresponding DOM nodes.

Usually, you will access refs from event handlers. If you want to do something with a ref, but there is no particular event to do it in, you might need an Effect. We will discuss Effects on the next pages.

### Flushing state updates synchronously with flushSync

flush [flʌʃ] 冲洗，冲刷\
synchronously [/ˈsɪŋkrənəsli/] 同步地\
Consider code like this, which adds a new todo and scrolls the screen down to the last child of the list. Notice how, for some reason, it always scrolls to the todo that was just before the last added one:
```jsx
import { useState, useRef } from 'react';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    setText('');
    setTodos([ ...todos, newTodo]);
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        Add
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}
```
The issue is with these two lines:
```jsx
setTodos([ ...todos, newTodo]);
listRef.current.lastChild.scrollIntoView();
```
In React, state updates are queued. Usually, this is what you want. However, here it causes a problem because `setTodos` does not immediately update the DOM. So the time you scroll the list to its last element, the todo has not yet been added. This is why scrolling always “lags behind” by one item.\
lags behind 落后于

To fix this issue, you can force React to update (“flush”) the DOM synchronously. To do this, import `flushSync` from `react-dom` and wrap the state update into a `flushSync` call:
```jsx
flushSync(() => {
  setTodos([ ...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
```
This will instruct React to update the DOM synchronously right after the code wrapped in `flushSync` executes. As a result, the last todo will already be in the DOM by the time you try to scroll to it:
```jsx
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    flushSync(() => {
      setText('');
      setTodos([ ...todos, newTodo]);
    });
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        Add
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}
```

## Best practices for DOM manipulation with refs
Refs are an escape hatch. You should only use them when you have to “step outside React”. Common examples of this include managing focus, scroll position, or calling browser APIs that React does not expose.

If you stick to non-destructive actions like focusing and scrolling, you shouldn’t encounter any problems. However, if you try to modify the DOM manually, you can risk conflicting with the changes React is making.\
stick [/stɪk/] 坚持\
destructive [/dɪˈstrʌktɪv/] 破坏性的\
encounter [/ɪnˈkaʊntər/] 遇到，遭遇\
risk [/rɪsk/] 冒险，风险

To illustrate this problem, this example includes a welcome message and two buttons. The first button toggles its presence using conditional rendering and state, as you would usually do in React. The second button uses the remove() DOM API to forcefully remove it from the DOM outside of React’s control.\
illustrate [/ˈɪləsˌtreɪt/] 说明，阐明\
presence [/ˈprɛzəns/] 存在，显示\

Try pressing “Toggle with setState” a few times. The message should disappear and appear again. Then press “Remove from the DOM”. This will forcefully remove it. Finally, press “Toggle with setState”:
```jsx
import { useState, useRef } from 'react';

export default function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}>
        Toggle with setState
      </button>
      <button
        onClick={() => {
          ref.current.remove();
        }}>
        Remove from the DOM
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}
```
After you’ve manually removed the DOM element, trying to use `setState` to show it again will lead to a crash. This is because you’ve changed the DOM, and React doesn’t know how to continue managing it correctly.

Avoid changing DOM nodes managed by React. Modifying, adding children to, or removing children from elements that are managed by React can lead to inconsistent visual results or crashes like above.\
inconsistent [/ˌɪnkənˈsɪstənt/] 不一致的，矛盾的

However, this doesn’t mean that you can’t do it at all. It requires caution. You can safely modify parts of the DOM that React has no reason to update. For example, if some `<div>` is always empty in the JSX, React won’t have a reason to touch its children list. Therefore, it is safe to manually add or remove elements there.\
caution [/ˈkɔːʃən/] 小心，谨慎
