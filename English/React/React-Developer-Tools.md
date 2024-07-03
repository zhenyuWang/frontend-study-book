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
```
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```
Next open the developer tools from the terminal:
```
react-devtools
```
Then connect your website by adding the following `<script>` tag to the beginning of your website’s `<head>`:
```
<html>
  <head>
    <script src="http://localhost:8097"></script>
```
Reload your website in the browser now to view it in developer tools.
