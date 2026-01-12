# Reactivity Fundamentals
## Declaring Reactive State​
### ref()​
In Composition API, the recommended way to declare reactive state is using the `ref()` function:

```js
import { ref } from 'vue'

const count = ref(0)
```
`ref()` takes the argument and returns it wrapped within a ref object with a `.value` property:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

To access refs in a component's template, declare and return them from a component's `setup()` function:

```js
import { ref } from 'vue'

export default {
  // `setup` is a special hook dedicated for the Composition API.
  setup() {
    const count = ref(0)

    // expose the ref to the template
    return {
      count
    }
  }
}
```
```html
<div>{{ count }}</div>
```
Notice that we did not need to append `.value` when using the ref in the template. For convenience, refs are automatically unwrapped when used inside templates (with a few caveats).\
convenience [/kənˈviːniəns/] n. 方便；便利；便利设施\
caveat [/ˈkæviæt/] n. 警告；附加说明

You can also mutate a ref directly in event handlers:

```template
<button @click="count++">
  {{ count }}
</button>
```
For more complex logic, we can declare functions that mutate refs in the same scope and expose them as methods alongside the state:

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // .value is needed in JavaScript
      count.value++
    }

    // don't forget to expose the function as well.
    return {
      count,
      increment
    }
  }
}
```
Exposed methods can then be used as event handlers:

```template
<button @click="increment">
  {{ count }}
</button>
```
Here's the example live on Codepen, without using any build tools.
