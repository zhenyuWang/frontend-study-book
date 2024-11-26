# Render and Commit
Before your components are displayed on screen, they must be rendered by React. Understanding the steps in this process will help you think about how your code executes and explain its behavior.

You will learn
- What rendering means in React
- When and why React renders a component
- The steps involved in displaying a component on screen
- Why rendering does not always produce a DOM update

Imagine that your components are cooks in the kitchen, assembling tasty dishes from ingredients. In this scenario, React is the waiter who puts in requests from customers and brings them their orders. This process of requesting and serving UI has three steps:\
assemble [əˈsembl]: v. 组装，装配\
tasty [ˈteɪsti]: adj. 美味的\
ingredient [ɪnˈɡriːdiənt]: n. 成分，原料\
scenario [sɪˈnɑːriəʊ]: n. 情节，剧本

1. Triggering a render (delivering the guest’s order to the kitchen)
2. Rendering the component (preparing the order in the kitchen)
3. Committing to the DOM (placing the order on the table)

deliver [dɪˈlɪvə]: v. 递送，传送

## Step 1: Trigger a render
There are two reasons for a component to render:

1. It’s the component’s initial render.
2. The component’s (or one of its ancestors’) state has been updated.

ancestors [ˈænsestəz]: n. 祖先，祖宗

### Initial render
When your app starts, you need to trigger the initial render. Frameworks and sandboxes sometimes hide this code, but it’s done by calling `createRoot` with the target DOM node, and then calling its render method with your component:
```jsx
// index.js
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
// Image.js
export default function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```
Try commenting out the `root.render()` call and see the component disappear!

### Re-renders when state updates
Once the component has been initially rendered, you can trigger further renders by updating its state with the set function. Updating your component’s state automatically queues a render. (You can imagine these as a restaurant guest ordering tea, dessert, and all sorts of things after putting in their first order, depending on the state of their thirst or hunger.)

## Step 2: React renders your components
After you trigger a render, React calls your components to figure out what to display on screen. “Rendering” is React calling your components.

- On initial render, React will call the root component.
- For subsequent renders, React will call the function component whose state update triggered the render.

This process is recursive: if the updated component returns some other component, React will render that component next, and if that component also returns something, it will render that component next, and so on. The process will continue until there are no more nested components and React knows exactly what should be displayed on screen.\
figure out [ˈfɪɡjər aʊt]: v. 理解，弄清楚，计算出\
recursive [rɪˈkɜːrsɪv]: adj. 递归的

In the following example, React will call `Gallery()` and  `Image()` several times:
```jsx
// index.js
import Gallery from './Gallery.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Gallery />);
// Gallery.js
export default function Gallery() {
  return (
    <section>
      <h1>Inspiring Sculptures</h1>
      <Image />
      <Image />
      <Image />
    </section>
  );
}

function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```
- During the initial render, React will create the DOM nodes for `<section>`, `<h1>`, and three `<img>` tags.
- During a re-render, React will calculate which of their properties, if any, have changed since the previous render. It won’t do anything with that information until the next step, the commit phase.

phase [feɪz]: n. 阶段

**Pitfall**\
Rendering must always be a pure calculation:

- Same inputs, same output. Given the same inputs, a component should always return the same JSX. (When someone orders a salad with tomatoes, they should not receive a salad with onions!)
- It minds its own business. It should not change any objects or variables that existed before rendering. (One order should not change anyone else’s order.)

Otherwise, you can encounter confusing bugs and unpredictable behavior as your codebase grows in complexity. When developing in “Strict Mode”, React calls each component’s function twice, which can help surface mistakes caused by impure functions.\
encounter [ɪnˈkaʊntər]: v. 遭遇，遇到\
unpredictable [ʌnˈprɪdɪktəbl]: adj. 不可预测的\
surface [ˈsɜːrfɪs]: v. 显露，暴露\
impure [ɪmˈpjʊr]: adj. 不纯的，不纯净的

**Optimizing performance**

The default behavior of rendering all components nested within the updated component is not optimal for performance if the updated component is very high in the tree. If you run into a performance issue, there are several opt-in ways to solve it described in the Performance section. Don’t optimize prematurely!\
optimal [ˈɒptɪməl]: adj. 最佳的，最优的\
opt-in: adj. 自愿的，选择的\
prematurely [prɪˈmætʃərli]: adv. 过早地

## Step 3: React commits changes to the DOM
After rendering (calling) your components, React will modify the DOM.

- For the initial render, React will use the `appendChild()` DOM API to put all the DOM nodes it has created on screen.
- For re-renders, React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.

minimal [ˈmɪnɪməl]: adj. 最小的，最低限度的\
necessary [ˈnesəsəri]: adj. 必要的，必需的\
operation [ˌɒpəˈreɪʃn]: n. 操作，运算

React only changes the DOM nodes if there’s a difference between renders. For example, here is a component that re-renders with different props passed from its parent every second. Notice how you can add some text into the `<input>`, updating its value, but the text doesn’t disappear when the component re-renders:
```jsx
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```
This works because during this last step, React only updates the content of `<h1>` with the new time. It sees that the `<input>` appears in the JSX in the same place as last time, so React doesn’t touch the `<input>`—or its `value`!

## Epilogue: Browser paint
After rendering is done and React updated the DOM, the browser will repaint the screen. Although this process is known as “browser rendering”, we’ll refer to it as “painting” to avoid confusion throughout the docs.\
repaint [ˌriːˈpeɪnt]: v. 重绘

## Recap
- Any screen update in a React app happens in three steps:
  1. Trigger
  2. Render
  3. Commit
- You can use Strict Mode to find mistakes in your components
- React does not touch the DOM if the rendering result is the same as last time
