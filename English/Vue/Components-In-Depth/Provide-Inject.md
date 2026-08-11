# Provide / Inject

## Prop Drilling​
Usually, when we need to pass data from the parent to a child component, we use props. However, imagine the case where we have a large component tree, and a deeply nested component needs something from a distant ancestor component. With only props, we would have to pass the same prop across the entire parent chain:\
distant [/ˈdɪstənt/] 遥远的\
ancestor [/ˈænsestər/] 祖先\
chain [/tʃeɪn/] 链

Notice although the `<Footer>` component may not care about these props at all, it still needs to declare and pass them along just so `<DeepChild>` can access them. If there is a longer parent chain, more components would be affected along the way. This is called "props drilling" and definitely isn't fun to deal with.\
drilling [/ˈdrɪlɪŋ/] 钻孔

We can solve props drilling with `provide` and `inject`. A parent component can serve as a dependency provider for all its descendants. Any component in the descendant tree, regardless of how deep it is, can inject dependencies provided by components up in its parent chain.\
descendant [/dɪˈsendənt/] 后代\
regardless [/rɪˈɡɑrdləs/] 不管

## Provide​
To provide data to a component's descendants, use the `provide()` function:\
descendant [/dɪˈsendənt/] 后代

```vue
<script setup>
import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'hello!')
</script>
```
If not using `<script setup>`, make sure `provide()` is called synchronously inside `setup()`:

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* key */ 'message', /* value */ 'hello!')
  }
}
```
The `provide()` function accepts two arguments. The first argument is called the injection key, which can be a string or a `Symbol`. The injection key is used by descendant components to lookup the desired value to inject. A single component can call `provide()` multiple times with different injection keys to provide different values.\
desired [/dɪˈzaɪərd/] 想要的

The second argument is the provided value. The value can be of any type, including reactive state such as refs:

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```
Providing reactive values allows the descendant components using the provided value to establish a reactive connection to the provider component.\
establish [/ɪˈstæblɪʃ/] 建立

## App-level Provide​
In addition to providing data in a component, we can also provide at the app level:

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* key */ 'message', /* value */ 'hello!')
```
App-level provides are available to all components rendered in the app. This is especially useful when writing plugins, as plugins typically wouldn't be able to provide values using components.

## Inject​
To inject data provided by an ancestor component, use the inject option:

```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // injected value
  }
}
```
Injections are resolved before the component's own state, so you can access injected properties in data():

```js
export default {
  inject: ['message'],
  data() {
    return {
      // initial data based on injected value
      fullMessage: this.message
    }
  }
}
```
If multiple parents provide data with the same key, inject will resolve to the value from the closest parent in component's parent chain.

### Injection Aliasing​
When using the array syntax for `inject`, the injected properties are exposed on the component instance using the same key. In the example above, the property was provided under the key `"message"`, and injected as `this.message`. The local key is the same as the injection key.

If we want to inject the property using a different local key, we need to use the object syntax for the `inject` option:

```js
export default {
  inject: {
    /* local key */ localMessage: {
      from: /* injection key */ 'message'
    }
  }
}
```
Here, the component will locate a property provided with the key `"message"`, and then expose it as `this.localMessage`.



### Injection Default Values​
By default, `inject` assumes that the injected key is provided somewhere in the parent chain. In the case where the key is not provided, there will be a runtime warning.

If we want to make an injected property work with optional providers, we need to declare a default value, similar to props:

```js
export default {
  // object syntax is required
  // when declaring default values for injections
  inject: {
    message: {
      from: 'message', // this is optional if using the same key for injection
      default: 'default value'
    },
    user: {
      // use a factory function for non-primitive values that are expensive
      // to create, or ones that should be unique per component instance.
      default: () => ({ name: 'John' })
    }
  }
}
```
