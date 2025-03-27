# Passing Data Deeply with Context
Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.

**You will learn**\
- What “prop drilling” is
- How to replace repetitive prop passing with context
- Common use cases for context
- Common alternatives to context

alternative [/ɔːlˈtɜːrnətɪv/] n. 替代的；替代物

## The problem with passing props
Passing props is a great way to explicitly pipe data through your UI tree to the components that use it.

But passing props can become verbose and inconvenient when you need to pass some prop deeply through the tree, or if many components need the same prop. The nearest common ancestor could be far removed from the components that need data, and lifting state up that high can lead to a situation called “prop drilling”.\
ancestor [ˈænʃstə(r)] n. 祖先；前辈

Wouldn’t it be great if there were a way to “teleport” data to the components in the tree that need it without passing props? With React’s context feature, there is!

## Context: an alternative to passing props
Context lets a parent component provide data to the entire tree below it. There are many uses for context. Here is one example. Consider this `Heading` component that accepts a `level` for its size:

Let’s say you want multiple headings within the same `Section` to always have the same size:

Currently, you pass the `level` prop to each `<Heading>` separately:

It would be nice if you could pass the `level` prop to the `<Section>` component instead and remove it from the `<Heading>`. This way you could enforce that all headings in the same section have the same size:\
enforce [ɪnˈfɔːrs] vt. 强制执行；强迫

But how can the `<Heading>` component know the level of its closest `<Section>`? That would require some way for a child to “ask” for data from somewhere above in the tree.

You can’t do it with props alone. This is where context comes into play. You will do it in three steps:

1. Create a context. (You can call it `LevelContext`, since it’s for the heading level.)
2. Use that context from the component that needs the data. (`Heading` will use `LevelContext`.)
3. Provide that context from the component that specifies the data. (`Section` will provide `LevelContext`.)

Context lets a parent—even a distant one!—provide some data to the entire tree inside of it.\
distant [ˈdɪstənt] adj. 遥远的；远隔的

### Step 1: Create the context
First, you need to create the context. You’ll need to export it from a file so that your components can use it:

The only argument to `createContext` is the default value. Here, `1` refers to the biggest heading level, but you could pass any kind of value (even an object). You will see the significance of the default value in the next step.\
significance [sɪɡˈnɪfɪkəns] n. 重要性；意义

### Step 2: Use the context
Import the `useContext` Hook from React and your context:
```jsx
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';
```
Currently, the `Heading` component reads `level` from props:
```jsx
export default function Heading({ level, children }) {
  // ...
}
```
Instead, remove the `level` prop and read the value from the context you just imported, `LevelContext`:
```jsx
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}
```
`useContext` is a Hook. Just like `useState` and `useReducer`, you can only call a Hook immediately inside a React component (not inside loops or conditions). `useContext` tells React that the `Heading` component wants to read the `LevelContext`.

Now that the `Heading` component doesn’t have a level prop, you don’t need to pass the level prop to `Heading` in your JSX like this anymore:
```jsx
<Section>
  <Heading level={4}>Sub-sub-heading</Heading>
  <Heading level={4}>Sub-sub-heading</Heading>
  <Heading level={4}>Sub-sub-heading</Heading>
</Section>
```
Update the JSX so that it’s the `Section` that receives it instead:
```jsx
<Section level={4}>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
</Section>
```
As a reminder, this is the markup that you were trying to get working:

Notice this example doesn’t quite work, yet! All the headings have the same size because even though you’re using the context, you have not provided it yet. React doesn’t know where to get it!

If you don’t provide the context, React will use the default value you’ve specified in the previous step. In this example, you specified 1 as the argument to `createContext`, so `useContext(LevelContext)` returns `1`, setting all those headings to `<h1>`. Let’s fix this problem by having each `Section` provide its own context.

### Step 3: Provide the context 
The `Section` component currently renders its children:
```jsx
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```
Wrap them with a context provider to provide the `LevelContext` to them:
```jsx
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}
```
This tells React: “if any component inside this `<Section>` asks for `LevelContext`, give them this level.” The component will use the value of the nearest `<LevelContext>` in the UI tree above it.

It’s the same result as the original code, but you did not need to pass the `level` prop to each `Heading` component! Instead, it “figures out” its heading level by asking the closest `Section` above:

1. You pass a level prop to the `<Section>`.
2. `Section` wraps its children into `<LevelContext value={level}>`.
3. `Heading` asks the closest value of `LevelContext` above with `useContext(LevelContext)`.

## Using and providing context from the same component
Currently, you still have to specify each section’s level manually:
```jsx
export default function Page() {
  return (
    <Section level={1}>
      ...
      <Section level={2}>
        ...
        <Section level={3}>
          ...
```
Since context lets you read information from a component above, each `Section` could read the `level` from the `Section` above, and pass `level + 1` down automatically. Here is how you could do it:
```jsx
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```
With this change, you don’t need to pass the level prop either to the `<Section>` or to the `<Heading>`:

Now both `Heading` and `Section` read the `LevelContext` to figure out how “deep” they are. And the `Section` wraps its children into the `LevelContext` to specify that anything inside of it is at a “deeper” level.

**Note**\
This example uses heading levels because they show visually how nested components can override context. But context is useful for many other use cases too. You can pass down any information needed by the entire subtree: the current color theme, the currently logged in user, and so on.\
visually [ˈvɪʒuəli] adv. 视觉上地

## Context passes through intermediate components
You can insert as many components as you like between the component that provides context and the one that uses it. This includes both built-in components like `<div>` and components you might build yourself.

In this example, the same `Post` component (with a dashed border) is rendered at two different nesting levels. Notice that the `<Heading>` inside of it gets its level automatically from the closest `<Section>`:

You didn’t do anything special for this to work. A `Section` specifies the context for the tree inside it, so you can insert a `<Heading>` anywhere, and it will have the correct size. Try it in the sandbox above!

Context lets you write components that “adapt to their surroundings” and display themselves differently depending on where (or, in other words, in which context) they are being rendered.\
adapt [əˈdæpt] vi. 适应；适合\
surrounding [səˈraʊndɪŋ] n. 环境；周围

How context works might remind you of CSS property inheritance. In CSS, you can specify color: `blue` for a `<div>`, and any DOM node inside of it, no matter how deep, will inherit that color unless some other DOM node in the middle overrides it with color: `green`. Similarly, in React, the only way to override some context coming from above is to wrap children into a context provider with a different value.

In CSS, different properties like `color` and `background-color` don’t override each other. You can set all  `<div>`’s color to `red` without impacting `background-color`. Similarly, different React contexts don’t override each other. Each context that you make with `createContext()` is completely separate from other ones, and ties together components using and providing that particular context. One component may use or provide many different contexts without a problem.\
impact [ˈɪmpækt] n. 影响；作用\
separate [ˈsepərət] adj. 分开的；独立的\
tie [taɪ] v. 连接；系\
particular [pəˈtɪkjələ(r)] adj. 特定的；特殊的
