# Slots

## Slot Content and Outlet​
We have learned that components can accept props, which can be JavaScript values of any type. But how about template content? In some cases, we may want to pass a template fragment to a child component, and let the child component render the fragment within its own template.\
outlet [/ˈaʊtlet/] 出口

For example, we may have a `<FancyButton>` component that supports usage like this:

```template
<FancyButton>
  Click me! <!-- slot content -->
</FancyButton>
```
The template of `<FancyButton>` looks like this:

```template
<button class="fancy-btn">
  <slot></slot> <!-- slot outlet -->
</button>
```
The `<slot>` element is a slot outlet that indicates where the parent-provided slot content should be rendered.\
indicate [/ˈɪndɪkeɪt/] 表明

And the final rendered DOM:

```html
<button class="fancy-btn">Click me!</button>
``` 

With slots, the `<FancyButton>` is responsible for rendering the outer `<button>` (and its fancy styling), while the inner content is provided by the parent component.

Another way to understand slots is by comparing them to JavaScript functions:

```js
// parent component passing slot content
FancyButton('Click me!')

// FancyButton renders slot content in its own template
function FancyButton(slotContent) {
  return `<button class="fancy-btn">
      ${slotContent}
    </button>`
}
```
Slot content is not just limited to text. It can be any valid template content. For example, we can pass in multiple elements, or even other components:

```template
<FancyButton>
  <span style="color:red">Click me!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

By using slots, our `<FancyButton>` is more flexible and reusable. We can now use it in different places with different inner content, but all with the same fancy styling.\
fancy [/ˈfænsi/] 花哨的,华丽的

Vue components' slot mechanism is inspired by the native Web Component `<slot>` element, but with additional capabilities that we will see later.\
mechanism [/ˈmekənɪzəm/] 机制\
inspired [/ɪnˈspaɪərd/] 受到启发的\
capability [/ˌkeɪpəˈbɪləti/] 能力

