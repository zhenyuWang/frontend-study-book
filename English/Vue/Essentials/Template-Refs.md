# Template Refs

While Vue's declarative rendering model abstracts away most of the direct DOM operations for you, there may still be cases where we need direct access to the underlying DOM elements. To achieve this, we can use the special ref attribute:\
declarative rendering model 声明式渲染模型\
abstract away 抽象掉，隐藏掉\
underlying [ˌʌndərˈlaɪɪŋ] 基础的，根本的；潜在的，隐含的

```template
<input ref="input">
```
`ref` is a special attribute, similar to the `key` attribute discussed in the `v-for` chapter. It allows us to obtain a direct reference to a specific DOM element or child component instance after it's mounted. This may be useful when you want to, for example, programmatically focus an input on component mount, or initialize a 3rd party library on an element.\
obtain [əbˈteɪn] 获得，得到\
programmatically [ˌproʊɡræməˈtɪkli] 程序化地，按照程序地
