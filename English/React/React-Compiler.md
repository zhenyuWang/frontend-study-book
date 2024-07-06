# React Compiler

## Overview
This page will give you an introduction to the new experimental React Compiler and how to try it out successfully.\
experimental [ɪkˌsperɪˈment(ə)l] 实验性的

**Under Construction**\
These docs are still a work in progress. More documentation is available in the React Compiler Working Group repo, and will be upstreamed into these docs when they are more stable.

**You will learn**\
- Getting started with the compiler
- Installing the compiler and eslint plugin
- Troubleshooting

**Note**\
React Compiler is a new experimental compiler that we’ve open sourced to get early feedback from the community. It still has rough edges and is not yet fully ready for production.\
rough edges [rʌf ˈedʒɪz] 未完善的地方

React Compiler requires React 19 RC. If you are unable to upgrade to React 19, you may try a userspace implementation of the cache function as described in the Working Group. However, please note that this is not recommended and you should upgrade to React 19 when possible.\
upgrade [ˌʌpˈɡreɪd] 升级\
userspace [ˈjuːzəspeɪs] 用户空间\
implementation [ˌɪmplɪmenˈteɪʃn] 实现

React Compiler is a new experimental compiler that we’ve open sourced to get early feedback from the community. It is a build-time only tool that automatically optimizes your React app. It works with plain JavaScript, and understands the Rules of React, so you don’t need to rewrite any code to use it.

The compiler also includes an eslint plugin that surfaces the analysis from the compiler right in your editor. The plugin runs independently of the compiler and can be used even if you aren’t using the compiler in your app.\
surface [ˈsɜːfɪs] 表面\
analysis [əˈnæləsɪs] 分析\
independently [ˌɪndɪˈpendəntli] 独立地

 We recommend all React developers to use this eslint plugin to help improve the quality of your codebase.

### What does the compiler do?
In order to optimize applications, React Compiler automatically memoizes your code. You may be familiar today with memoization through APIs such as useMemo, useCallback, and React.memo. With these APIs you can tell React that certain parts of your application don’t need to recompute if their inputs haven’t changed, reducing work on updates. While powerful, it’s easy to forget to apply memoization or apply them incorrectly.\
This can lead to inefficient updates as React has to check parts of your UI that don’t have any meaningful changes.\
 meaningful [ˈmiːnɪŋfl] 有意义的

The compiler uses its knowledge of JavaScript and React’s rules to automatically memoize values or groups of values within your components and hooks.\
If it detects breakages of the rules, it will automatically skip over just those components or hooks, and continue safely compiling other code.\
 detects [dɪˈtekt] 检测\
 breakage [ˈbreɪkɪdʒ] 破坏

If your codebase is already very well-memoized, you might not expect to see major performance improvements with the compiler. However, in practice memoizing the correct dependencies that cause performance issues is tricky to get right by hand.

#### What kind of memoization does React Compiler add?
The initial release of React Compiler is primarily focused on improving update performance (re-rendering existing components), so it focuses on these two use cases:

1. Skipping cascading re-rendering of components
    - Re-rendering `<Parent />` causes many components in its component tree to re-render, even though only `<Parent />` has changed
2. Skipping expensive calculations from outside of React
    - For example, calling `expensivelyProcessAReallyLargeArrayOfObjects()` inside of your component or hook that needs that data
##### Optimizing Re-renders 
React lets you express your UI as a function of their current state (more concretely: their props, state, and context). In its current implementation, when a component’s state changes, React will re-render that component and all of its children — unless you have applied some form of manual memoization with `useMemo()`, `useCallback()`, or `React.memo()`. For example, in the following example, `<MessageButton>` will re-render whenever `<FriendList>`’s state changes:\
manual [ˈmænjuəl] 手动的
```jsx
function FriendList({ friends }) {
  const onlineCount = useFriendOnlineCount();
  if (friends.length === 0) {
    return <NoFriends />;
  }
  return (
    <div>
      <span>{onlineCount} online</span>
      {friends.map((friend) => (
        <FriendListCard key={friend.id} friend={friend} />
      ))}
      <MessageButton />
    </div>
  );
}
```
[See this example in the React Compiler Playground](https://playground.react.dev/#N4Igzg9grgTgxgUxALhAMygOzgFwJYSYAEAYjHgpgCYAyeYOAFMEWuZVWEQL4CURwADrEicQgyKEANnkwIAwtEw4iAXiJQwCMhWoB5TDLmKsTXgG5hRInjRFGbXZwB0UygHMcACzWr1ABn4hEWsYBBxYYgAeADkIHQ4uAHoAPksRbisiMIiYYkYs6yiqPAA3FMLrIiiwAAcAQ0wU4GlZBSUcbklDNqikusaKkKrgR0TnAFt62sYHdmp+VRT7SqrqhOo6Bnl6mCoiAGsEAE9VUfmqZzwqLrHqM7ubolTVol5eTOGigFkEMDB6u4EAAhKA4HCEZ5DNZ9ErlLIWYTcEDcIA)
React Compiler automatically applies the equivalent of manual memoization, ensuring that only the relevant parts of an app re-render as state changes, which is sometimes referred to as “fine-grained reactivity”.\
fine-grained [faɪn ɡreɪnd] 细粒度的\
 In the above example, React Compiler determines that the return value of `<FriendListCard />` can be reused even as friends changes, and can avoid recreating this JSX and avoid re-rendering `<MessageButton>` as the count changes.

##### Expensive calculations also get memoized 
The compiler can also automatically memoize for expensive calculations used during rendering:
```jsx
// **Not** memoized by React Compiler, since this is not a component or hook
function expensivelyProcessAReallyLargeArrayOfObjects() { /* ... */ }

// Memoized by React Compiler since this is a component
function TableContainer({ items }) {
  // This function call would be memoized:
  const data = expensivelyProcessAReallyLargeArrayOfObjects(items);
  // ...
}
```
[See this example in the React Compiler Playground](https://playground.react.dev/#N4Igzg9grgTgxgUxALhAejQAgFTYHIQAuumAtgqRAJYBeCAJpgEYCemASggIZyGYDCEUgAcqAGwQwANJjBUAdokyEAFlTCZ1meUUxdMcIcIjyE8vhBiYVECAGsAOvIBmURYSonMCAB7CzcgBuCGIsAAowEIhgYACCnFxioQAyXDAA5gixMDBcLADyzvlMAFYIvGAAFACUmMCYaNiYAHStOFgAvk5OGJgAshTUdIysHNy8AkbikrIKSqpaWvqGIiZmhE6u7p7ymAAqXEwSguZcCpKV9VSEFBodtcBOmAYmYHz0XIT6ALzefgFUYKhCJRBAxeLcJIsVIZLI5PKFYplCqVa63aoAbm6u0wMAQhFguwAPPRAQA+YAfL4dIloUmBMlODogDpAA)
However, if `expensivelyProcessAReallyLargeArrayOfObjects` is truly an expensive function, you may want to consider implementing its own memoization outside of React, because:\
consider [kənˈsɪdər] 考虑\
implementing [ˈɪmplɪmɛntɪŋ] 实现

- React Compiler only memoizes React components and hooks, not every function
- React Compiler’s memoization is not shared across multiple components or hooks

So if `expensivelyProcessAReallyLargeArrayOfObjects` was used in many different components, even if the same exact items were passed down, that expensive calculation would be run repeatedly. We recommend profiling first to see if it really is that expensive before making code more complicated.\
complicated [ˈkɑːmplɪˌkeɪtɪd] 复杂的

### What does the compiler assume?
React Compiler assumes that your code:

1. Is valid, semantic JavaScript
2. Tests that nullable/optional values and properties are defined before accessing them (for example, by enabling `strictNullChecks` if using TypeScript), i.e., `if (object.nullableProperty) { object.nullableProperty.foo }` or with optional-chaining `object.nullableProperty?.foo`
3. Follows the [Rules of React](https://react.dev/reference/rules)

semantic [sɪˈmæntɪk] 语义的\
React Compiler can verify many of the Rules of React statically, and will safely skip compilation when it detects an error. To see the errors we recommend also installing `eslint-plugin-react-compiler`.\
verify [ˈverɪfaɪ] 验证\
statically [ˈstætɪkli] 静态地\
compilation [ˌkɑːmpəˈleɪʃn] 编译
detect [dɪˈtekt] 检测

### Should I try out the compiler?
Please note that the compiler is still experimental and has many rough edges. While it has been used in production at companies like Meta, rolling out the compiler to production for your app will depend on the health of your codebase and how well you’ve followed the Rules of React.\
experimental [ɪkˌsperɪˈment(ə)l] 实验性的

You don’t have to rush into using the compiler now. It’s okay to wait until it reaches a stable release before adopting it. However, we do appreciate trying it out in small experiments in your apps so that you can provide feedback to us to help make the compiler better.\
adopt [əˈdɑːpt] 采用\
appreciate [əˈpriːʃieɪt] 感激

## Getting Started
In addition to these docs, we recommend checking the React Compiler Working Group for additional information and discussion about the compiler.\
addition [əˈdɪʃn] 补充

### Checking compatibility
Prior to installing the compiler, you can first check to see if your codebase is compatible:\
prior [ˈpraɪər] 先前的\
compatible [kəmˈpætəbl] 兼容的
```bash
npx react-compiler-healthcheck@latest
```
This script will:

- Check how many components can be successfully optimized: higher is better
- Check for `<StrictMode>` usage: having this enabled and followed means a higher chance that the Rules of React are followed
- Check for incompatible library usage: known libraries that are incompatible with the compiler

usage [ˈjuːsɪdʒ] 使用\
As an example:
```
Successfully compiled 8 out of 9 components.
StrictMode usage not found.
Found no usage of incompatible libraries.
```

### Installing eslint-plugin-react-compiler
React Compiler also powers an eslint plugin. The eslint plugin can be used independently of the compiler, meaning you can use the eslint plugin even if you don’t use the compiler.
```bash
npm install eslint-plugin-react-compiler
```
Then, add it to your eslint config:
```
module.exports = {
  plugins: [
    'eslint-plugin-react-compiler',
  ],
  rules: {
    'react-compiler/react-compiler': "error",
  },
}
```
The eslint plugin will display any violations of the rules of React in your editor. When it does this, it means that the compiler has skipped over optimizing that component or hook.
 This is perfectly okay, and the compiler can recover and continue optimizing other components in your codebase.\
 violation [vaɪˈleɪʃn] 违反

You don’t have to fix all eslint violations straight away. You can address them at your own pace to increase the amount of components and hooks being optimized, but it is not required to fix everything before you can use the compiler.\
straight away [streɪt əˈweɪ] 立即\
increase [ɪnˈkriːs] 增加
