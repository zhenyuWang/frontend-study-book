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

## Multiple `v-model` Bindings​
By leveraging the ability to target a particular prop and event as we learned before with `v-model` arguments, we can now create multiple `v-model` bindings on a single component instance.\
leverage /ˈliːvərɪdʒ/ 利用

Each `v-model` will sync to a different prop, without the need for extra options in the component:

```template
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```
```vue
<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

## Handling `v-model` Modifiers​
When we were learning about form input bindings, we saw that `v-model` has built-in modifiers - `.trim`, `.number` and `.lazy`. In some cases, you might also want the `v-model` on your custom input component to support custom modifiers.

Let's create an example custom modifier, `capitalize`, that capitalizes the first letter of the string provided by the `v-model` binding:

```template
<MyComponent v-model.capitalize="myText" />
```
Modifiers added to a component `v-model` will be provided to the component via the `modelModifiers` prop. In the below example, we have created a component that contains a `modelModifiers` prop that defaults to an empty object:

```vue
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```
Notice the component's `modelModifiers` prop contains `capitalize` and its value is `true` - due to it being set on the `v-model` binding `v-model.capitalize="myText"`.

Now that we have our prop set up, we can check the `modelModifiers` object keys and write a handler to change the emitted value. In the code below we will capitalize the string whenever the `<input />` element fires an input event.

```vue
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

## Modifiers for `v-model` with Arguments​
For `v-model` bindings with both argument and modifiers, the generated prop name will be `arg + "Modifiers"`. For example:

```template
<MyComponent v-model:title.capitalize="myText">
```
The corresponding declarations should be:

```js
export default {
  props: ['title', 'titleModifiers'],
  emits: ['update:title'],
  created() {
    console.log(this.titleModifiers) // { capitalize: true }
  }
}
```
Here's another example of using modifiers with multiple `v-model` bindings with different arguments:

```template
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
```
```vue
<script>
export default {
  props: {
    firstName: String,
    lastName: String,
    firstNameModifiers: {
      default: () => ({})
    },
    lastNameModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:firstName', 'update:lastName'],
  created() {
    console.log(this.firstNameModifiers) // { capitalize: true }
    console.log(this.lastNameModifiers) // { uppercase: true }
  }
}
</script>
```
