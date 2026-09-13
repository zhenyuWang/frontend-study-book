# Custom Directives

## Introduction​
In addition to the default set of directives shipped in core (like `v-model` or `v-show`), Vue also allows you to register your own custom directives.

We have introduced two forms of code reuse in Vue: components and composables. Components are the main building blocks, while composables are focused on reusing stateful logic. Custom directives, on the other hand, are mainly intended for reusing logic that involves low-level DOM access on plain elements.

A custom directive is defined as an object containing lifecycle hooks similar to those of a component. The hooks receive the element the directive is bound to. Here is an example of a directive that adds a class to an element when it is inserted into the DOM by Vue:

```js
const highlight = {
  mounted: (el) => el.classList.add('is-highlight')
}

export default {
  directives: {
    // enables v-highlight in template
    highlight
  }
}
```
```template
<p v-highlight>This sentence is important!</p>
```
Similar to components, custom directives must be registered so that they can be used in templates. In the example above, we are using local registration via the directives option.

It is also common to globally register custom directives at the app level:

```js
const app = createApp({})

// make v-highlight usable in all components
app.directive('highlight', {
  /* ... */
})
```
It is possible to type global custom directives by extending the `GlobalDirectives` interface from `vue`

## When to use custom directives​
Custom directives should only be used when the desired functionality can only be achieved via direct DOM manipulation.

A common example of this is a `v-focus` custom directive that brings an element into focus.

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // enables v-focus in template
    focus
  }
}
```
```template
<input v-focus />
```
This directive is more useful than the `autofocus` attribute because it works not just on page load - it also works when the element is dynamically inserted by Vue!

Declarative templating with built-in directives such as `v-bind` is recommended when possible because they are more efficient and server-rendering friendly.
