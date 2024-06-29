# Add React to an Existing Project
If you want to add some interactivity to your existing project, you don’t have to rewrite it in React. Add React to your existing stack, and render interactive React components anywhere.

**Note:**\
You need to install Node.js for local development. Although you can try React online or with a simple HTML page, realistically most JavaScript tooling you’ll want to use for development requires Node.js.\
realistically [ˌrɪəˈlɪstɪkli] 现实地；实际地；逼真地

## Using React for an entire subroute of your existing website
subroute [ˈsʌbˌruːt] 子路由\
Let’s say you have an existing web app at example.com built with another server technology (like Rails), and you want to implement all routes starting with example.com/some-app/ fully with React.

Here’s how we recommend to set it up:

1. Build the React part of your app using one of the React-based frameworks.
2. Specify /some-app as the base path in your framework’s configuration (here’s how: Next.js, Gatsby).
3. Configure your server or a proxy so that all requests under /some-app/ are handled by your React app.

This ensures the React part of your app can benefit from the best practices baked into those frameworks.

Many React-based frameworks are full-stack and let your React app take advantage of the server. However, you can use the same approach even if you can’t or don’t want to run JavaScript on the server. In that case, serve the HTML/CSS/JS export (next export output for Next.js, default for Gatsby) at /some-app/ instead.\
approach [əˈprəʊtʃ] 方法；途径；处理
