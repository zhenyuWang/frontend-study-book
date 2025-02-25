# Preserving and Resetting State
State is isolated between components. React keeps track of which state belongs to which component based on their place in the UI tree. You can control when to preserve state and when to reset it between re-renders.\
issolated [/ˈaɪsəleɪtɪd/] 隔离的\
keep track of 跟踪\
preserve [prɪˈzɜːv] 保留

**You will learn**
- When React chooses to preserve or reset the state
- How to force React to reset component’s state
- How keys and types affect whether the state is preserved

force [/fɔːrs/] 强制

## State is tied to a position in the render tree
React builds render trees for the component structure in your UI.

When you give a component state, you might think the state “lives” inside the component. But the state is actually held inside React. React associates each piece of state it’s holding with the correct component by where that component sits in the render tree.

Here, there is only one `<Counter />` JSX tag, but it’s rendered at two different positions:
```jsx
import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
These are two separate counters because each is rendered at its own position in the tree. You don’t usually have to think about these positions to use React, but it can be useful to understand how it works.

In React, each component on the screen has fully isolated state. For example, if you render two `Counter` components side by side, each of them will get its own, independent, `score` and `hover` states.

Try clicking both counters and notice they don’t affect each other:
```jsx
import { useState } from 'react';

export default function App() {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
As you can see, when one counter is updated, only the state for that component is updated:

React will keep the state around for as long as you render the same component at the same position in the tree. To see this, increment both counters, then remove the second component by unchecking “Render the second counter” checkbox, and then add it back by ticking it again:
```jsx
import { useState } from 'react';

export default function App() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      <Counter />
      {showB && <Counter />} 
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked)
          }}
        />
        Render the second counter
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
Notice how the moment you stop rendering the second counter, its state disappears completely. That’s because when React removes a component, it destroys its state.

When you tick “Render the second counter”, a second `Counter` and its state are initialized from scratch `(score = 0)` and added to the DOM.

React preserves a component’s state for as long as it’s being rendered at its position in the UI tree. If it gets removed, or a different component gets rendered at the same position, React discards its state.\
discard [dɪˈskɑːrd] 丢弃

## Same component at the same position preserves state
In this example, there are two different `<Counter />` tags:
```jsx
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <Counter isFancy={true} /> 
      ) : (
        <Counter isFancy={false} /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
When you tick or clear the checkbox, the counter state does not get reset. Whether `isFancy` is `true` or `false`, you always have a `<Counter />` as the first child of the `div` returned from the root `App` component:

It’s the same component at the same position, so from React’s perspective, it’s the same counter.

Remember that it’s the position in the UI tree—not in the JSX markup—that matters to React! This component has two return clauses with different `<Counter />` JSX tags inside and outside the `if`:
```jsx
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  if (isFancy) {
    return (
      <div>
        <Counter isFancy={true} />
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          Use fancy styling
        </label>
      </div>
    );
  }
  return (
    <div>
      <Counter isFancy={false} />
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
You might expect the state to reset when you tick checkbox, but it doesn’t! This is because both of these <Counter /> tags are rendered at the same position. React doesn’t know where you place the conditions in your function. All it “sees” is the tree you return.

In both cases, the `App` component returns a `<div>` with `<Counter />` as a first child. To React, these two counters have the same “address”: the first child of the first child of the root. This is how React matches them up between the previous and next renders, regardless of how you structure your logic.\
regardless [/rɪˈɡɑːrdləs/] of 不管

## Different components at the same position reset state
In this example, ticking the checkbox will replace `<Counter>` with a `<p>`:
```jsx
import { useState } from 'react';

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      {isPaused ? (
        <p>See you later!</p> 
      ) : (
        <Counter /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={e => {
            setIsPaused(e.target.checked)
          }}
        />
        Take a break
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
Here, you switch between different component types at the same position. Initially, the first child of the `<div>` contained a `Counter`. But when you swapped in a `p`, React removed the `Counter` from the UI tree and destroyed its state.

When `Counter` changes to `p`, the `Counter` is deleted and the `p` is added

Also, when you render a different component in the same position, it resets the state of its entire subtree. To see how this works, increment the counter and then tick the checkbox:
```jsx
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <div>
          <Counter isFancy={true} /> 
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
The counter state gets reset when you click the checkbox. Although you render a Counter, the first child of the div changes from a div to a section. When the child div was removed from the DOM, the whole tree below it (including the Counter and its state) was destroyed as well.

When section changes to div, the section is deleted and the new div is added

When switching back, the div is deleted and the new section is added

As a rule of thumb, if you want to preserve the state between re-renders, the structure of your tree needs to “match up” from one render to another. If the structure is different, the state gets destroyed because React destroys state when it removes a component from the tree.\
as a rule of thumb 作为经验法则

**Pitfall**\
This is why you should not nest component function definitions.\
definiton [ˌdefɪˈnɪʃn] 定义

Here, the `MyTextField` component function is defined inside `MyComponent`:
```jsx
import { useState } from 'react';

export default function MyComponent() {
  const [counter, setCounter] = useState(0);

  function MyTextField() {
    const [text, setText] = useState('');

    return (
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
    );
  }

  return (
    <>
      <MyTextField />
      <button onClick={() => {
        setCounter(counter + 1)
      }}>Clicked {counter} times</button>
    </>
  );
}
```
Every time you click the button, the input state disappears! This is because a different `MyTextField` function is created for every render of `MyComponent`. You’re rendering a different component in the same position, so React resets all state below. This leads to bugs and performance problems. To avoid this problem, always declare component functions at the top level, and don’t nest their definitions.
