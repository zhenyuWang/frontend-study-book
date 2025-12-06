# Creating a Vue Application

## The Application Instance​
Every Vue application starts by creating a new application instance with the `createApp` function:

```js
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

## The Root Component​
The object we are passing into `createApp` is in fact a component. Every app requires a "root component" that can contain other components as its children.

If you are using Single-File Components, we typically import the root component from another file:

```js
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```
While many examples in this guide only need a single component, most real applications are organized into a tree of nested, reusable components. For example, a Todo application's component tree might look like this:

```plaintext
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```
In later sections of the guide, we will discuss how to define and compose multiple components together. Before that, we will focus on what happens inside a single component.
