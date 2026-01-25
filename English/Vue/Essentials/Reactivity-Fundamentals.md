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

### <script setup>​
Manually exposing state and methods via `setup()` can be verbose. Luckily, it can be avoided when using Single-File Components (SFCs). We can simplify the usage with `<script setup>`:\

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>
<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```
Top-level imports, variables and functions declared in `<script setup>` are automatically usable in the template of the same component. Think of the template as a JavaScript function declared in the same scope - it naturally has access to everything declared alongside it.

#### TIP

For the rest of the guide, we will be primarily using SFC + `<script setup>` syntax for the Composition API code examples, as that is the most common usage for Vue developers.

If you are not using SFC, you can still use Composition API with the `setup()` option.

### Why Refs?​
You might be wondering why we need refs with the `.value` instead of plain variables. To explain that, we will need to briefly discuss how Vue's reactivity system works.\
briefly [/ˈbriːfli/] adv. 简要地；简短地

When you use a ref in a template, and change the ref's value later, Vue automatically detects the change and updates the DOM accordingly. This is made possible with a dependency-tracking based reactivity system. When a component is rendered for the first time, Vue tracks every ref that was used during the render. Later on, when a ref is mutated, it will trigger a re-render for components that are tracking it.\
detect [/dɪˈtekt/] v. 发现；察觉；检测\
accordingly [/əˈkɔːrdɪŋli/] adv. 相应地；照着办

In standard JavaScript, there is no way to detect the access or mutation of plain variables. However, we can intercept the get and set operations of an object's properties using getter and setter methods.\
access [/ˈækses/] n. 访问；使用权

The `.value` property gives Vue the opportunity to detect when a ref has been accessed or mutated. Under the hood, Vue performs the tracking in its getter, and performs triggering in its setter. Conceptually, you can think of a ref as an object that looks like this:\
perform [/pərˈfɔːrm/] v. 执行；履行\
conceptually [/kənˈseptʃuəli/] adv. 概念上地

```js
// pseudo code, not actual implementation
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```
Another nice trait of refs is that unlike plain variables, you can pass refs into functions while retaining access to the latest value and the reactivity connection. This is particularly useful when refactoring complex logic into reusable code.\
trait [/treɪt/] n. 优点\
retain [/rɪˈteɪn/] v. 保持；保留\
particularly [/pərˈtɪkjələrli/] adv. 特别地；尤其地

The reactivity system is discussed in more details in the Reactivity in Depth section.

### Deep Reactivity​
Refs can hold any value type, including deeply nested objects, arrays, or JavaScript built-in data structures like `Map`.

A ref will make its value deeply reactive. This means you can expect changes to be detected even when you mutate nested objects or arrays:

```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // these will work as expected.
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```
Non-primitive values are turned into reactive proxies via reactive(), which is discussed below.\
primitive [/ˈprɪmətɪv/] adv. 原始的

It is also possible to opt-out of deep reactivity with shallow refs. For shallow refs, only `.value` access is tracked for reactivity. Shallow refs can be used for optimizing performance by avoiding the observation cost of large objects, or in cases where the inner state is managed by an external library.\
opt-out [/ˈɑːpt aʊt/] v. 选择不参加

Further reading:

- Reduce Reactivity Overhead for Large Immutable Structures
- Integration with External State Systems

overhead [/ˈoʊvərhed/] n. 额外开销；管理费用\
integration [/ˌɪntɪˈɡreɪʃn/] n. 整合；结合

### DOM Update Timing​
When you mutate reactive state, the DOM is updated automatically. However, it should be noted that the DOM updates are not applied synchronously. Instead, Vue buffers them until the "next tick" in the update cycle to ensure that each component updates only once no matter how many state changes you have made.\
buffer [/ˈbʌfər/] v. 缓冲；缓解

To wait for the DOM update to complete after a state change, you can use the `nextTick()` global API:

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // Now the DOM is updated
}
```

## reactive()​
There is another way to declare reactive state, with the `reactive()` API. Unlike a ref which wraps the inner value in a special object, `reactive()` makes an object itself reactive:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```
Usage in template:

```template
<button @click="state.count++">
  {{ state.count }}
</button>
```
Reactive objects are JavaScript Proxies and behave just like normal objects. The difference is that Vue is able to intercept the access and mutation of all properties of a reactive object for reactivity tracking and triggering.\
behave [/bɪˈheɪv/] v. 表现；举止\
intercept [/ˌɪntərˈsept/] v. 截取；拦截

`reactive()` converts the object deeply: nested objects are also wrapped with `reactive()` when accessed. It is also called by `ref()` internally when the ref value is an object. Similar to shallow refs, there is also the `shallowReactive()` API for opting-out of deep reactivity.

### Reactive Proxy vs. Original​
It is important to note that the returned value from `reactive()` is a Proxy of the original object, which is not equal to the original object:

```js
const raw = {}
const proxy = reactive(raw)

// proxy is NOT equal to the original.
console.log(proxy === raw) // false
```
Only the proxy is reactive - mutating the original object will not trigger updates. Therefore, the best practice when working with Vue's reactivity system is to exclusively use the proxied versions of your state.\
exclusively [/ɪkˈskluːsɪvli/] adv. 专门地；排外地

To ensure consistent access to the proxy, calling `reactive()` on the same object always returns the same proxy, and calling `reactive()` on an existing proxy also returns that same proxy:\
consistent [/kənˈsɪstənt/] adj. 一致的；连贯的

```js
// calling reactive() on the same object returns the same proxy
console.log(reactive(raw) === proxy) // true

// calling reactive() on a proxy returns itself
console.log(reactive(proxy) === proxy) // true
```
This rule applies to nested objects as well. Due to deep reactivity, nested objects inside a reactive object are also proxies:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### Limitations of reactive()​
The `reactive()` API has a few limitations:

1. Limited value types: it only works for object types (objects, arrays, and collection types such as `Map` and `Set`). It cannot hold primitive types such as `string`, `number` or `boolean`.

2. Cannot replace entire object: since Vue's reactivity tracking works over property access, we must always keep the same reference to the reactive object. This means we can't easily "replace" a reactive object because the reactivity connection to the first reference is lost:

```js
let state = reactive({ count: 0 })

// the above reference ({ count: 0 }) is no longer being tracked
// (reactivity connection is lost!)
state = reactive({ count: 1 })
```
3. Not destructure-friendly: when we destructure a reactive object's primitive type property into local variables, or when we pass that property into a function, we will lose the reactivity connection:

```js
const state = reactive({ count: 0 })

// count is disconnected from state.count when destructured.
let { count } = state
// does not affect original state
count++

// the function receives a plain number and
// won't be able to track changes to state.count
// we have to pass the entire object in to retain reactivity
callSomeFunction(state.count)
```
Due to these limitations, we recommend using `ref()` as the primary API for declaring reactive state.

## Additional Ref Unwrapping Details
### As Reactive Object Property​
A ref is automatically unwrapped when accessed or mutated as a property of a reactive object. In other words, it behaves like a normal property:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```
If a new ref is assigned to a property linked to an existing ref, it will replace the old ref:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// original ref is now disconnected from state.count
console.log(count.value) // 1
```
Ref unwrapping only happens when nested inside a deep reactive object. It does not apply when it is accessed as a property of a shallow reactive object.

### Caveat in Arrays and Collections​
Unlike reactive objects, there is no unwrapping performed when the ref is accessed as an element of a reactive array or a native collection type like `Map`:

```js
const books = reactive([ref('Vue 3 Guide')])
// need .value here
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// need .value here
console.log(map.get('count').value)
```
