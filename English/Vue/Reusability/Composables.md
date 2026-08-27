# Composables​

**TIP**\
This section assumes basic knowledge of Composition API. If you have been learning Vue with Options API only, you can set the API Preference to Composition API (using the toggle at the top of the left sidebar) and re-read the Reactivity Fundamentals and Lifecycle Hooks chapters.

## What is a "Composable"?​
In the context of Vue applications, a "composable" is a function that leverages Vue's Composition API to encapsulate and reuse stateful logic.\
composable [/kəmˈpoʊzəbəl/] 可组合的；可组合的函数；可组合的逻辑；\
leverage [/ˈlɛvərɪdʒ/] 利用，借助；杠杆作用；杠杆原理；\
encapsulate [/ɪnˈkæpsjuleɪt/] 简要描述，概括；封装；

When building frontend applications, we often need to reuse logic for common tasks. For example, we may need to format dates in many places, so we extract a reusable function for that. This formatter function encapsulates stateless logic: it takes some input and immediately returns expected output. There are many libraries out there for reusing stateless logic - for example `lodash` and `date-fns`, which you may have heard of.

By contrast, stateful logic involves managing state that changes over time. A simple example would be tracking the current position of the mouse on a page. In real-world scenarios, it could also be more complex logic such as touch gestures or connection status to a database.\
contrast [/ˈkɑntræst/] 对比；对照；形成对照；\
scenario [/sɪˈnɛrioʊ/] 情节；场景；方案；设想；
