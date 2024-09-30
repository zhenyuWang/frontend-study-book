# Understanding Your UI as a Tree
Your React app is taking shape with many components being nested within each other. How does React keep track of your app’s component structure?\
track [træk] 追踪

React, and many other UI libraries, model UI as a tree. Thinking of your app as a tree is useful for understanding the relationship between components. This understanding will help you debug future concepts like performance and state management.

**You will learn**
- How React “sees” component structures
- What a render tree is and what it is useful for
- What a module dependency tree is and what it is useful for

## Your UI as a tree
Trees are a relationship model between items and UI is often represented using tree structures. For example, browsers use tree structures to model HTML (DOM) and CSS (CSSOM). Mobile platforms also use trees to represent their view hierarchy.\
represent [ˌreprɪˈzent] 代表、表现\
hierarchy [ˈhaɪərɑːrki] 等级制度

Like browsers and mobile platforms, React also uses tree structures to manage and model the relationship between components in a React app. These trees are useful tools to understand how data flows through a React app and how to optimize rendering and app size.
