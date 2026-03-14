# Event Handling

## Listening to Events​
We can use the `v-on` directive, which we typically shorten to the `@` symbol, to listen to DOM events and run some JavaScript when they're triggered. The usage would be `v-on:click="handler"` or with the shortcut, `@click="handler"`.

The handler value can be one of the following:

1. Inline handlers: Inline JavaScript to be executed when the event is triggered (similar to the native `onclick` attribute).
2. Method handlers: A property name or path that points to a method defined on the component.

## Inline Handlers​
Inline handlers are typically used in simple cases, for example:

```js
const count = ref(0)
```

```html
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

## Method Handlers​
The logic for many event handlers will be more complex though, and likely isn't feasible with inline handlers. That's why `v-on` can also accept the name or path of a component method you'd like to call.\
feasible [ˈfiːzəbl] adj. 可行的；行得通的；合理的；可实行的

For example:

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}
```
```template
<!-- `greet` is the name of the method defined above -->
<button @click="greet">Greet</button>
```
A method handler automatically receives the native DOM Event object that triggers it - in the example above, we are able to access the element dispatching the event via `event.target`.


### Method vs. Inline Detection​
The template compiler detects method handlers by checking whether the `v-on` value string is a valid JavaScript identifier or property access path. For example, `foo`, `foo.bar` and `foo['bar']` are treated as method handlers, while `foo()` and `count++` are treated as inline handlers.\
detect [dɪˈtekt] v. 发现；察觉；检测；侦查

## Calling Methods in Inline Handlers​
Instead of binding directly to a method name, we can also call methods in an inline handler. This allows us to pass the method custom arguments instead of the native event:

```js
function say(message) {
  alert(message)
}
```
```template
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```
