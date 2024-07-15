# Describing the UI
React is a JavaScript library for rendering user interfaces (UI). UI is built from small units like buttons, text, and images. React lets you combine them into reusable, nestable components. From web sites to phone apps, everything on the screen can be broken down into components. In this chapter, you’ll learn to create, customize, and conditionally display React components.\
interface [ˈɪntərfeɪs] 接口；界面

In this chapter
- [How to write your first React component](https://react.dev/learn/your-first-component)
- [When and how to create multi-component files](https://react.dev/learn/importing-and-exporting-components)
- [How to add markup to JavaScript with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [How to use curly braces with JSX to access JavaScript functionality from your components](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
- [How to configure components with props](https://react.dev/learn/passing-props-to-a-component)
- [How to conditionally render components](https://react.dev/learn/conditional-rendering)
- [How to render multiple components at a time](https://react.dev/learn/rendering-lists)
- [How to avoid confusing bugs by keeping components pure](https://react.dev/learn/keeping-components-pure)
- [Why understanding your UI as trees is useful](https://react.dev/learn/understanding-your-ui-as-a-tree)

## Your first component
React applications are built from isolated pieces of UI called components. A React component is a JavaScript function that you can sprinkle with markup. Components can be as small as a button, or as large as an entire page. Here is a Gallery component rendering three Profile components:\
isolated [ˈaɪsəleɪtɪd] 孤立的；隔离的\
sprinkle [ˈsprɪŋkl] 撒；洒;这里指可以在函数中添加标记
```jsx
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

Ready to learn this topic?\
Read Your First Component to learn how to declare and use React components.

## Importing and exporting components
You can declare many components in one file, but large files can get difficult to navigate. To solve this, you can export a component into its own file, and then import that component from another file:
```jsx
// Gallery.js
import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```
```jsx
// Profile.js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```
#### Ready to learn this topic?
Read [Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components) to learn how to split components into their own files.
