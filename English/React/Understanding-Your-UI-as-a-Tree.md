# Understanding Your UI as a Tree
Your React app is taking shape with many components being nested within each other. How does React keep track of your app’s component structure?\
track [træk] 追踪

React, and many other UI libraries, model UI as a tree. Thinking of your app as a tree is useful for understanding the relationship between components. This understanding will help you debug future concepts like performance and state management.

**You will learn**
- How React “sees” component structures
- What a render tree is and what it is useful for
- What a module dependency tree is and what it is useful for

## Your UI as a tree
Trees are a relationship model between items and UI is often represented using tree structures. For example, browsers use tree structures to model HTML (DOM) and CSS (CSSOM). Mobile platforms also use trees to represent their view hierarchy.\
represent [ˌreprɪˈzent] 代表、表现\
hierarchy [ˈhaɪərɑːrki] 等级制度

Like browsers and mobile platforms, React also uses tree structures to manage and model the relationship between components in a React app. These trees are useful tools to understand how data flows through a React app and how to optimize rendering and app size.

## The Render Tree
A major feature of components is the ability to compose components of other components. As we nest components, we have the concept of parent and child components, where each parent component may itself be a child of another component.\
major [ˈmeɪdʒər] 主要的、重要的\
ability	[əˈbɪləti] 能力\
compose [kəmˈpoʊz] 组成、构成\
concept [ˈkɑːnsept] 概念

When we render a React app, we can model this relationship in a tree, known as the render tree.

Here is a React app that renders inspirational quotes.\
inspirational [ˌɪnspəˈreɪʃənl] 鼓舞人心的

```jsx
// App.js
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}
// FancyText.js
export default function FancyText({title, text}) {
  return title
    ? <h1 className='fancy title'>{text}</h1>
    : <h3 className='fancy cursive'>{text}</h3>
}
// InspirationGenerator.js
import * as React from 'react';
import quotes from './quotes';
import FancyText from './FancyText';

export default function InspirationGenerator({children}) {
  const [index, setIndex] = React.useState(0);
  const quote = quotes[index];
  const next = () => setIndex((index + 1) % quotes.length);

  return (
    <>
      <p>Your inspirational quote is:</p>
      <FancyText text={quote} />
      <button onClick={next}>Inspire me again</button>
      {children}
    </>
  );
}
// Copyright.js
export default function Copyright({year}) {
  return <p className='small'>©️ {year}</p>;
}
// quotes.js
export default [
	"Don’t let yesterday take up too much of today.” — Will Rogers",
	"Ambition is putting a ladder against the sky.",
	"A joy that's shared is a joy made double.",
];
```
From the example app, we can construct the above render tree.

The tree is composed of nodes, each of which represents a component. `App`, `FancyText`, `Copyright`, to name a few, are all nodes in our tree.

The root node in a React render tree is the root component of the app. In this case, the root component is `App` and it is the first component React renders. Each arrow in the tree points from a parent component to a child component.

A render tree represents a single render pass of a React application. With conditional rendering, a parent component may render different children depending on the data passed.

We can update the app to conditionally render either an inspirational quote or color.
```jsx
// App.js
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}
// FancyText.js
export default function FancyText({title, text}) {
  return title
    ? <h1 className='fancy title'>{text}</h1>
    : <h3 className='fancy cursive'>{text}</h3>
}
// Color.js
export default function Color({value}) {
  return <div className="colorbox" style={{backgroundColor: value}} />
}
// InspirationGenerator.js
import * as React from 'react';
import inspirations from './inspirations';
import FancyText from './FancyText';
import Color from './Color';

export default function InspirationGenerator({children}) {
  const [index, setIndex] = React.useState(0);
  const inspiration = inspirations[index];
  const next = () => setIndex((index + 1) % inspirations.length);

  return (
    <>
      <p>Your inspirational {inspiration.type} is:</p>
      {inspiration.type === 'quote'
      ? <FancyText text={inspiration.value} />
      : <Color value={inspiration.value} />}

      <button onClick={next}>Inspire me again</button>
      {children}
    </>
  );
}
// Copyright.js
export default function Copyright({year}) {
  return <p className='small'>©️ {year}</p>;
}
// inspirations.js
export default [
  {type: 'quote', value: "Don’t let yesterday take up too much of today.” — Will Rogers"},
  {type: 'color', value: "#B73636"},
  {type: 'quote', value: "Ambition is putting a ladder against the sky."},
  {type: 'color', value: "#256266"},
  {type: 'quote', value: "A joy that's shared is a joy made double."},
  {type: 'color', value: "#F9F2B4"},
];
```
In this example, depending on what `inspiration.type` is, we may render `<FancyText>` or `<Color>`. The render tree may be different for each render pass.

Although render trees may differ across render passes, these trees are generally helpful for identifying what the top-level and leaf components are in a React app. Top-level components are the components nearest to the root component and affect the rendering performance of all the components beneath them and often contain the most complexity. Leaf components are near the bottom of the tree and have no child components and are often frequently re-rendered.

Identifying these categories of components are useful for understanding data flow and performance of your app.

## The Module Dependency Tree
Another relationship in a React app that can be modeled with a tree are an app’s module dependencies. As we break up our components and logic into separate files, we create JS modules where we may export components, functions, or constants.

Each node in a module dependency tree is a module and each branch represents an import statement in that module.

If we take the previous Inspirations app, we can build a module dependency tree, or dependency tree for short.\
inspiration [ˌɪnspəˈreɪʃən] 灵感、启示

The root node of the tree is the root module, also known as the entrypoint file. It often is the module that contains the root component.

Comparing to the render tree of the same app, there are similar structures but some notable differences:
- The nodes that make-up the tree represent modules, not components.
- Non-component modules, like `inspirations.js`, are also represented in this tree. The render tree only encapsulates components.
- `Copyright.js` appears under `App.js` but in the render tree, `Copyright`, the component, appears as a child of `InspirationGenerator`. This is because `InspirationGenerator` accepts JSX as children props, so it renders `Copyright` as a child component but does not import the module.

encapsulate [ɪnˈkæpsəleɪt] 封装

Dependency trees are useful to determine what modules are necessary to run your React app. When building a React app for production, there is typically a build step that will bundle all the necessary JavaScript to ship to the client. The tool responsible for this is called a bundler, and bundlers will use the dependency tree to determine what modules should be included.\
determine [dɪˈtɜːrmɪn] 确定、决定\
necessary [ˈnesəˌseri] 必要的\
typically [ˈtɪpɪkəli] 通常的\
responsible [rɪˈspɑːnsəbl] 负责的

As your app grows, often the bundle size does too. Large bundle sizes are expensive for a client to download and run. Large bundle sizes can delay the time for your UI to get drawn. Getting a sense of your app’s dependency tree may help with debugging these issues.

## Recap
- Trees are a common way to represent the relationship between entities. They are often used to model UI.
- Render trees represent the nested relationship between React components across a single render.
- With conditional rendering, the render tree may change across different renders. With different prop values, components may render different children components.
- Render trees help identify what the top-level and leaf components are. Top-level components affect the rendering performance of all components beneath them and leaf components are often re-rendered frequently. Identifying them is useful for understanding and debugging rendering performance.
- Dependency trees represent the module dependencies in a React app.
- Dependency trees are used by build tools to bundle the necessary code to ship an app.
- Dependency trees are useful for debugging large bundle sizes that slow time to paint and expose opportunities for optimizing what code is bundled.
