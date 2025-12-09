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

## Mounting the App​
An application instance won't render anything until its `.mount()` method is called. It expects a "container" argument, which can either be an actual DOM element or a selector string:

```html
<div id="app"></div>
```
```js
app.mount('#app')
```
The content of the app's root component will be rendered inside the container element. The container element itself is not considered part of the app.

The `.mount()` method should always be called after all app configurations and asset registrations are done. Also note that its return value, unlike the asset registration methods, is the root component instance instead of the application instance.

### In-DOM Root Component Template​
The template for the root component is usually part of the component itself, but it is also possible to provide the template separately by writing it directly inside the mount container:

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```
```js
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```
Vue will automatically use the container's `innerHTML` as the template if the root component does not already have a template option.

In-DOM templates are often used in applications that are using Vue without a build step. They can also be used in conjunction with server-side frameworks, where the root template might be generated dynamically by the server.\
conjunction [/kənˈdʒʌŋkʃ(ə)n/] n. 结合，联合，连接
