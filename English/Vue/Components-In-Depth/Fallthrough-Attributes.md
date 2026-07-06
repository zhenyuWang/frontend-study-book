# Fallthrough Attributes

## Attribute Inheritance​
A "fallthrough attribute" is an attribute or `v-on` event listener that is passed to a component, but is not explicitly declared in the receiving component's props or emits. Common examples of this include `class`, `style`, and `id` attributes.\
fallthrough attribute 穿透属性

When a component renders a single root element, fallthrough attributes will be automatically added to the root element's attributes. For example, given a `<MyButton>` component with the following template:

```template
<!-- template of <MyButton> -->
<button>Click Me</button>
```
And a parent using this component with:

```template
<MyButton class="large" />
```
The final rendered DOM would be:

```html
<button class="large">Click Me</button>
```
Here, `<MyButton>` did not declare `class` as an accepted prop. Therefore, `class` is treated as a fallthrough attribute and automatically added to `<MyButton>`'s root element.
