# Passing Props to a Component
React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions.

**You will learn**
- How to pass props to a component
- How to read props from a component
- How to specify default values for props
- How to pass some JSX to a component
- How props change over time

## Familiar props
Props are the information that you pass to a JSX tag. For example, `className`, `src`, `alt`, `width`, and `height` are some of the props you can pass to an `<img>`:
```jsx
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}
```
The props you can pass to an `<img>` tag are predefined (ReactDOM conforms to the HTML standard). But you can pass any props to your own components, such as `<Avatar>`, to customize them. Here’s how!\
predefined [prɪˈdɪnaɪnd] 预先定义的\
standard [ˈstændərd] 标准

## Passing props to a component
In this code, the `Profile` component isn’t passing any props to its child component, `Avatar`:
```jsx
export default function Profile() {
  return (
    <Avatar />
  );
}
```
You can give `Avatar` some props in two steps.

### Step 1: Pass props to the child component 
First, pass some props to `Avatar`. For example, let’s pass two props: `person` (an object), and `size` (a number):
```jsx
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```
**Note**\
If double curly braces after `person=` confuse you, recall they’re merely an object inside the JSX curlies.

Now you can read these props inside the `Avatar` component.

### Step 2: Read props inside the child component 
You can read these props by listing their names `person`, `size` separated by the commas inside `({` and `})` directly after `function Avatar`. This lets you use them inside the `Avatar` code, like you would with a variable.\
separated [ˈsepəreɪtɪd] 分离\
commas [ˈkɑːməz] 逗号
```jsx
function Avatar({ person, size }) {
  // person and size are available here
}
```
Add some logic to `Avatar` that uses the `person` and `size` props for rendering, and you’re done.

Now you can configure `Avatar` to render in many different ways with different props. Try tweaking the values!
```jsx
// App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
    </div>
  );
}

// utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```
Props let you think about parent and child components independently. For example, you can change the `person` or the `size` props inside `Profile` without having to think about how `Avatar` uses them. Similarly, you can change how the `Avatar` uses these props, without looking at the `Profile`.

You can think of props like “knobs” that you can adjust. They serve the same role as arguments serve for functions—in fact, props are the only argument to your component! React component functions accept a single argument, a `props` object:
```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```
Usually you don’t need the whole `props` object itself, so you destructure it into individual props.

**Pitfall**\
Don’t miss the pair of `{` and `}` curlies inside of `(` and `)` when declaring props:
```jsx
function Avatar({ person, size }) {
  // ...
}
```
This syntax is called “destructuring” and is equivalent to reading properties from a function parameter:
```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```
## Specifying a default value for a prop
If you want to give a prop a default value to fall back on when no value is specified, you can do it with the destructuring by putting `=` and the default value right after the parameter:
```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```
Now, if `<Avatar person={...} />` is rendered with no size prop, the size will be set to 100.

The default value is only used if the size prop is missing or if you pass `size={undefined}`. But if you pass `size={null}` or `size={0}`, the default value will not be used.

## Forwarding props with the JSX spread syntax
Sometimes, passing props gets very repetitive:\
repetitive [rɪˈpetətɪv] 重复的
```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```
There’s nothing wrong with repetitive code—it can be more legible. But at times you may value conciseness. Some components forward all of their props to their children, like how this `Profile` does with `Avatar`. Because they don’t use any of their props directly, it can make sense to use a more concise “spread” syntax:\
legible [ˈledʒəbl] 易读的\
conciseness [kənˈsaɪn.nəs] 简洁
```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```
This forwards all of `Profile’s` props to the `Avatar` without listing each of their names.

Use spread syntax with restraint. If you’re using it in every other component, something is wrong. Often, it indicates that you should split your components and pass children as JSX. More on that next!\
restraint [rɪˈstreɪnt] 克制\
indicate [ˈɪndɪkeɪt] 表明

## Passing JSX as children
It is common to nest built-in browser tags:
```jsx
<div>
  <img />
</div>
```
Sometimes you’ll want to nest your own components the same way:
```jsx
<Card>
  <Avatar />
</Card>
```
When you nest content inside a JSX tag, the parent component will receive that content in a prop called children. For example, the `Card` component below will receive a children prop set to `<Avatar />` and render it in a wrapper div:
```jsx
// App.js
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}

// Avatar.js
import { getImageUrl } from './utils.js';

export default function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

// utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```
Try replacing the `<Avatar>` inside `<Card>` with some text to see how the `Card` component can wrap any nested content. It doesn’t need to “know” what’s being rendered inside of it. You will see this flexible pattern in many places.

You can think of a component with a children prop as having a “hole” that can be “filled in” by its parent components with arbitrary JSX. You will often use the children prop for visual wrappers: panels, grids, etc.\
arbitrary [ˈɑːrbɪˌtrerɪ] 任意的
