# Form Input Bindings
When dealing with forms on the frontend, we often need to sync the state of form input elements with corresponding state in JavaScript. It can be cumbersome to manually wire up value bindings and change event listeners:\
corresponding [/ˌkɔːrəˈspɑːndɪŋ/] 相应的，相关的\
cumbersome [/ˈkʌmbərsəm/] 笨重的，麻烦的\
manually [/məˈnuːəli/] 手动地，人工地

```template
<input
  :value="text"
  @input="event => text = event.target.value">
```
The `v-model` directive helps us simplify the above to:

```template
<input v-model="text">
```
In addition, `v-model` can be used on inputs of different types, `<textarea>`, and `<select>` elements. It automatically expands to different DOM property and event pairs based on the element it is used on:

- `<input>` with text types and `<textarea>` elements use `value` property and `input` event;
- `<input type="checkbox">` and `<input type="radio">` use `checked` property and `change` event;
- `<select>` uses `value` as a prop and `change` as an event.
Note

`v-model` will ignore the initial value, `checked` or `selected` attributes found on any form elements. It will always treat the current bound JavaScript state as the source of truth. You should declare the initial value on the JavaScript side, using reactivity APIs.

## Basic Usage​
### Text​
```template
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```
```
Message is:

edit me
```

#### Note

For languages that require an IME (Chinese, Japanese, Korean, etc.), you'll notice that `v-model` doesn't get updated during IME composition. If you want to respond to these updates as well, use your own `input` event listener and `value` binding instead of using `v-model`.
