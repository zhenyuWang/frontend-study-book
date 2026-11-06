# KeepAlive
`<KeepAlive>` is a built-in component that allows us to conditionally cache component instances when dynamically switching between multiple components.

## Basic Usage​
In the Component Basics chapter, we introduced the syntax for Dynamic Components, using the `<component>` special element:

```template
<component :is="activeComponent" />
```
By default, an active component instance will be unmounted when switching away from it. This will cause any changed state it holds to be lost. When this component is displayed again, a new instance will be created with only the initial state.

In the example below, we have two stateful components - A contains a counter, while B contains a message synced with an input via `v-model`. Try updating the state of one of them, switch away, and then switch back to it:

You'll notice that when switched back, the previous changed state would have been reset.

Creating fresh component instance on switch is normally useful behavior, but in this case, we'd really like the two component instances to be preserved even when they are inactive. To solve this problem, we can wrap our dynamic component with the `<KeepAlive>` built-in component:

```template
<!-- Inactive components will be cached! -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```
Now, the state will be persisted across component switches:

> **TIP**

When used in in-DOM templates, it should be referenced as `<keep-alive>`.
