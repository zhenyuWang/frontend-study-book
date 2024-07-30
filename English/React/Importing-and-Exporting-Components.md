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
