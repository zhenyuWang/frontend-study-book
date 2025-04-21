# Manipulating the DOM with Refs
React automatically updates the DOM to match your render output, so your components won’t often need to manipulate it. However, sometimes you might need access to the DOM elements managed by React—for example, to focus a node, scroll to it, or measure its size and position. There is no built-in way to do those things in React, so you will need a ref to the DOM node.\
manipulate [/məˈnɪpjuleɪt/] 操作，操纵

**You will learn**
- How to access a DOM node managed by React with the `ref` attribute
- How the `ref` JSX attribute relates to the `useRef` Hook
- How to access another component’s DOM node
- In which cases it’s safe to modify the DOM managed by React
