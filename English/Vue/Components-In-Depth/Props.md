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

### Static vs. Dynamic Props​
So far, you've seen props passed as static values, like in:

```template
<BlogPost title="My journey with Vue" />
```
You've also seen props assigned dynamically with `v-bind` or its : shortcut, such as in:

```template
<!-- Dynamically assign the value of a variable -->
<BlogPost :title="post.title" />

<!-- Dynamically assign the value of a complex expression -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### Passing Different Value Types​
In the two examples above, we happen to pass string values, but any type of value can be passed to a prop.

Number​
```template
<!-- Even though `42` is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.       -->
<BlogPost :likes="42" />

<!-- Dynamically assign to the value of a variable. -->
<BlogPost :likes="post.likes" />
```
Boolean​
```template
<!-- Including the prop with no value will imply `true`. -->
<BlogPost is-published />

<!-- Even though `false` is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.          -->
<BlogPost :is-published="false" />

<!-- Dynamically assign to the value of a variable. -->
<BlogPost :is-published="post.isPublished" />
```
Array​
```template
<!-- Even though the array is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.            -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- Dynamically assign to the value of a variable. -->
<BlogPost :comment-ids="post.commentIds" />
```
Object​
```template
<!-- Even though the object is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.             -->
<BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
 />

<!-- Dynamically assign to the value of a variable. -->
<BlogPost :author="post.author" />
```

### Binding Multiple Properties Using an Object​
If you want to pass all the properties of an object as props, you can use `v-bind` without an argument (v-bind instead of :prop-name). For example, given a post object:

```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      }
    }
  }
}
```
The following template:

```template
<BlogPost v-bind="post" />
```
Will be equivalent to:

```template
<BlogPost :id="post.id" :title="post.title" />
```

## One-Way Data Flow​
All props form a one-way-down binding between the child property and the parent one: when the parent property updates, it will flow down to the child, but not the other way around. This prevents child components from accidentally mutating the parent's state, which can make your app's data flow harder to understand.\

In addition, every time the parent component is updated, all props in the child component will be refreshed with the latest value. This means you should not attempt to mutate a prop inside a child component. If you do, Vue will warn you in the console:

```js
export default {
  props: ['foo'],
  created() {
    // ❌ warning, props are readonly!
    this.foo = 'bar'
  }
}
```
There are usually two cases where it's tempting to mutate a prop:

1. The prop is used to pass in an initial value; the child component wants to use it as a local data property afterwards. In this case, it's best to define a local data property that uses the prop as its initial value:

```js
export default {
  props: ['initialCounter'],
  data() {
    return {
      // counter only uses this.initialCounter as the initial value;
      // it is disconnected from future prop updates.
      counter: this.initialCounter
    }
  }
}
```
2. The prop is passed in as a raw value that needs to be transformed. In this case, it's best to define a computed property using the prop's value:

```js
export default {
  props: ['size'],
  computed: {
    // computed property that auto-updates when the prop changes
    normalizedSize() {
      return this.size.trim().toLowerCase()
    }
  }
}
```

### Mutating Object / Array Props​
When objects and arrays are passed as props, while the child component cannot mutate the prop binding, it will be able to mutate the object or array's nested properties. This is because in JavaScript objects and arrays are passed by reference, and it is unreasonably expensive for Vue to prevent such mutations.

The main drawback of such mutations is that it allows the child component to affect parent state in a way that isn't obvious to the parent component, potentially making it more difficult to reason about the data flow in the future. As a best practice, you should avoid such mutations unless the parent and child are tightly coupled by design. In most cases, the child should emit an event to let the parent perform the mutation.\
drawback [/ˈdrɔːbæk/] 缺点\
potentially [/ˈpɒtənʃəli/] 潜在地
