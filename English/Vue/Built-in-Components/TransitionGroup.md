# TransitionGroup​
`<TransitionGroup>` is a built-in component designed for animating the insertion, removal, and order change of elements or components that are rendered in a list.

## Differences from <Transition>​
`<TransitionGroup>` supports the same props, CSS transition classes, and JavaScript hook listeners as `<Transition>`, with the following differences:

- It accepts a `tag` prop, which specifies an element to be rendered as a wrapper around the list. By default it doesn't render a wrapper element, same as `<Transition>`.
- Transition modes are not available, because we are no longer alternating between mutually exclusive elements.
- Elements inside are always required to have a unique `key` attribute.
- CSS transition classes will be applied to individual elements in the list, not to the group / container itself.

**TIP**

When used in in-DOM templates, it should be referenced as `<transition-group>`.

## Enter / Leave Transitions​
Here is an example of applying enter / leave transitions to a `v-for` list using `<TransitionGroup>`:

```template
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

## Move Transitions​
The above demo has some obvious flaws: when an item is inserted or removed, its surrounding items instantly "jump" into place instead of moving smoothly. We can fix this by adding a few additional CSS rules:

```css
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
```
Now it looks much better - even animating smoothly when the whole list is shuffled:

### Custom TransitionGroup classes​
You can also specify custom transition classes for the moving element by passing the `moveClass` prop to `<TransitionGroup>`, just like custom transition classes on `<Transition>`.
