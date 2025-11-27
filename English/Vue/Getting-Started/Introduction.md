# Introduction
You are reading the documentation for Vue 3!

## What is Vue?​
Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative, component-based programming model that helps you efficiently develop user interfaces of any complexity.\
interface [ˈɪntərfeɪs] 界面\
standard [ˈstændərd] 标准\
declarative [dɪˈklærətɪv] 陈述的\
component-based 组件化的\
efficiently [ɪˈfɪʃntli] 高效地\
complexity [kəmˈplɛksɪti] 复杂性

Here is a minimal example:
```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```
```template
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```
The above example demonstrates the two core features of Vue:\
demonstrate [ˈdɛmənˌstreɪt] 展示

Declarative Rendering: Vue extends standard HTML with a template syntax that allows us to declaratively describe HTML output based on JavaScript state.

Reactivity: Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen.

You may already have questions - don't worry. We will cover every little detail in the rest of the documentation. For now, please read along so you can have a high-level understanding of what Vue offers.

Prerequisites\
prerequisite [priˈrɛkwəzɪt] 先决条件

The rest of the documentation assumes basic familiarity with HTML, CSS, and JavaScript. If you are totally new to frontend development, it might not be the best idea to jump right into a framework as your first step - grasp the basics and then come back! You can check your knowledge level with these overviews for JavaScript, HTML and CSS if needed. Prior experience with other frameworks helps, but is not required.\
grasp [ɡræsp] 掌握\
prior [ˈpraɪər] 先前的

## The Progressive Framework​
progressive [prəˈɡrɛsɪv] 渐进的\
Vue is a framework and ecosystem that covers most of the common features needed in frontend development. But the web is extremely diverse - the things we build on the web may vary drastically in form and scale. With that in mind, Vue is designed to be flexible and incrementally adoptable. Depending on your use case, Vue can be used in different ways:\
ecosystem [ˈiːkoʊˌsɪstəm] 生态系统\
extremely [ɪkˈstrimli] 极其\
diverse [dɪˈvɜrs] 多样的\
drastically [ˈdræstɪkli] 截然不同地\
form [fɔrm] 形式\
scale [skeɪl] 规模\
flexible [ˈflɛksəbəl] 灵活的\
incrementally [ɪnkrəˈmɛntəli] 逐步地\
adoptable [əˈdɑptəbəl] 可采用的

- Enhancing static HTML without a build step
- Embedding as Web Components on any page
- Single-Page Application (SPA)
- Fullstack / Server-Side Rendering (SSR)
- Jamstack / Static Site Generation (SSG)
- Targeting desktop, mobile, WebGL, and even the terminal

enhacing [ɪnˈhænsɪŋ] 增强\
embedding [ɛmˈbɛdɪŋ] 嵌入\
If you find these concepts intimidating, don't worry! The tutorial and guide only require basic HTML and JavaScript knowledge, and you should be able to follow along without being an expert in any of these.\
intimidating [ɪnˈtɪmɪˌdeɪtɪŋ] 令人生畏的

If you are an experienced developer interested in how to best integrate Vue into your stack, or you are curious about what these terms mean, we discuss them in more detail in Ways of Using Vue.\
integrate [ˈɪntəˌɡreɪt] 集成\
curious [ˈkjʊriəs] 好奇的

Despite the flexibility, the core knowledge about how Vue works is shared across all these use cases. Even if you are just a beginner now, the knowledge gained along the way will stay useful as you grow to tackle more ambitious goals in the future. If you are a veteran, you can pick the optimal way to leverage Vue based on the problems you are trying to solve, while retaining the same productivity. This is why we call Vue "The Progressive Framework": it's a framework that can grow with you and adapt to your needs.\
despite [dɪˈspaɪt] 尽管\
tackle [ˈtækəl] 处理\
ambitious [æmˈbɪʃəs] 有雄心的\
veteran [ˈvɛtərən] 老手\
leverage [ˈlɛvərɪdʒ] 利用\
retain [rɪˈteɪn] 保持\
productivity [ˌproʊdəkˈtɪvɪti] 生产力\
adapt [əˈdæpt] 适应

## Single-File Components​
In most build-tool-enabled Vue projects, we author Vue components using an HTML-like file format called Single-File Component (also known as *.vue files, abbreviated as SFC). A Vue SFC, as the name suggests, encapsulates the component's logic (JavaScript), template (HTML), and styles (CSS) in a single file. Here's the previous example, written in SFC format:\
abbreviated [əˈbriviˌeɪtɪd] 缩写的\
encapsulate [ɛnˈkæpsjəˌleɪt] 封装

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```
SFC is a defining feature of Vue and is the recommended way to author Vue components if your use case warrants a build setup. You can learn more about the how and why of SFC in its dedicated section - but for now, just know that Vue will handle all the build tools setup for you.\
warrant [ˈwɔrənt] 需要\
dedicated [ˈdɛdəˌkeɪtɪd] 专门的

## API Styles​
Vue components can be authored in two different API styles: Options API and Composition API.

## Options API​
With Options API, we define a component's logic using an object of options such as data, methods, and mounted. Properties defined by options are exposed on this inside functions, which points to the component instance:
```vue
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

## Composition API​
With Composition API, we define a component's logic using imported API functions. In SFCs, Composition API is typically used with `<script setup>`. The `setup` attribute is a hint that makes Vue perform compile-time transforms that allow us to use Composition API with less boilerplate. For example, imports and top-level variables / functions declared in `<script setup>` are directly usable in the template.\
typically [ˈtɪpɪkli] 通常地\
hint [hɪnt] 提示\
perform [pərˈfɔrm] 执行\
compile-time [kəmˈpaɪl taɪm] 编译时\
boilerplate [ˈbɔɪlərˌpleɪt] 样板代码

Here is the same component, with the exact same template, but using Composition API and `<script setup>` instead:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

## Which to Choose?​
Both API styles are fully capable of covering common use cases. They are different interfaces powered by the exact same underlying system. In fact, the Options API is implemented on top of the Composition API! The fundamental concepts and knowledge about Vue are shared across the two styles.\
capable [ˈkeɪpəbəl] 有能力的\
fundamental [ˌfʌndəˈmɛntəl] 基本的

The Options API is centered around the concept of a "component instance" (this as seen in the example), which typically aligns better with a class-based mental model for users coming from OOP language backgrounds. It is also more beginner-friendly by abstracting away the reactivity details and enforcing code organization via option groups.\
abstract [ˈæbstrækt] 抽象的

The Composition API is centered around declaring reactive state variables directly in a function scope and composing state from multiple functions together to handle complexity. It is more free-form and requires an understanding of how reactivity works in Vue to be used effectively. In return, its flexibility enables more powerful patterns for organizing and reusing logic.

You can learn more about the comparison between the two styles and the potential benefits of Composition API in the Composition API FAQ.

If you are new to Vue, here's our general recommendation:

- For learning purposes, go with the style that looks easier to understand to you. Again, most of the core concepts are shared between the two styles. You can always pick up the other style later.

- For production use:

    - Go with Options API if you are not using build tools, or plan to use Vue primarily in low-complexity scenarios, e.g. progressive enhancement.

    - Go with Composition API + Single-File Components if you plan to build full applications with Vue.

You don't have to commit to only one style during the learning phase. The rest of the documentation will provide code samples in both styles where applicable, and you can toggle between them at any time using the API Preference switches at the top of the left sidebar.\
applicable [əˈplɪkəbəl] 适用的
