# List Rendering
## v-for​
We can use the `v-for` directive to render a list of items based on an array. The `v-for` directive requires a special syntax in the form of `item in items`, where `items` is the source data array and `item` is an alias for the array element being iterated on:

```js
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```
```template
<li v-for="item in items">
  {{ item.message }}
</li>
```
Inside the `v-for` scope, template expressions have access to all parent scope properties. In addition, `v-for` also supports an optional second alias for the index of the current item:

```js
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
``` 
```template
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

Parent - 0 - Foo
Parent - 1 - Bar

The variable scoping of v-for is similar to the following JavaScript:

```js
const parentMessage = 'Parent'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  // has access to outer scope `parentMessage`
  // but `item` and `index` are only available in here
  console.log(parentMessage, item.message, index)
})
```
Notice how the `v-for` value matches the function signature of the `forEach` callback. In fact, you can use destructuring on the `v-for` item alias similar to destructuring function arguments:

```template
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- with index alias -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```
For nested `v-for`, scoping also works similar to nested functions. Each `v-for` scope has access to parent scopes:

```template
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```
You can also use `of` as the delimiter instead of `in`, so that it is closer to JavaScript's syntax for iterators:

```template
<div v-for="item of items"></div>
```

## v-for with an Object​
You can also use `v-for` to iterate through the properties of an object. The iteration order will be based on the result of calling `Object.values()` on the object:

```js
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```
```template
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```
You can also provide a second alias for the property's name (a.k.a. key):

```template
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```
And another for the index:

```template
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

## v-for with a Range​
`v-for` can also take an integer. In this case it will repeat the template that many times, based on a range of `1...n`.

```template
<span v-for="n in 10">{{ n }}</span>
```
Note here `n` starts with an initial value of `1` instead of `0`.
