# Responding to Events
React lets you add event handlers to your JSX. Event handlers are your own functions that will be triggered in response to interactions like clicking, hovering, focusing form inputs, and so on.

You will learn
- Different ways to write an event handler
- How to pass event handling logic from a parent component
- How events propagate and how to stop them

propagate [ˈprɒpəˌɡeɪt] v. 传播，传递

## Adding event handlers
To add an event handler, you will first define a function and then pass it as a prop to the appropriate JSX tag. For example, here is a button that doesn’t do anything yet:\
appropriate [əˈprəʊpriət] adj. 适当的，恰当的

```jsx
export default function Button() {
  return (
    <button>
      I don't do anything
    </button>
  );
}
```
You can make it show a message when a user clicks by following these three steps:

- Declare a function called `handleClick` inside your `Button` component.
- Implement the logic inside that function (use `alert` to show the message).
- Add `onClick={handleClick}` to the `<button>` JSX.

implement [ˈɪmplɪˌment] v. 实现

```jsx
export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```
You defined the `handleClick` function and then passed it as a prop to `<button>`. `handleClick` is an event handler. Event handler functions:

- Are usually defined inside your components.
- Have names that start with `handle`, followed by the name of the event.

By convention, it is common to name event handlers as `handle` followed by the event name. You’ll often see `onClick={handleClick}`, `onMouseEnter={handleMouseEnter}`, and so on.\
convention [kənˈvenʃən] n. 习俗，惯例

Alternatively, you can define an event handler inline in the JSX:\
alternatively [ɔːlˈtɜːnətɪvli] adv. 或者，另外
```jsx
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
```
Or, more concisely, using an arrow function:\
concisely [kənˈsaɪsli] adv. 简洁地
```jsx
<button onClick={() => {
  alert('You clicked me!');
}}>
```
All of these styles are equivalent. Inline event handlers are convenient for short functions.\
equivalent [ɪˈkwɪvələnt] adj. 相等的，等效的

### Reading props in event handlers
Because event handlers are declared inside of a component, they have access to the component’s props. Here is a button that, when clicked, shows an alert with its message prop:
```jsx
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Playing!">
        Play Movie
      </AlertButton>
      <AlertButton message="Uploading!">
        Upload Image
      </AlertButton>
    </div>
  );
}
```
This lets these two buttons show different messages. Try changing the messages passed to them.

### Passing event handlers as props
Often you’ll want the parent component to specify a child’s event handler. Consider buttons: depending on where you’re using a Button component, you might want to execute a different function—perhaps one plays a movie and another uploads an image.\
function-perhaps [fʌŋkʃən] n. 功能，函数

To do this, pass a prop the component receives from its parent as the event handler like so:
```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return (
    <Button onClick={handlePlayClick}>
      Play "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('Uploading!')}>
      Upload Image
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}
```
Here, the `Toolbar` component renders a `PlayButton` and an `UploadButton`:

- `PlayButton` passes `handlePlayClick` as the `onClick` prop to the `Button` inside.
- `UploadButton` passes `() => alert('Uploading!')` as the `onClick` prop to the `Button` inside.

Finally, your `Button` component accepts a prop called `onClick`. It passes that prop directly to the built-in browser `<button>` with `onClick={onClick}`. This tells React to call the passed function on click.\
directly [dɪˈrektli] adv. 直接地

If you use a design system, it’s common for components like buttons to contain styling but not specify behavior. Instead, components like `PlayButton` and `UploadButton` will pass event handlers down.

### Naming event handler props
Built-in components like `<button>` and `<div>` only support browser event names like `onClick`. However, when you’re building your own components, you can name their event handler props any way that you like.

By convention, event handler props should start with on, followed by a capital letter.

For example, the `Button` component’s `onClick` prop could have been called `onSmash`:
```jsx
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onSmash={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```
In this example, `<button onClick={onSmash}>` shows that the browser `<button>` (lowercase) still needs a prop called `onClick`, but the prop name received by your custom `Button` component is up to you!

When your component supports multiple interactions, you might name event handler props for app-specific concepts. For example, this `Toolbar` component receives `onPlayMovie` and `onUploadImage` event handlers:\
interaction [ˌɪntərˈækʃən] n. 互动，交互\
app-specific [æpˈspesɪfɪk] adj. 应用程序特定的\
concept [ˈkɒnsept] n. 概念
```jsx
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```
Notice how the `App` component does not need to know what `Toolbar` will do with `onPlayMovie` or `onUploadImage`. That’s an implementation detail of the `Toolbar`. Here, `Toolbar` passes them down as `onClick` handlers to its `Buttons`, but it could later also trigger them on a keyboard shortcut. Naming props after app-specific interactions like `onPlayMovie` gives you the flexibility to change how they’re used later.\
implementation detail [ˌɪmplɪmenˈteɪʃən diˈteɪl] 实现细节\
shortcut [ˈʃɔːtkʌt] n. 快捷方式\
flexibility [ˌfleksɪˈbɪləti] n. 灵活性

**Note**\
Make sure that you use the appropriate HTML tags for your event handlers. For example, to handle clicks, use `<button onClick={handleClick}>` instead of `<div onClick={handleClick}>`. Using a real browser `<button>` enables built-in browser behaviors like keyboard navigation. If you don’t like the default browser styling of a button and want to make it look more like a link or a different UI element, you can achieve it with CSS. Learn more about writing accessible markup.\
appropriate [əˈprəʊpriət] adj. 适当的，恰当的\
achieve [əˈtʃiːv] v. 实现，达到

## Event propagation
Event handlers will also catch events from any children your component might have. We say that an event “bubbles” or “propagates” up the tree: it starts with where the event happened, and then goes up the tree.\
propagate [ˈprɒpəˌɡeɪt] v. 传播，传递

This `<div>` contains two buttons. Both the `<div>` and each button have their own `onClick` handlers. Which handlers do you think will fire when you click a button?
```jsx
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}
```
If you click on either button, its `onClick` will run first, followed by the parent `<div>`’s `onClick`. So two messages will appear. If you click the `toolbar` itself, only the parent `<div>`’s `onClick` will run.

**Pitfall**\
All events propagate in React except `onScroll`, which only works on the JSX tag you attach it to.

### Stopping propagation
Event handlers receive an event object as their only argument. By convention, it’s usually called e, which stands for “event”. You can use this object to read information about the event.

That event object also lets you stop the propagation. If you want to prevent an event from reaching parent components, you need to call `e.stopPropagation()` like this `Button` component does:
```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```
When you click on a button:

1. React calls the `onClick` handler passed to `<button>`.
2. That handler, defined in `Button`, does the following:
    - Calls `e.stopPropagation()`, preventing the event from bubbling further.
    - Calls the `onClick` function, which is a prop passed from the `Toolbar` component.
3. That function, defined in the `Toolbar` component, displays the button’s own alert.
4. Since the propagation was stopped, the parent `<div>`’s `onClick` handler does not run.

As a result of `e.stopPropagation()`, clicking on the buttons now only shows a single alert (from the `<button>`) rather than the two of them (from the `<button>` and the parent `toolbar` `<div>`). Clicking a button is not the same thing as clicking the surrounding toolbar, so stopping the propagation makes sense for this UI.\
surround [səˈraʊnd] v. 周围；包围\
make sense 合乎情理

### Passing handlers as alternative to propagation
alternative [ɔːlˈtɜːnətɪv] n. 替代方案\
Notice how this click handler runs a line of code and then calls the `onClick` prop passed by the parent:
```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```
You could add more code to this handler before calling the parent `onClick` event handler, too. This pattern provides an alternative to propagation. It lets the child component handle the event, while also letting the parent component specify some additional behavior. Unlike propagation, it’s not automatic. But the benefit of this pattern is that you can clearly follow the whole chain of code that executes as a result of some event.\
pattern [ˈpætən] n. 模式，样式\
specify [ˈspesɪfaɪ] v. 指定，规定\
additional [əˈdɪʃənl] adj. 附加的，额外的\
automatic [ˌɔːtəˈmætɪk] adj. 自动的\
benefit [ˈbenɪfɪt] n. 好处\
chain [tʃeɪn] n. 链条\
execute [ˈeksɪkjuːt] v. 执行

If you rely on propagation and it’s difficult to trace which handlers execute and why, try this approach instead.\
trace [treɪs] v. 追踪\
approach [əˈprəʊtʃ] n. 方法

### Preventing default behavior
Some browser events have default behavior associated with them. For example, a `<form>` submit event, which happens when a button inside of it is clicked, will reload the whole page by default:
```jsx
export default function Signup() {
  return (
    <form onSubmit={() => alert('Submitting!')}>
      <input />
      <button>Send</button>
    </form>
  );
}
```
You can call `e.preventDefault()` on the event object to stop this from happening:
```jsx
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
```
Don’t confuse `e.stopPropagation()` and `e.preventDefault()`. They are both useful, but are unrelated:\
confuse [kənˈfjuːz] v. 使困惑

- `e.stopPropagation()` stops the event handlers attached to the tags above from firing.
- `e.preventDefault()` prevents the default browser behavior for the few events that have it.

## Can event handlers have side effects?
Absolutely! Event handlers are the best place for side effects.

Unlike rendering functions, event handlers don’t need to be pure, so it’s a great place to change something—for example, change an input’s value in response to typing, or change a list in response to a button press. However, in order to change some information, you first need some way to store it. In React, this is done by using state, a component’s memory. You will learn all about it on the next page.

## Recap
- You can handle events by passing a function as a prop to an element like `<button>`.
- Event handlers must be passed, not called! `onClick={handleClick}`, not `onClick={handleClick()}`.
- You can define an event handler function separately or inline.
- Event handlers are defined inside a component, so they can access props.
- You can declare an event handler in a parent and pass it as a prop to a child.
- You can define your own event handler props with application-specific names.
- Events propagate upwards. Call `e.stopPropagation()` on the first argument to prevent that.
- Events may have unwanted default browser behavior. Call `e.preventDefault()` to prevent that.
- Explicitly calling an event handler prop from a child handler is a good alternative to propagation.y
