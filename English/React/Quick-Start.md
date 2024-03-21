# Quick Start

Welcome to the React documentation! This page will give you an introduction to the 80% of React concepts that you will use on a daily basis.\
concepts [kɒnsept] n. 概念;\
basis ['beɪsɪs] n. 基础;

You will learn
- How to create and nest components
- How to add markup and styles
- How to display data
- How to render conditions and lists
- How to respond to events and update the screen
- How to share data between components

## Creating and nesting components
React apps are made out of components. A component is a piece of the UI(user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.\
logic ['lɒdʒɪk] n. 逻辑;\
interface ['ɪntəfeɪs] n. 界面\
appearance [ə'pɪərəns] n. 外貌\
entire [ɪn'taɪə] adj. 整个的

React components are JavaScript functions that return markup:
```jsx
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```
Now that you've declared `MyButton`, you can nest it into another component:
```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```
declare [dɪ'kleə] v. 声明;\
Notice that `<MyButton />` starts with a capital letter. That's how you know it's a React component. React component names must start with a capital letter, while HTML tags must be lowercase.

Have a look at the result:
```jsx
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```
The `export default` keywords specify the main component in the file. If you're not familiar with some piece of JavaScript syntax, `MDN` and `javascript.info` have great references.
