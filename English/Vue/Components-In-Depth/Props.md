# Props
## Props Declaration​
Vue components require explicit props declaration so that Vue knows what external props passed to the component should be treated as fallthrough attributes (which will be discussed in its dedicated section).

In SFCs using `<script setup>`, props can be declared using the `defineProps()` macro:

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```
In non-`<script setup>` components, props are declared using the `props` option:

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.foo)
  }
}
```
Notice the argument passed to `defineProps()` is the same as the value provided to the props options: the same `props` options API is shared between the two declaration styles.

In addition to declaring props using an array of strings, we can also use the object syntax:

```js
// in <script setup>
defineProps({
  title: String,
  likes: Number
})
```

```js
// in non-<script setup>
export default {
  props: {
    title: String,
    likes: Number
  }
}
```
For each property in the object declaration syntax, the key is the name of the prop, while the value should be the constructor function of the expected type.

This not only documents your component, but will also warn other developers using your component in the browser console if they pass the wrong type. We will discuss more details about prop validation further down this page.

If you are using TypeScript with `<script setup>`, it's also possible to declare props using pure type annotations:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

## Prop Passing Details​
### Prop Name Casing​
We declare long prop names using camelCase because this avoids having to use quotes when using them as property keys, and allows us to reference them directly in template expressions because they are valid JavaScript identifiers:

```js
export default {
  props: {
    greetingMessage: String
  }
}
```
```template
<span>{{ greetingMessage }}</span>
```
Technically, you can also use camelCase when passing props to a child component (except in in-DOM templates). However, the convention is using kebab-case in all cases to align with HTML attributes:

```template
<MyComponent greeting-message="hello" />
```
We use PascalCase for component tags when possible because it improves template readability by differentiating Vue components from native elements. However, there isn't as much practical benefit in using camelCase when passing props, so we choose to follow each language's conventions.
