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

## Event Arguments​
It's sometimes useful to emit a specific value with an event. For example, we may want the `<BlogPost>` component to be in charge of how much to enlarge the text by. In those cases, we can pass extra arguments to `$emit` to provide this value:\
in charge of 负责：掌管或负责某事\
enlarge 放大：使变大或扩大

```template
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```
Then, when we listen to the event in the parent, we can use an inline arrow function as the listener, which allows us to access the event argument:

```template
<MyButton @increase-by="(n) => count += n" />
```
Or, if the event handler is a method:

```template
<MyButton @increase-by="increaseCount" />
```
Then the value will be passed as the first parameter of that method:

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```
**TIP**

All extra arguments passed to `$emit()` after the event name will be forwarded to the listener. For example, with `$emit('foo', 1, 2, 3)` the listener function will receive three arguments.
