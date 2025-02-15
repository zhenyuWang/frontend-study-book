# Sharing State Between Components
Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as lifting state up, and it’s one of the most common things you will do writing React code.

**You will learn**\
- How to share state between components by lifting it up
- What are controlled and uncontrolled components

## Lifting state up by example
In this example, a parent `Accordion` component renders two separate `Panel`s:

- Accordion
	- Panel
	- Panel

Each `Panel` component has a boolean `isActive` state that determines whether its content is visible.

Press the Show button for both panels:
```jsx
import { useState } from 'react';

function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology">
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}
```
Notice how pressing one panel’s button does not affect the other panel—they are independent.

But now let’s say you want to change it so that only one panel is expanded at any given time. With that design, expanding the second panel should collapse the first one. How would you do that?

To coordinate these two panels, you need to “lift their state up” to a parent component in three steps:\
coordinate [/koʊˈɔːrdɪneɪt/] 协调

1. Remove state from the child components.
2. Pass hardcoded data from the common parent.
3. Add state to the common parent and pass it down together with the event handlers.

hardcoded data 硬编码数据\
This will allow the `Accordion` component to coordinate both `Panels` and only expand one at a time.

### Step 1: Remove state from the child components 
You will give control of the `Panel`’s `isActive` to its parent component. This means that the parent component will pass `isActive` to `Panel` as a prop instead. Start by removing this line from the Panel component:
```jsx
const [isActive, setIsActive] = useState(false);
```
And instead, add `isActive` to the `Panel`’s list of props:
```jsx
function Panel({ title, children, isActive }) {
```
Now the `Panel`’s parent component can control `isActive` by passing it down as a prop. Conversely, the `Panel` component now has no control over the value of `isActive`—it’s now up to the parent component!

### Step 2: Pass hardcoded data from the common parent 
To lift state up, you must locate the closest common parent component of both of the child components that you want to coordinate:

- `Accordion` (closest common parent)
    - `Panel`
    - `Panel`

In this example, it’s the `Accordion` component. Since it’s above both panels and can control their props, it will become the “source of truth” for which panel is currently active. Make the `Accordion` component pass a hardcoded value of `isActive` (for example, true) to both panels:
```jsx
import { useState } from 'react';

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About" isActive={true}>
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology" isActive={true}>
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}
```
Try editing the hardcoded `isActive` values in the `Accordion` component and see the result on the screen.
