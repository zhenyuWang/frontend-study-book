# Plugins​
## Introduction​
Plugins are self-contained code that usually add app-level functionality to Vue. This is how we install a plugin:

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* optional options */
})
``` 
A plugin is defined as either an object that exposes an `install()` method, or simply a function that acts as the install function itself. The install function receives the app instance along with additional options passed to `app.use()`, if any:

```js
const myPlugin = {
  install(app, options) {
    // configure the app
  }
}
```
There is no strictly defined scope for a plugin, but common scenarios where plugins are useful include:

1. Register one or more global components or custom directives with app.component() and app.directive().

2. Make a resource injectable throughout the app by calling app.provide().

3. Add some global instance properties or methods by attaching them to app.config.globalProperties.

4. A library that needs to perform some combination of the above (e.g. vue-router).
