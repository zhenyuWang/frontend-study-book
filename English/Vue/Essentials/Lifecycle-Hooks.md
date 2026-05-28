# Lifecycle Hooks
Each Vue component instance goes through a series of initialization steps when it's created - for example, it needs to set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes. Along the way, it also runs functions called lifecycle hooks, giving users the opportunity to add their own code at specific stages.

## Registering Lifecycle Hooks​
For example, the `mounted` hook can be used to run code after the component has finished the initial rendering and created the DOM nodes:

```js
export default {
  mounted() {
    console.log(`the component is now mounted.`)
  }
}
```
There are also other hooks which will be called at different stages of the instance's lifecycle, with the most commonly used being `mounted`, `updated`, and `unmounted`.

All lifecycle hooks are called with their `this` context pointing to the current active instance invoking it. Note this means you should avoid using arrow functions when declaring lifecycle hooks, as you won't be able to access the component instance via `this` if you do so.
