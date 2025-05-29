# You Might Not Need an Effect
Effects are an escape hatch from the React paradigm. They let you “step outside” of React and synchronize your components with some external system like a non-React widget, network, or the browser DOM. If there is no external system involved (for example, if you want to update a component’s state when some props or state change), you shouldn’t need an Effect. Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.\
paradigm [/ˈpærədaɪm/] 范例；范式\
synchronize [/ˈsɪŋkrənaɪz/] 同步

**You will learn**
- Why and how to remove unnecessary Effects from your components
- How to cache expensive computations without Effects
- How to reset and adjust component state without Effects
- How to share logic between event handlers
- Which logic should be moved to event handlers
- How to notify parent components about changes

## How to remove unnecessary Effects
There are two common cases in which you don’t need Effects:\
unnecessary [/ʌnˈnesəseri/] 不必要的；多余的

- You don’t need Effects to transform data for rendering. For example, let’s say you want to filter a list before displaying it. You might feel tempted to write an Effect that updates a state variable when the list changes. However, this is inefficient. When you update the state, React will first call your component functions to calculate what should be on the screen. Then React will “commit” these changes to the DOM, updating the screen. Then React will run your Effects. If your Effect also immediately updates the state, this restarts the whole process from scratch! To avoid the unnecessary render passes, transform all the data at the top level of your components. That code will automatically re-run whenever your props or state change.
- You don’t need Effects to handle user events. For example, let’s say you want to send an `/api/buy` POST request and show a notification when the user buys a product. In the Buy button click event handler, you know exactly what happened. By the time an Effect runs, you don’t know what the user did (for example, which button was clicked). This is why you’ll usually handle user events in the corresponding event handlers.

feel tempted [/ˈtemptɪd/] 感到诱惑；感到想要\
inefficient [/ɪnɪˈfɪʃənt/] 低效的；无效率的\
scratch [/skrætʃ/] 从头开始；从零开始\
corresponding [/kəˈrɛspɒndɪŋ/] 相应的；对应的

You do need Effects to synchronize with external systems. For example, you can write an Effect that keeps a jQuery widget synchronized with the React state. You can also fetch data with Effects: for example, you can synchronize the search results with the current search query. Keep in mind that modern frameworks provide more efficient built-in data fetching mechanisms than writing Effects directly in your components.\
synchronize [/ˈsɪŋkrənaɪz/] 同步\
mechanism [/ˈmekənɪzəm/] 机制；方法

To help you gain the right intuition, let’s look at some common concrete examples!\
intuition [/ˌɪntuˈɪʃən/] 直觉；直观\
concrete [/ˈkɒnkriːt/] 具体的；实在的
