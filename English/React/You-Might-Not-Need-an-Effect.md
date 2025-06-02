# You Might Not Need an Effect
Effects are an escape hatch from the React paradigm. They let you “step outside” of React and synchronize your components with some external system like a non-React widget, network, or the browser DOM. If there is no external system involved (for example, if you want to update a component’s state when some props or state change), you shouldn’t need an Effect. Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.\
paradigm [/ˈpærədaɪm/] 范例；范式\
synchronize [/ˈsɪŋkrənaɪz/] 同步

**You will learn**
- Why and how to remove unnecessary Effects from your components
- How to cache expensive computations without Effects
- How to reset and adjust component state without Effects
- How to share logic between event handlers
- Which logic should be moved to event handlers
- How to notify parent components about changes

## How to remove unnecessary Effects
There are two common cases in which you don’t need Effects:\
unnecessary [/ʌnˈnesəseri/] 不必要的；多余的

- You don’t need Effects to transform data for rendering. For example, let’s say you want to filter a list before displaying it. You might feel tempted to write an Effect that updates a state variable when the list changes. However, this is inefficient. When you update the state, React will first call your component functions to calculate what should be on the screen. Then React will “commit” these changes to the DOM, updating the screen. Then React will run your Effects. If your Effect also immediately updates the state, this restarts the whole process from scratch! To avoid the unnecessary render passes, transform all the data at the top level of your components. That code will automatically re-run whenever your props or state change.
- You don’t need Effects to handle user events. For example, let’s say you want to send an `/api/buy` POST request and show a notification when the user buys a product. In the Buy button click event handler, you know exactly what happened. By the time an Effect runs, you don’t know what the user did (for example, which button was clicked). This is why you’ll usually handle user events in the corresponding event handlers.

feel tempted [/ˈtemptɪd/] 感到诱惑；感到想要\
inefficient [/ɪnɪˈfɪʃənt/] 低效的；无效率的\
scratch [/skrætʃ/] 从头开始；从零开始\
corresponding [/kəˈrɛspɒndɪŋ/] 相应的；对应的

You do need Effects to synchronize with external systems. For example, you can write an Effect that keeps a jQuery widget synchronized with the React state. You can also fetch data with Effects: for example, you can synchronize the search results with the current search query. Keep in mind that modern frameworks provide more efficient built-in data fetching mechanisms than writing Effects directly in your components.\
synchronize [/ˈsɪŋkrənaɪz/] 同步\
mechanism [/ˈmekənɪzəm/] 机制；方法

To help you gain the right intuition, let’s look at some common concrete examples!\
gain [/ɡeɪn/] 获得；取得\
intuition [/ˌɪntuˈɪʃən/] 直觉；直观\
concrete [/ˈkɒnkriːt/] 具体的；实在的

### Updating state based on props or state
Suppose you have a component with two state variables: `firstName` and `lastName`. You want to calculate a `fullName` from them by concatenating them. Moreover, you’d like `fullName` to update whenever `firstName` or `lastName` change. Your first instinct might be to add a `fullName` state variable and update it in an Effect:\
concatenate [/kənˈkætəneɪt/] 连接；串联\
moreover [/məˈrɔːvər/] 此外；而且\
instinct [/ˈɪnstɪŋkt/] 本能；直觉
```jsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}
```
This is more complicated than necessary. It is inefficient too: it does an entire render pass with a stale value for `fullName`, then immediately re-renders with the updated value. Remove the state variable and the Effect:\
complicate [/ˈkɒmplɪkeɪt/] 使复杂；使困难\
inefficient [/ɪnɪˈfɪʃənt/] 低效的；无效率的\
stale [/steɪl/] 陈旧的；过时的
```jsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ Good: calculated during rendering
  const fullName = firstName + ' ' + lastName;
  // ...
}
```
When something can be calculated from the existing props or state, don’t put it in state. Instead, calculate it during rendering. This makes your code faster (you avoid the extra “cascading” updates), simpler (you remove some code), and less error-prone (you avoid bugs caused by different state variables getting out of sync with each other). If this approach feels new to you, Thinking in React explains what should go into state.\
cascading [/kæˈskeɪdɪŋ/] 级联的；连锁的\
simpler [/ˈsɪmplər/] 更简单的；更简洁的\
prone [/proʊn/] 易于；倾向于

### Caching expensive calculations
This component computes `visibleTodos` by taking the `todos` it receives by props and filtering them according to the `filter` prop. You might feel tempted to store the result in state and update it from an Effect:
```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}
```
Like in the earlier example, this is both unnecessary and inefficient. First, remove the state and the Effect:
```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ This is fine if getFilteredTodos() is not slow.
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...
}
```
Usually, this code is fine! But maybe `getFilteredTodos()` is slow or you have a lot of `todos`. In that case you don’t want to recalculate `getFilteredTodos()` if some unrelated state variable like `newTodo` has changed.

You can cache (or “memoize”) an expensive calculation by wrapping it in a `useMemo` Hook:
```jsx
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => {
    // ✅ Does not re-run unless todos or filter change
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}
```
Or, written as a single line:

```jsx
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ Does not re-run getFilteredTodos() unless todos or filter change
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
  // ...
}
```
This tells React that you don’t want the inner function to re-run unless either `todos` or `filter` have changed. React will remember the return value of `getFilteredTodos()` during the initial render. During the next renders, it will check if `todos` or `filter` are different. If they’re the same as last time, `useMemo` will return the last result it has stored. But if they are different, React will call the inner function again (and store its result).

The function you wrap in `useMemo` runs during rendering, so this only works for pure calculations.
