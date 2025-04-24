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
