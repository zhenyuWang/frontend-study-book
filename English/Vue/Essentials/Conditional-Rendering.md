# Conditional Rendering
## v-if​
The directive `v-if` is used to conditionally render a block. The block will only be rendered if the directive's expression returns a truthy value.

```template
<h1 v-if="awesome">Vue is awesome!</h1>
```

## v-else​
You can use the `v-else` directive to indicate an "else block" for `v-if`:

```template
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```
A `v-else` element must immediately follow a `v-if` or a `v-else-if` element - otherwise it will not be recognized.
