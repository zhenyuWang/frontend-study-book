# Composables​

**TIP**\
This section assumes basic knowledge of Composition API. If you have been learning Vue with Options API only, you can set the API Preference to Composition API (using the toggle at the top of the left sidebar) and re-read the Reactivity Fundamentals and Lifecycle Hooks chapters.

## What is a "Composable"?​
In the context of Vue applications, a "composable" is a function that leverages Vue's Composition API to encapsulate and reuse stateful logic.\
composable [/kəmˈpoʊzəbəl/] 可组合的；可组合的函数；可组合的逻辑；\
leverage [/ˈlɛvərɪdʒ/] 利用，借助；杠杆作用；杠杆原理；\
encapsulate [/ɪnˈkæpsjuleɪt/] 简要描述，概括；封装；

When building frontend applications, we often need to reuse logic for common tasks. For example, we may need to format dates in many places, so we extract a reusable function for that. This formatter function encapsulates stateless logic: it takes some input and immediately returns expected output. There are many libraries out there for reusing stateless logic - for example `lodash` and `date-fns`, which you may have heard of.

By contrast, stateful logic involves managing state that changes over time. A simple example would be tracking the current position of the mouse on a page. In real-world scenarios, it could also be more complex logic such as touch gestures or connection status to a database.\
contrast [/ˈkɑntræst/] 对比；对照；形成对照；\
scenario [/sɪˈnɛrioʊ/] 情节；场景；方案；设想；

## Mouse Tracker Example​
If we were to implement the mouse tracking functionality using the Composition API directly inside a component, it would look like this:

```vue
// MouseComponent.vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```
But what if we want to reuse the same logic in multiple components? We can extract the logic into an external file, as a composable function:

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function useMouse() {
  // state encapsulated and managed by the composable
  const x = ref(0)
  const y = ref(0)

  // a composable can update its managed state over time.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // expose managed state as return value
  return { x, y }
}
```
And this is how it can be used in components:

```vue
// MouseComponent.vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

```
Mouse position is at: 1695, 3777
```

As we can see, the core logic remains identical - all we had to do was move it into an external function and return the state that should be exposed. Just like inside a component, you can use the full range of Composition API functions in composables. The same `useMouse()` functionality can now be used in any component.

The cooler part about composables though, is that you can also nest them: one composable function can call one or more other composable functions. This enables us to compose complex logic using small, isolated units, similar to how we compose an entire application using components. In fact, this is why we decided to call the collection of APIs that make this pattern possible Composition API.\
cooler part [/ˈkulər pɑrt/] 更酷的部分；更有趣的部分；

For example, we can extract the logic of adding and removing a DOM event listener into its own composable:

```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // if you want, you can also make this
  // support selector strings as target
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```
And now our `useMouse()` composable can be simplified to:

```js
//mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```
**TIP**\
Each component instance calling `useMouse()` will create its own copies of `x` and `y` state so they won't interfere with one another. If you want to manage shared state between components, read the State Management chapter.

## Async State Example​
The `useMouse()` composable doesn't take any arguments, so let's take a look at another example that makes use of one. When doing async data fetching, we often need to handle different states: loading, success, and error:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>
```
It would be tedious to have to repeat this pattern in every component that needs to fetch data. Let's extract it into a composable:\
tedious [/ˈtidiəs/] 乏味的；冗长的；单调的；

```js
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```
Now in our component we can just do:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

### Accepting Reactive State​
`useFetch()` takes a static URL string as input - so it performs the fetch only once and is then done. What if we want it to re-fetch whenever the URL changes? In order to achieve this, we need to pass reactive state into the composable function, and let the composable create watchers that perform actions using the passed state.

For example, `useFetch()` should be able to accept a ref:

```js
const url = ref('/initial-url')

const { data, error } = useFetch(url)

// this should trigger a re-fetch
url.value = '/new-url'
```
Or, accept a getter function:

```js
// re-fetch when props.id changes
const { data, error } = useFetch(() => `/posts/${props.id}`)
```
We can refactor our existing implementation with the watchEffect() and toValue() APIs:

```js
// fetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // reset state before fetching..
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
```
`toValue()` is an API added in 3.3. It is designed to normalize refs or getters into values. If the argument is a ref, it returns the ref's value; if the argument is a function, it will call the function and return its return value. Otherwise, it returns the argument as-is. It works similarly to `unref()`, but with special treatment for functions.

Notice that `toValue(url)` is called inside the `watchEffect` callback. This ensures that any reactive dependencies accessed during the `toValue()` normalization are tracked by the watcher.

This version of `useFetch()` now accepts static URL strings, refs, and getters, making it much more flexible. The watch effect will run immediately, and will track any dependencies accessed during `toValue(url)`. If no dependencies are tracked (e.g. url is already a string), the effect runs only once; otherwise, it will re-run whenever a tracked dependency changes.

Here's the updated version of useFetch(), with an artificial delay and randomized error for demo purposes.

## Conventions and Best Practices​
### Naming​
It is a convention to name composable functions with camelCase names that start with "use".

### Input Arguments​
A composable can accept ref or getter arguments even if it doesn't rely on them for reactivity. If you are writing a composable that may be used by other developers, it's a good idea to handle the case of input arguments being refs or getters instead of raw values. The `toValue()` utility function will come in handy for this purpose:

```js
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // If maybeRefOrGetter is a ref or a getter,
  // its normalized value will be returned.
  // Otherwise, it is returned as-is.
  const value = toValue(maybeRefOrGetter)
}
``` 
If your composable creates reactive effects when the input is a ref or a getter, make sure to either explicitly watch the ref / getter with `watch()`, or call `toValue()` inside a `watchEffect()` so that it is properly tracked.

The `useFetch()` implementation discussed earlier provides a concrete example of a composable that accepts refs, getters and plain values as input argument.

### Return Values​
You have probably noticed that we have been exclusively using `ref()` instead of `reactive()` in composables. The recommended convention is for composables to always return a plain, non-reactive object containing multiple refs. This allows it to be destructured in components while retaining reactivity:

```js
// x and y are refs
const { x, y } = useMouse()
```
Returning a reactive object from a composable will cause such destructures to lose the reactivity connection to the state inside the composable, while the refs will retain that connection.

If you prefer to use returned state from composables as object properties, you can wrap the returned object with `reactive()` so that the refs are unwrapped. For example:

```js
const mouse = reactive(useMouse())
// mouse.x is linked to original ref
console.log(mouse.x)
```
```template
Mouse position is at: {{ mouse.x }}, {{ mouse.y }}
```

### Side Effects​
It is OK to perform side effects (e.g. adding DOM event listeners or fetching data) in composables, but pay attention to the following rules:

- If you are working on an application that uses Server-Side Rendering (SSR), make sure to perform DOM-specific side effects in post-mount lifecycle hooks, e.g. `onMounted()`. These hooks are only called in the browser, so you can be sure that code inside them has access to the DOM.

- Remember to clean up side effects in `onUnmounted()`. For example, if a composable sets up a DOM event listener, it should remove that listener in `onUnmounted()` as we have seen in the `useMouse()` example. It can be a good idea to use a composable that automatically does this for you, like the `useEventListener()` example.
