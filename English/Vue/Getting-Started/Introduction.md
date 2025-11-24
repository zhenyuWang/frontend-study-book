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
