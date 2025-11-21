# Introduction
You are reading the documentation for Vue 3!

What is Vue?​\
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
