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

### Event propagation
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
