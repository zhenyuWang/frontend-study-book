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
