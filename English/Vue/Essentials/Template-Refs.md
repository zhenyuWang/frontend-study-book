# Template Refs

While Vue's declarative rendering model abstracts away most of the direct DOM operations for you, there may still be cases where we need direct access to the underlying DOM elements. To achieve this, we can use the special ref attribute:\
declarative rendering model 声明式渲染模型\
abstract away 抽象掉，隐藏掉\
underlying [ˌʌndərˈlaɪɪŋ] 基础的，根本的；潜在的，隐含的

```template
<input ref="input">
```
`ref` is a special attribute, similar to the `key` attribute discussed in the `v-for` chapter. It allows us to obtain a direct reference to a specific DOM element or child component instance after it's mounted. This may be useful when you want to, for example, programmatically focus an input on component mount, or initialize a 3rd party library on an element.\
obtain [əbˈteɪn] 获得，得到\
programmatically [ˌproʊɡræməˈtɪkli] 程序化地，按照程序地

## Accessing the Refs​
To obtain the reference with Composition API, we can use the `useTemplateRef()`  helper:\
obtain the reference 获取引用

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'

// the first argument must match the ref value in the template
const input = useTemplateRef('my-input')

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```
When using TypeScript, Vue's IDE support and `vue-tsc` will automatically infer the type of `input.value` based on what element or component the matching `ref` attribute is used on.\
infer [ɪnˈfɜːr] 推断，推理

### Usage before 3.5
In versions before 3.5 where `useTemplateRef()` was not introduced, we need to declare a ref with a name that matches the template ref attribute's value:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```
If not using `<script setup>`, make sure to also return the ref from `setup()`:

```js
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

Note that you can only access the ref after the component is mounted. If you try to access `input` in a template expression, it will be `null` on the first render. This is because the element doesn't exist until after the first render!

If you are trying to watch the changes of a template ref, make sure to account for the case where the ref has `null` value:\
account for 考虑到，顾及到

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
  }
})
```

## Ref on Component​
This section assumes knowledge of Components. Feel free to skip it and come back later.

`ref` can also be used on a child component. In this case the reference will be that of a component instance:

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'
import Child from './Child.vue'

const childRef = useTemplateRef('child')

onMounted(() => {
  // childRef.value will hold an instance of <Child />
})
</script>

<template>
  <Child ref="child" />
</template>
```
### Usage before 3.5
```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value will hold an instance of <Child />
})
</script>

<template>
  <Child ref="child" />
</template>
```

If the child component is using Options API or not using `<script setup>`, the referenced instance will be identical to the child component's `this`, which means the parent component will have full access to every property and method of the child component. This makes it easy to create tightly coupled implementation details between the parent and the child, so component refs should be only used when absolutely needed - in most cases, you should try to implement parent / child interactions using the standard props and emit interfaces first.\
tightly coupled 紧密耦合
implementation details 实现细节
standard props and emit interfaces 标准的 props 和 emit 接口

An exception here is that components using `<script setup>` are private by default: a parent component referencing a child component using `<script setup>` won't be able to access anything unless the child component chooses to expose a public interface using the `defineExpose` macro:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// Compiler macros, such as defineExpose, don't need to be imported
defineExpose({
  a,
  b
})
</script>
```
When a parent gets an instance of this component via template refs, the retrieved instance will be of the shape `{ a: number, b: number }` (refs are automatically unwrapped just like on normal instances).

Note that `defineExpose` must be called before any await operation. Otherwise, properties and methods exposed after the await operation will not be accessible.
