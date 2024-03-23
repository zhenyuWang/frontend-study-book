# Tutorial: Tic-Tac-Toe

tic-tac-toe [ˌtɪk tæk ˈtəʊ] 井字棋

You will build a small tic-tac-toe game during this tutorial. This tutorial dose not assume any existing React knowledge. The techniques you'll lean in the tutorial are fundamental to building any React app, and fully understanding it will give you a deep understanding of React.\
assume [əˈsuːm] 假定，认为

**Note**\
This tutorial is designed for people who prefer to learn by doing and want to quickly try making something tangible. If you prefer learning each concept step by step, start with Describing the UI.\
tangible ['tændʒəbl] 可触摸的，有形的\
concept ['kɒnsept] 概念

The tutorial is divided into several sections:
- Setup for the tutorial will give you a starting point to follow the tutorial.
- Overview will teach you the fundamentals of React: components, props, and state.
- Completing the Game will teach you the most common techniques in React development.
- Adding Time Travel will give you a deeper insight into the unique strengths of React.
divided into 分为\
several ['sevrəl] 几个\
fundamental [`fʌndə'mentl] 基础的\
insight ['ɪnsaɪt] 洞察力\
strength [streŋθ] 优势

## What are you building?

In this tutorial, you'll build an interactive tic-tac-toe game with React.\
interactive [`ɪntərˈæktɪv] 交互式

You can see what it will look like when you're finished here:

If the code doesn't make sense to you yet, or if you are unfamiliar with the code's syntax, don't worry! The goal of this tutorial is to help you understand React and it's syntax.

We recommend that you check out the tic-tac-toe game above before continuing with the tutorial. One of the features that you'll notice is that there is a numbered list to the right of the game's board. This list gives you a history of all of the moves that have occurred in the game, and it is updated as the game progresses.

Once you've played around with the finished tic-tac-toe game, keep scrolling. You'll start with a simpler template in the tutorial. Our next step is to set you up so that you can start building the game.

## Setup for the tutorial

In the live code editor below, click Fork in the top-right corner to open the editor in a new tab using the website CodeSandbox. CodeSandbox let you write code in your browser and preview how your users will see the app you're created. The new tab should display an empty square and the starter code for this tutorial.\
browser [ˈbraʊzər] 浏览器

**Note**\
You can also follow this tutorial using your local development environment. To do this, you need to:

1. Install Node.js
2. In the CodeSandbox tab you opened earlier, press the top-right corner button to open the menu, and then chose Download Sandbox in that menu to download an archive of the files locally
3. Unzip the archive, then open a terminal and `cd` to the directory you unzipped
4. Install the dependencies with `npm install`
5. Run `npm start` to start a local server and follow the prompts to view the code running in a browser

archive ['ɑːkaɪv] 存档\
unzip ['ʌnˌzɪp] 解压缩\
dependencies [dɪˈpendənsiz] 依赖项\
prompts [prɒmpts] 提示

If you get stuck, don't let this stop you! Follow along online instead and try a local setup again later.

## Overview

Now that you're setup, let's get an overview of React!

### Inspecting the starter code

In CodeSandbox you'll see three main sections:

1. The Files section with a list of files like App.js, index.js, styles.css and a folder called public.
2. The code editor where you'll see the source of your selected file
3. The browser section where you'll see how the code you've written be displayed

The App.js file should be selected in the Files section. The contents of that file in the code editor should be:

The browser section should be displaying a square with a X in it like this:

Now let's have a look at the files in the starter code.

#### App.js

The code in App.js creates a component. In React, a component is a piece of reusable code that represents a part of a user interface. Components are used to render, manage, and update the UI elements in your application. Let's look at the component line by line to see what's going on:
```jsx
export default function Square() {
  return <button className="square">X</button>;
}
```
The first line defines a function called Square. The export JavaScript keyword makes this function accessible outside of this file. The default keyword tells other files using your code that it's the main function in your file.

The second line returns a button. The return JavaScript keyword means whatever comes after is returned as a value to the caller of the function. `<button>` is a JSX element. A JSX element is a combination of JavaScript code and HTML tags that describes what you'd like to display. `className="square"` is a button property or prop that tells CSS how to style the button. `X` is the text displayed inside of the button and `</button>` closes the JSX element to indicate that any following content shouldn't be placed inside the button.

#### styles.css

Click on the file labeled `styles.css` in the Files sections of CodeSandbox. This file defines the styles for your React app. The first two CSS selectors(`*` and `body`) define the style of large parts of your app while the `.square` selector defines the style of any component where the `className` property is set to `square`. In your code, that would match the button from your Square component in the `App.js` file.

#### index.js

Click on the file labeled `index.js` in the Files section of CodeSandbox. You won't be editing this file during the tutorial but it is the bridge between the component you created in the `App.js` file and the web browser.
```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';
```
Lines 1-5 bring all the necessary pieces together:

- React
- React's library to talk to web browsers (React DOM)
- the styles for your components
- the component you created in `App.js`

The remainder of the file brings all the pieces together and injects the final product into `index.html` in the `public` folder.\
remainder [rɪˈmeɪndə] 剩余部分\

### Building the board

Let's get back to `App.js`. This is where you'll spend the rest of the tutorial.

Currently the board is only a single square, but you need nine! If you try and copy paste your square to make two squares like this:\
paste [peɪst] 粘贴
```jsx
export default function Square() {
  return <button className="square">X</button><button className="square">X</button>;
}
```
You'll get this error:
```
/src/App.js: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX Fragment <>...</>?
```
adjacent [ə'dʒeɪsnt] 相邻的\
React components need to return a single JSX element and not multiple adjacent JSX elements like two buttons. To fix this you can use Fragments(<> and </>) to wrap multiple adjacent JSX elements like this:
```jsx
export default function Square() {
  return (
    <>
      <button className="square">X</button>
      <button className="square">X</button>
    </>
  );
}
```

Now you should see:

Great! Now you just need to copy-paste a few times to add nine squares and...

Oh no! The squares are all in a single line, not in a grid like you need for our board. To fix this you'll need to group your squares into rows with `div`s and add some CSS classes. While you're at it, you'll give each square a number to make sure you know where each square is displayed.

In the `App.js` file, update the `Square` component to look like this:
```jsx
export default function Square() {
  return (
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}
```
The Css defined in `styles.css` styles the divs with the `className` of `board-row`. Now that you've grouped your components into rows with the styled `div`s you have your tic-tac-toe board:

But you now have a problem. Your component named `Square`, really isn't a square anymore. Let's fix that by changing the name to `Board`:

At this point your code should look something like this:
```jsx
export default function Board() {
  return (
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}
```
**Note**\
That's a lot of type! It's okay to copy and paste code from this page. However, if you're up for a little change, we recommend only copying code that you've manually typed at least once yourself.\
manually ['mænjuəli] 手动地

### Passing data through props

Next, you'll want to change the value of a square from empty to "X" when the user clicks on the square. With how you've built the board so far you would need to copy-paste the code that updates the square nine times(once for each square you have)! Instead of copy-pasting, React's component architecture allows you to create a reusable component to avoid messy, duplicated code.\
architecture [ˈɑːkɪtektʃər] 架构\
messy ['mesi] 凌乱的\
duplicated ['djuːplɪkeɪtɪd] 复制的

First, you are going to copy the line defining your first square(`<button className="square">1</button>`) from your `Board` component into a new `Square` component:
```jsx
function Square() {
  return <button className="square">1</button>;
}

export default function Board() {
  // ...
}
```
The you'll update the Board component to render that `Square` component using JSX syntax:
```jsx
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
```
Note how unlike the browser `div`s, your own components `Board` and `Square` nust start with a capital letter.

Let's take a look:

Oh, no! You lost the numbered squares you had before. New each square says "1". To fix this, you will use props to pass the value each square should have from the parent component(`Board`) to its child (`Square`).

Update the `Square` component to read the `value` prop that you'll pass from the `Board`:
```jsx
function Square({ value }) {
  return <button className="square">1</button>;
}
```
`function Square({ value })` indicates the Square component can be passed a prop called `value`.\
indicate ['ɪndɪkeɪt] 表明

Now you want to display that `value` instead of "1" inside every square. Try doing it like this:
```jsx
function Square({ value }) {
  return <button className="square">value</button>;
}
```
Oops, this is not what you wanted:

You wanted to render the JavaScript variable called `value` from your component, not the word "value". To "escape into JavaScript" from JSX, you need curly braces. Add curly braces around `value` in JSX like so:
```jsx
function Square({ value }) {
  return <button className="square">{value}</button>;
}
```
For now, you should see an empty board:

This is because the `Board` component hasn't passed the `value` prop to each `Square` component it renders yet. To fix it you'll add the `value` prop to each `Square` component rendered by the `Board` component:
```jsx
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
```
Now you should see a grid of numbers again:

You updated code should look like this:
```jsx
function Square({ value }) {
  return <button className="square">{value}</button>;
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
```

### Making an interactive component

Let's fill the `Square` component with an "X" when you click it. Declare a function called `handleClick` inside of the `Square`. Then, add `onClick` to the props of the button JSX element returned from the `Square`:
```jsx
function Square({ value }) {
  function handleClick() {
    console.log('clicked!');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
```
If you click on a square now, you should see a log saying "clicked!" in the Console tab at the bottom of the Browser section in CodeSandbox. Clicking the square more than once will log "clicked!" again. Repeated console logs with the same message will not create more lines in the console. Instead, you will see an incrementing counter next to your first "clicked!" log.

**Note**\
If you are following this tutorial using your local development environment, you need to open you browser's Console. For example, if you use the Chrome browser, you can view the Console with the keyboard shortcut `Ctrl+Shift+J`(on Windows/Linux) or `Option + ⌘ + J (on macOS)`.

As a next step, you want the Square component to "remember" that it got clicked, and fill it with an "X" mark. To "remember" things, components use state.

React provides a special function called `useState` that you can call from your component to let it "remember" things. Let's store the current value of the `Square` in state, and change it when the `Square` is clicked.

Import `useSate` at the top of the file. Remove the `value` prop from the `Square` component. Instead, add a new line at the start of the `Square` that calls `useState`. Have it return a state variable called `value`:
```jsx
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    //...
```
`value` stores the value and `setState` is a function that can be used to change the value. The `null` passed to `useState` is used as the initial value for this state variable, so `value` here starts off equal to `null`.

Since the `Square` component not longer accepts props anymore, you'll remove the `value` prop from all nine of the `Square` components created by the Board component:
```jsx
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
```
Now you'll change `Square` to display an "X" when clicked. Replace the `console.log("clicked");` event handler with `setValue('X');`. Now your `Square` component looks like this:
```jsx
function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
```
By calling this `set` function from an `onClick` handler, you're telling React to re-render that `Square` whenever its `<button>` is clicked. After the update, the `Square`'s value will be `'X'`, so you'll see the "X" on the game board. Click on any Square, and "X" should show up:

Each Square has its own state: the `value` stored in each Square is completely independent of the others. When you call a `set` function in a component. React automatically updates the child components inside too.\
automatically [`ɔːtəˈmætɪkli] 自动地

After you've made the above changes, your code will look like this:
```jsx
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
```

### React Developer Tools

React DevTools let you check the props and the state of your React components. You can find the React DevTools tab at the bottom of the Browser section in CodeSandbox.

To inspect a particular component on the screen, use the button in the top left corner of React DevTools:\
inspect [ɪnˈspekt] 检查\
particular [pəˈtɪkjələ] 特定的

**Note**\
For local development, React DevTools is available as a Chrome, Firefox, and Edge browser extension. Install it, and the Components tab will appear in your browser Developer Tools for sites using React.\
extension [ɪkˈstenʃn] 扩展\
appear [əˈpɪə] 出现
