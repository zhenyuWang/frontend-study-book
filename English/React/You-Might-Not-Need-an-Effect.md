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

#### How to tell if a calculation is expensive?
In general, unless you’re creating or looping over thousands of objects, it’s probably not expensive. If you want to get more confidence, you can add a console log to measure the time spent in a piece of code:
```jsx
console.time('filter array');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('filter array');
```
Perform the interaction you’re measuring (for example, typing into the input). You will then see logs like `filter array: 0.15ms` in your console. If the overall logged time adds up to a significant amount (say, 1ms or more), it might make sense to memoize that calculation. As an experiment, you can then wrap the calculation in `useMemo` to verify whether the total logged time has decreased for that interaction or not:\
perform [/pərˈfɔːrm/] 执行；进行\
overall [/ˈoʊvərɔːl/] 整体的；总的\
significant [/sɪɡˈnɪfɪkənt/] 显著的；重要的\
experiment [/ɪkˈsperɪmənt/] 实验；尝试\
decrease [/dɪˈkriːs/] 减少；降低
```jsx
console.time('filter array');
const visibleTodos = useMemo(() => {
  return getFilteredTodos(todos, filter); // Skipped if todos and filter haven't changed
}, [todos, filter]);
console.timeEnd('filter array');
```
`useMemo` won’t make the first render faster. It only helps you skip unnecessary work on updates.

Keep in mind that your machine is probably faster than your users’ so it’s a good idea to test the performance with an artificial slowdown. For example, Chrome offers a CPU Throttling option for this.\
artificial [/ˌɑːrtɪˈfɪʃl/] 人工的；人造的\
slowdown [/ˈsloʊdaʊn/] 减速；放慢

Also note that measuring performance in development will not give you the most accurate results. (For example, when Strict Mode is on, you will see each component render twice rather than once.) To get the most accurate timings, build your app for production and test it on a device like your users have.\
accurate [/ˈækjərət/] 准确的；精确的

### Resetting all state when a prop changes
This `ProfilePage` component receives a `userId` prop. The page contains a comment input, and you use a `comment` state variable to hold its value. One day, you notice a problem: when you navigate from one profile to another, the `comment` state does not get reset. As a result, it’s easy to accidentally post a comment on a wrong user’s profile. To fix the issue, you want to clear out the `comment` state variable whenever the `userId` changes:
```jsx
export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  // 🔴 Avoid: Resetting state on prop change in an Effect
  useEffect(() => {
    setComment('');
  }, [userId]);
  // ...
}
```
This is inefficient because `ProfilePage` and its children will first render with the stale value, and then render again. It is also complicated because you’d need to do this in every component that has some state inside `ProfilePage`. For example, if the comment UI is nested, you’d want to clear out nested comment state too.

Instead, you can tell React that each user’s profile is conceptually a different profile by giving it an explicit key. Split your component in two and pass a key attribute from the outer component to the inner one:\
conceptually [/kənˈsɛptʃuəli/] 概念上；理论上
```jsx
export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // ✅ This and any other state below will reset on key change automatically
  const [comment, setComment] = useState('');
  // ...
}
```
Normally, React preserves the state when the same component is rendered in the same spot. By passing `userId` as a key to the `Profile` component, you’re asking React to treat two `Profile` components with different `userId` as two different components that should not share any state. Whenever the key (which you’ve set to `userId`) changes, React will recreate the DOM and reset the state of the `Profile` component and all of its children. Now the comment field will clear out automatically when navigating between profiles.

Note that in this example, only the outer `ProfilePage` component is exported and visible to other files in the project. Components rendering `ProfilePage` don’t need to pass the key to it: they pass `userId` as a regular prop. The fact `ProfilePage` passes it as a key to the inner `Profile` component is an implementation detail.

### Adjusting some state when a prop changes
Sometimes, you might want to reset or adjust a part of the state on a prop change, but not all of it.

This `List` component receives a list of items as a prop, and maintains the selected item in the `selection` state variable. You want to reset the `selection` to `null` whenever the items prop receives a different array:\
maintain [/meɪnˈteɪn/] 维护；保持\
```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 🔴 Avoid: Adjusting state on prop change in an Effect
  useEffect(() => {
    setSelection(null);
  }, [items]);
  // ...
}
```
This, too, is not ideal. Every time the `items` change, the List and its child components will render with a stale `selection` value at first. Then React will update the DOM and run the Effects. Finally, the `setSelection(null)` call will cause another re-render of the `List` and its child components, restarting this whole process again.

Start by deleting the Effect. Instead, adjust the state directly during rendering:
```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // Better: Adjust the state while rendering
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}
```
Storing information from previous renders like this can be hard to understand, but it’s better than updating the same state in an Effect. In the above example, `setSelection` is called directly during a render. React will re-render the `List` immediately after it exits with a `return` statement. React has not rendered the `List` children or updated the DOM yet, so this lets the `List` children skip rendering the stale `selection` value.

When you update a component during rendering, React throws away the returned JSX and immediately retries rendering. To avoid very slow cascading retries, React only lets you update the same component’s state during a render. If you update another component’s state during a render, you’ll see an error. A condition like `items !== prevItems` is necessary to avoid loops. You may adjust state like this, but any other side effects (like changing the DOM or setting timeouts) should stay in event handlers or Effects to keep components pure.\
cascade [/kæˈskeɪd/] 级联；连锁

Although this pattern is more efficient than an Effect, most components shouldn’t need it either. No matter how you do it, adjusting state based on props or other state makes your data flow more difficult to understand and debug. Always check whether you can reset all state with a key or calculate everything during rendering instead. For example, instead of storing (and resetting) the selected item, you can store the selected item ID:
```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // ✅ Best: Calculate everything during rendering
  const selection = items.find(item => item.id === selectedId) ?? null;
  // ...
}
```
Now there is no need to “adjust” the state at all. If the item with the selected ID is in the list, it remains selected. If it’s not, the `selection` calculated during rendering will be `null` because no matching item was found. This behavior is different, but arguably better because most changes to `items` preserve the selection.\
arguably [/ˈɑːrɡjuəbli/] 可论证地；可以说

### Sharing logic between event handlers
Let’s say you have a product page with two buttons (Buy and Checkout) that both let you buy that product. You want to show a notification whenever the user puts the product in the cart. Calling `showNotification()` in both buttons’ click handlers feels repetitive so you might be tempted to place this logic in an Effect:
```jsx
function ProductPage({ product, addToCart }) {
  // 🔴 Avoid: Event-specific logic inside an Effect
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`Added ${product.name} to the shopping cart!`);
    }
  }, [product]);

  function handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo('/checkout');
  }
  // ...
}
```
This Effect is unnecessary. It will also most likely cause bugs. For example, let’s say that your app “remembers” the shopping cart between the page reloads. If you add a product to the cart once and refresh the page, the notification will appear again. It will keep appearing every time you refresh that product’s page. This is because `product.isInCart` will already be `true` on the page load, so the Effect above will call `showNotification()`.

When you’re not sure whether some code should be in an Effect or in an event handler, ask yourself why this code needs to run. Use Effects only for code that should run because the component was displayed to the user. In this example, the notification should appear because the user pressed the button, not because the page was displayed! Delete the Effect and put the shared logic into a function called from both event handlers:
```jsx
function ProductPage({ product, addToCart }) {
  // ✅ Good: Event-specific logic is called from event handlers
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo('/checkout');
  }
  // ...
}
```
This both removes the unnecessary Effect and fixes the bug.

### Sending a POST request
This Form component sends two kinds of POST requests. It sends an analytics event when it mounts. When you fill in the form and click the Submit button, it will send a POST request to the `/api/register` endpoint:\
analytics [/əˈnælɪtɪks/] 分析；数据分析\
endpoint [/ˈɛndpɔɪnt/] 端点；终点
```jsx
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: This logic should run because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  // 🔴 Avoid: Event-specific logic inside an Effect
  const [jsonToSubmit, setJsonToSubmit] = useState(null);
  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit);
    }
  }, [jsonToSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }
  // ...
}
```
Let’s apply the same criteria as in the example before.\
criteria [/kraɪˈtɪəriə/] 标准；准则

The analytics POST request should remain in an Effect. This is because the reason to send the analytics event is that the form was displayed. (It would fire twice in development, but see here for how to deal with that.)

However, the `/api/register` POST request is not caused by the form being displayed. You only want to send the request at one specific moment in time: when the user presses the button. It should only ever happen on that particular interaction. Delete the second Effect and move that POST request into the event handler:\
particular [/pərˈtɪkjələr/] 特定的；具体的

```jsx
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: This logic runs because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ Good: Event-specific logic is in the event handler
    post('/api/register', { firstName, lastName });
  }
  // ...
}
```
When you choose whether to put some logic into an event handler or an Effect, the main question you need to answer is what kind of logic it is from the user’s perspective. If this logic is caused by a particular interaction, keep it in the event handler. If it’s caused by the user seeing the component on the screen, keep it in the Effect.

### Chains of computations
Sometimes you might feel tempted to chain Effects that each adjust a piece of state based on other state:
```jsx
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  // 🔴 Avoid: Chains of Effects that adjust the state solely to trigger each other
  useEffect(() => {
    if (card !== null && card.gold) {
      setGoldCardCount(c => c + 1);
    }
  }, [card]);

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound(r => r + 1)
      setGoldCardCount(0);
    }
  }, [goldCardCount]);

  useEffect(() => {
    if (round > 5) {
      setIsGameOver(true);
    }
  }, [round]);

  useEffect(() => {
    alert('Good game!');
  }, [isGameOver]);

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    } else {
      setCard(nextCard);
    }
  }

  // ...
```
There are two problems with this code.

The first problem is that it is very inefficient: the component (and its children) have to re-render between each `set` call in the chain. In the example above, in the worst case (`setCard` → render → `setGoldCardCount` → render → `setRound` → render → `setIsGameOver` → render) there are three unnecessary re-renders of the tree below.

The second problem is that even if it weren’t slow, as your code evolves, you will run into cases where the “chain” you wrote doesn’t fit the new requirements. Imagine you are adding a way to step through the history of the game moves. You’d do it by updating each state variable to a value from the past. However, setting the `card` state to a value from the past would trigger the Effect chain again and change the data you’re showing. Such code is often rigid and fragile.\
evolve [/ɪˈvɒlv/] 发展；演变\
requirement [/rɪˈkwaɪərmənt/] 要求；需求\
rigid [/ˈrɪdʒɪd/] 僵硬的；不灵活的\
fragile [/ˈfrædʒaɪl/] 脆弱的；易碎的

In this case, it’s better to calculate what you can during rendering, and adjust the state in the event handler:
```jsx
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // ✅ Calculate what you can during rendering
  const isGameOver = round > 5;

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    }

    // ✅ Calculate all the next state in the event handler
    setCard(nextCard);
    if (nextCard.gold) {
      if (goldCardCount <= 3) {
        setGoldCardCount(goldCardCount + 1);
      } else {
        setGoldCardCount(0);
        setRound(round + 1);
        if (round === 5) {
          alert('Good game!');
        }
      }
    }
  }

  // ...
```
This is a lot more efficient. Also, if you implement a way to view game history, now you will be able to set each state variable to a move from the past without triggering the Effect chain that adjusts every other value. If you need to reuse logic between several event handlers, you can extract a function and call it from those handlers.

Remember that inside event handlers, state behaves like a snapshot. For example, even after you call `setRound(round + 1)`, the `round` variable will reflect the value at the time the user clicked the button. If you need to use the next value for calculations, define it manually like `const nextRound = round + 1`.

In some cases, you can’t calculate the next state directly in the event handler. For example, imagine a form with multiple dropdowns where the options of the next dropdown depend on the selected value of the previous dropdown. Then, a chain of Effects is appropriate because you are synchronizing with network.\
appropriate [/əˈprəʊpriət/] 适当的；合适的
