# Importing and Exporting Components
The magic of components lies in their reusability: you can create components that are composed of other components. But as you nest more and more components, it often makes sense to start splitting them into different files. This lets you keep your files easy to scan and reuse components in more places.\
reusability 可重用性

You will learn
- What a root component file is
- How to import and export a component
- When to use default and named imports and exports
- How to import and export multiple components from one file
- How to split components into multiple files

## The root component file
In Your First Component, you made a `Profile` component and a `Gallery` component that renders it:
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
These currently live in a root component file, named `App.js` in this example. Depending on your setup, your root component could be in another file, though. If you use a framework with file-based routing, such as Next.js, your root component will be different for every page.

## Exporting and importing a component
What if you want to change the landing screen in the future and put a list of science books there? Or place all the profiles somewhere else? It makes sense to move `Gallery` and `Profile` out of the root component file. This will make them more modular and reusable in other files. You can move a component in three steps:

1. Make a new JS file to put the components in.
2. Export your function component from that file (using either default or named exports).
3. Import it in the file where you’ll use the component (using the corresponding technique for importing default or named exports).

correspond [ˌkɔːrɪˈspɒnd] v. 符合；一致；相应

Here both `Profile` and `Gallery` have been moved out of `App.js` into a new file called `Gallery.js`. Now you can change `App.js` to import `Gallery` from `Gallery.js`:
```jsx
// App.js
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
// Gallery.js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
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
Notice how this example is broken down into two component files now:

1. `Gallery.js`:
  - Defines the `Profile` component which is only used within the same file and is not exported.
  - Exports the `Gallery` component as a default export.
2. `App.js`:
  - Imports `Gallery` as a default import from `Gallery.js`.
  - Exports the root App component as a default export.

## Exporting and importing multiple components from the same file
What if you want to show just one `Profile` instead of a `gallery`? You can export the `Profile` component, too. But `Gallery.js` already has a default export, and you can’t have two default exports. You could create a new file with a default export, or you could add a named export for `Profile`. A file can only have one default export, but it can have numerous named exports!

**Note**\
To reduce the potential confusion between default and named exports, some teams choose to only stick to one style (default or named), or avoid mixing them in a single file. Do what works best for you!\
potential [pəˈtenʃl] adj. 潜在的；可能的\
confusion [kənˈfjuːʒn] n. 混淆；困惑

First, export `Profile` from `Gallery.js` using a named export (no default keyword):
```jsx
export function Profile() {
  // ...
}
```
Then, import `Profile` from `Gallery.js` to `App.js` using a named import (with the curly braces):
```jsx
import { Profile } from './Gallery.js';
```
Finally, render `<Profile />` from the App component:
```jsx
export default function App() {
  return <Profile />;
}
```
Now `Gallery.js` contains two exports: a default `Gallery` export, and a named `Profile` export. `App.js` imports both of them. Try editing `<Profile />` to `<Gallery />` and back in this example:
```jsx
// App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}
// Gallery.js
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
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
Now you’re using a mix of default and named exports:

- `Gallery.js`:
  - Exports the `Profile` component as a named export called Profile.
  - Exports the `Gallery` component as a default export.
- `App.js`:
  - Imports `Profile` as a named import called `Profile` from `Gallery.js`.
  - Imports `Gallery` as a default import from `Gallery.js`.
  - Exports the root App component as a default export.

## Recap
On this page you learned:

- What a root component file is
- How to import and export a component
- When and how to use default and named imports and exports
- How to export multiple components from the same file
