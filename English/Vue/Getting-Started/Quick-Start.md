# Quick Start​
## Try Vue Online​
- To quickly get a taste of Vue, you can try it directly in our Playground.
- If you prefer a plain HTML setup without any build steps, you can use this JSFiddle as your starting point.
- If you are already familiar with Node.js and the concept of build tools, you can also try a complete build setup right within your browser on StackBlitz.
- To get a walkthrough of the recommended setup, watch this interactive Scrimba tutorial that shows you how to run, edit, and deploy your first Vue app.

walkthrough [/ˈwɔːkˌθrʊ/] 讲解，演练

## Creating a Vue Application​
Prerequisites\
prerequisite [ˌpriːˈrekwəzɪti] 前提，先决条件
- Familiarity with the command line
- Install Node.js version ^20.19.0 || >=22.12.0

In this section we will introduce how to scaffold a Vue Single Page Application on your local machine. The created project will be using a build setup based on Vite and allow us to use Vue Single-File Components (SFCs).\
scaffold [ˈskæfəʊld] 脚手架，搭建

Make sure you have an up-to-date version of Node.js installed and your current working directory is the one where you intend to create a project. Run the following command in your command line (without the $ sign):\
intend [ɪnˈtɛnd] 打算，计划

```sh
$ npm create vue@latest
```
This command will install and execute create-vue, the official Vue project scaffolding tool. You will be presented with prompts for several optional features such as TypeScript and testing support:\
execute [ˈɛksɪkjuːt] 执行，实施
```sh
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```
If you are unsure about an option, simply choose No by hitting enter for now. Once the project is created, follow the instructions to install dependencies and start the dev server:
```sh
$ cd <your-project-name>
$ npm install
$ npm run dev
```
You should now have your first Vue project running! Note that the example components in the generated project are written using the Composition API and `<script setup>`, rather than the Options API. Here are some additional tips:

- The recommended IDE setup is Visual Studio Code + Vue - Official extension. If you use other editors, check out the IDE support section.
- More tooling details, including integration with backend frameworks, are discussed in the Tooling Guide.
- To learn more about the underlying build tool Vite, check out the Vite docs.
- If you choose to use TypeScript, check out the TypeScript Usage Guide.

integration [ˌɪntɪˈgreɪʃən] 集成，结合\
When you are ready to ship your app to production, run the following:
```sh
$ npm run build
```
This will create a production-ready build of your app in the project's `./dist` directory. Check out the Production Deployment Guide to learn more about shipping your app to production.\
