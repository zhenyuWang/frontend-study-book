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
