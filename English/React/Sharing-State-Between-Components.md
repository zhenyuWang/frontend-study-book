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

### Step 3: Add state to the common parent
Lifting state up often changes the nature of what you’re storing as state.\
nature [ˈneɪtʃər] 本质;性质

In this case, only one panel should be active at a time. This means that the `Accordion` common parent component needs to keep track of which panel is the active one. Instead of a `boolean` value, it could use a number as the index of the active `Panel` for the state variable:\
track [træk] 跟踪
```jsx
const [activeIndex, setActiveIndex] = useState(0);
```
When the `activeIndex` is 0, the first panel is active, and when it’s `1`, it’s the second one.

Clicking the “Show” button in either `Panel` needs to change the active index in `Accordion`. A `Panel` can’t set the `activeIndex` state directly because it’s defined inside the `Accordion`. The `Accordion` component needs to explicitly allow the `Panel` component to change its state by passing an event handler down as a prop:\
explicitly [ɪkˈsplɪsɪtli] 明确地
```jsx
<>
  <Panel
    isActive={activeIndex === 0}
    onShow={() => setActiveIndex(0)}
  >
    ...
  </Panel>
  <Panel
    isActive={activeIndex === 1}
    onShow={() => setActiveIndex(1)}
  >
    ...
  </Panel>
</>
```
The `<button>` inside the `Panel` will now use the `onShow` prop as its click event handler:
```jsx
import { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
}
```
This completes lifting state up! Moving state into the common parent component allowed you to coordinate the two panels. Using the active index instead of two “is shown” flags ensured that only one panel is active at a given time. And passing down the event handler to the child allowed the child to change the parent’s state.\
coordinate [koʊˈɔːrdɪneɪt] 协调

#### Controlled and uncontrolled components
It is common to call a component with some local state “uncontrolled”. For example, the original `Panel` component with an `isActive` state variable is uncontrolled because its parent cannot influence whether the panel is active or not.\
influence [ˈɪnflʊəns] 影响

In contrast, you might say a component is “controlled” when the important information in it is driven by props rather than its own local state. This lets the parent component fully specify its behavior. The final `Panel` component with the `isActive` prop is controlled by the `Accordion` component.\
contrast [ˈkɑːntræst] 对比

Uncontrolled components are easier to use within their parents because they require less configuration. But they’re less flexible when you want to coordinate them together. Controlled components are maximally flexible, but they require the parent components to fully configure them with props.\
maximally [ˈmæksɪməli] 最大程度地;\
flexible [ˈfleksəbl] 灵活的

In practice, “controlled” and “uncontrolled” aren’t strict technical terms—each component usually has some mix of both local state and props. However, this is a useful way to talk about how components are designed and what capabilities they offer.\
strict technical terms 严格的技术术语\
capabilities [ˌkeɪpəˈbɪləti] 能力

When writing a component, consider which information in it should be controlled (via props), and which information should be uncontrolled (via state). But you can always change your mind and refactor later.
