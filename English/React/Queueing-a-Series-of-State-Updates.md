# Queueing a Series of State Updates

a series of 一系列\
queue 排队\
Setting a state variable will queue another render. But sometimes you might want to perform multiple operations on the value before queueing the next render. To do this, it helps to understand how React batches state updates.\
perform [/pəˈfɔːrm/] 执行\
batch 批处理\

You will learn
- What “batching” is and how React uses it to process multiple state updates
- How to apply several updates to the same state variable in a row
