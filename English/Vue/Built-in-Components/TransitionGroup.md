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
