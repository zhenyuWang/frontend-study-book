# Component v-model

## Basic Usage​
`v-model` can be used on a component to implement a two-way binding.

First let's revisit how `v-model` is used on a native element:

```template
<input v-model="searchText" />
```
Under the hood, the template compiler expands `v-model` to the more verbose equivalent for us. So the above code does the same as the following:\
under the hook 在底层\
verbose /vɜːrˈboʊs/ 冗长的\
equivalent /ɪˈkwɪvələnt/ 等价的

```template
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```
When used on a component, `v-model` instead expands to this:

```template
<CustomInput
  :model-value="searchText"
  @update:model-value="newValue => searchText = newValue"
/>
```
For this to actually work though, the `<CustomInput>` component must do two things:

1. Bind the value attribute of a native `<input>` element to the `modelValue` prop
2. When a native input event is triggered, emit an `update:modelValue` custom event with the new value

Here's that in action:

CustomInput.vue
```vue
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```
Now `v-model` should work perfectly with this component:

```template
<CustomInput v-model="searchText" />
```
Another way of implementing `v-model` within this component is to use a writable computed property with both a getter and a setter. The get method should return the `modelValue` property and the set method should emit the corresponding event:\
correspond /ˌkɔːrəˈspɑːnd/ 对应

CustomInput.vue
```vue
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <input v-model="value" />
</template>
```

## `v-model` Arguments​
`v-model` on a component can also accept an argument:

```template
<MyComponent v-model:title="bookTitle" />
```
In this case, instead of the default `modelValue` prop and `update:modelValue` event, the child component should expect a `title` prop and emit an `update:title` event to update the parent value:

MyComponent.vue
```vue
<script>
export default {
  props: ['title'],
  emits: ['update:title']
}
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```
