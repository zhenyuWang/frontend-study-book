# Template Syntax
Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component instance's data. All Vue templates are syntactically valid HTML that can be parsed by spec-compliant browsers and HTML parsers.\
declaratively [/ˌdekləˈreɪtɪvli/] adv. 宣言式地，声明式地\
underlying [/ˌʌndərˈlaɪɪŋ/] adj. 潜在的，根本的\
syntactically [/sɪnˈtæktɪkli/] adv. 语法上地\
spec-compliant [/ˈspɛk kəmˈplaɪənt/] adj. 符合规范的

Under the hood, Vue compiles the templates into highly-optimized JavaScript code. Combined with the reactivity system, Vue can intelligently figure out the minimal number of components to re-render and apply the minimal amount of DOM manipulations when the app state changes.\
hood [/hʊd/] n. 底层\
intelligently [/ɪnˈtelɪdʒəntli/] adv. 智能地\
manipulations [/məˌnɪpjʊˈleɪʃənz/] n. 操作，处理

If you are familiar with Virtual DOM concepts and prefer the raw power of JavaScript, you can also directly write render functions instead of templates, with optional JSX support. However, do note that they do not enjoy the same level of compile-time optimizations as templates.\
raw [/rɔː/] adj. 原始

## Text Interpolation​
The most basic form of data binding is text interpolation using the "Mustache" syntax (double curly braces):\
form [/fɔːrm/] n. 形式\
interpolation [/ɪntərˌpəleɪˈʃən/] n. 插值，插入

```template
<span>Message: {{ msg }}</span>
```
The mustache tag will be replaced with the value of the `msg` property from the corresponding component instance. It will also be updated whenever the msg property changes.\
corresponding [/ˌkɔːrəˈspɑːndɪŋ/] adj. 相应的

## Raw HTML​
The double mustaches interpret the data as plain text, not HTML. In order to output real HTML, you will need to use the `v-html` directive:

```template
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```
```
Using text interpolation: <span style="color: red">This should be red.</span>

Using v-html directive: This should be red.
```
Here we're encountering something new. The `v-html` attribute you're seeing is called a directive. Directives are prefixed with `v-` to indicate that they are special attributes provided by Vue, and as you may have guessed, they apply special reactive behavior to the rendered DOM. Here, we're basically saying "keep this element's inner HTML up-to-date with the `rawHtml` property on the current active instance."\
indicate [/ˈɪndɪkeɪt/] v. 指示

The contents of the span will be replaced with the value of the `rawHtml` property, interpreted as plain HTML - data bindings are ignored. Note that you cannot use `v-html` to compose template partials, because Vue is not a string-based templating engine. Instead, components are preferred as the fundamental unit for UI reuse and composition.\
compose [/kəmˈpəʊz/] v. 组成，构成，编写\
preferred [/prɪˈfɜːrd/] adj. 更好的\
fundamental [/ˌfʌndəˈmentl/] adj. 基本的，根本的

### Security Warning
Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to XSS vulnerabilities. Only use `v-html` on trusted content and never on user-provided content.\
arbitrary [/ˈɑːrbɪtreri/] adj. 任意的\
vulnerabilities [/ˌvʌlnərəˈbɪlətiz/] n. 漏洞

## Attribute Bindings​
Mustaches cannot be used inside HTML attributes. Instead, use a `v-bind` directive:

```template
<div v-bind:id="dynamicId"></div>
```
The `v-bind` directive instructs Vue to keep the element's `id` attribute in sync with the component's `dynamicId` property. If the bound value is `null` or `undefined`, then the attribute will be removed from the rendered element.\
instruct [/ɪnˈstrʌkt/] v. 指示\
bound [/baʊnd/] adj. 绑定的

### Shorthand​
Because `v-bind` is so commonly used, it has a dedicated shorthand syntax:\
dedicated [/ˈdedɪkeɪtɪd/] adj. 专用的

```template
<div :id="dynamicId"></div>
```
Attributes that start with `:` may look a bit different from normal HTML, but it is in fact a valid character for attribute names and all Vue-supported browsers can parse it correctly. In addition, they do not appear in the final rendered markup. The shorthand syntax is optional, but you will likely appreciate it when you learn more about its usage later.\
appreciate [/əˈpriːʃieɪt/] v. 领会，理解

For the rest of the guide, we will be using the shorthand syntax in code examples, as that's the most common usage for Vue developers.
