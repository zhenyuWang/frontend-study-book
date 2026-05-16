# Components Basics
Components allow us to split the UI into independent and reusable pieces, and think about each piece in isolation. It's common for an app to be organized into a tree of nested components:

This is very similar to how we nest native HTML elements, but Vue implements its own component model that allows us to encapsulate custom content and logic in each component. Vue also plays nicely with native Web Components. If you are curious about the relationship between Vue Components and native Web Components, read more here.\
encapsulate [/ɪnˈkæpsjuleɪt/] 封装

## Defining a Component​
When using a build step, we typically define each Vue component in a dedicated file using the `.vue` extension - known as a Single-File Component (SFC for short):

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```
When not using a build step, a Vue component can be defined as a plain JavaScript object containing Vue-specific options:

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
}
```
The template is inlined as a JavaScript string here, which Vue will compile on the fly. You can also use an ID selector pointing to an element (usually native `<template>` elements) - Vue will use its content as the template source.\
on the fly 立即，立刻

The example above defines a single component and exports it as the default export of a `.js` file, but you can use named exports to export multiple components from the same file.
