# React Developer Tools
Use React Developer Tools to inspect React components, edit props and state, and identify performance problems.

You will learn:\
How to install React Developer Tools

## Browser extension
The easiest way to debug websites built with React is to install the React Developer Tools browser extension. It is available for several popular browsers:
- [Install for Chrome](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Install for Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
- [Install for Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)

Now, if you visit a website built with React, you will see the Components and Profiler panels.

### Safari and other browsers
For other browsers (for example, Safari), install the [react-devtools](https://www.npmjs.com/package/react-devtools) npm package:
```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```
Next open the developer tools from the terminal:
```bash
react-devtools
```
Then connect your website by adding the following `<script>` tag to the beginning of your website’s `<head>`:
```html
<html>
  <head>
    <script src="http://localhost:8097"></script>
```
Reload your website in the browser now to view it in developer tools.

## Mobile (React Native)
React Developer Tools can be used to inspect apps built with React Native as well.

The easiest way to use React Developer Tools is to install it globally:
```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```
Next open the developer tools from the terminal.
```bash
react-devtools
```
It should connect to any local React Native app that’s running.

Try reloading the app if developer tools doesn’t connect after a few seconds.

[Learn more about debugging React Native.](https://reactnative.dev/docs/debugging)
