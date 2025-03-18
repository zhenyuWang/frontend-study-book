# Passing Data Deeply with Context
Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.

**You will learn**\
- What “prop drilling” is
- How to replace repetitive prop passing with context
- Common use cases for context
- Common alternatives to context

alternative [/ɔːlˈtɜːrnətɪv/] n. 替代的；替代物

## The problem with passing props
Passing props is a great way to explicitly pipe data through your UI tree to the components that use it.

But passing props can become verbose and inconvenient when you need to pass some prop deeply through the tree, or if many components need the same prop. The nearest common ancestor could be far removed from the components that need data, and lifting state up that high can lead to a situation called “prop drilling”.\
ancestor [ˈænʃstə(r)] n. 祖先；前辈

Wouldn’t it be great if there were a way to “teleport” data to the components in the tree that need it without passing props? With React’s context feature, there is!
