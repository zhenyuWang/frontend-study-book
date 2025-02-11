# Sharing State Between Components
Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as lifting state up, and it’s one of the most common things you will do writing React code.

**You will learn**\
- How to share state between components by lifting it up
- What are controlled and uncontrolled components
