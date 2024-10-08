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
