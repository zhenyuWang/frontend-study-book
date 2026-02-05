# Class and Style Bindings
A common need for data binding is manipulating an element's class list and inline styles. Since `class` and `style` are both attributes, we can use `v-bind` to assign them a string value dynamically, much like with other attributes. However, trying to generate those values using string concatenation can be annoying and error-prone. For this reason, Vue provides special enhancements when `v-bind` is used with `class` and `style`. In addition to strings, the expressions can also evaluate to objects or arrays.\
need [niːd] 需要；需求\
manipulate [məˈnɪpjuleɪt] 操纵；控制\
annoy [əˈnɔɪ] 使烦恼；打扰\
error-prone [ˈerər proʊn] 易出错的\
enhancement [ɪnˈhænsmənt] 增强；改进

## Binding HTML Classes​
### Binding to Objects​
We can pass an object to `:class` (short for `v-bind:class`) to dynamically toggle classes:

```template
<div :class="{ active: isActive }"></div>
```
The above syntax means the presence of the `active` class will be determined by the truthiness of the data property `isActive`.

You can have multiple classes toggled by having more fields in the object. In addition, the `:class` directive can also co-exist with the plain `class` attribute. So given the following state:

```js
const isActive = ref(true)
const hasError = ref(false)
```
And the following template:

```template
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```
It will render:

```template
<div class="static active"></div>
```
When `isActive` or `hasError` changes, the class list will be updated accordingly. For example, if `hasError` becomes true, the class list will become `"static active text-danger"`.

The bound object doesn't have to be inline:

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```
```template
<div :class="classObject"></div>
```
This will render:

```template
<div class="active"></div>
```
We can also bind to a computed property that returns an object. This is a common and powerful pattern:

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```
```template
<div :class="classObject"></div>
```
