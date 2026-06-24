# Component Events

## Emitting and Listening to Events​
A component can emit custom events directly in template expressions (e.g. in a `v-on` handler) using the built-in `$emit` method:

```template
<!-- MyComponent -->
<button @click="$emit('someEvent')">Click Me</button>
```
The `$emit()` method is also available on the component instance as `this.$emit()`:

```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```
The parent can then listen to it using `v-on`:

```template
<MyComponent @some-event="callback" />
```
The `.once` modifier is also supported on component event listeners:

```template
<MyComponent @some-event.once="callback" />
```
Like components and props, event names provide an automatic case transformation. Notice we emitted a camelCase event, but can listen for it using a kebab-cased listener in the parent. As with props casing, we recommend using kebab-cased event listeners in templates.

**TIP**

Unlike native DOM events, component emitted events do not bubble. You can only listen to the events emitted by a direct child component. If there is a need to communicate between sibling or deeply nested components, use an external event bus or a global state management solution.
