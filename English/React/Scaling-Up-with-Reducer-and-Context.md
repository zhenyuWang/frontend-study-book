# Scaling Up with Reducer and Context
Reducers let you consolidate a component’s state update logic. Context lets you pass information deep down to other components. You can combine reducers and context together to manage state of a complex screen.\
consolidate [/kənˈsɑːlɪdeɪt/] 合并，统一

**You will learn**\
- How to combine a reducer with context
- How to avoid passing state and dispatch through props
- How to keep context and state logic in a separate file

## Combining a reducer with context
In this example from the introduction to reducers, the state is managed by a reducer. The reducer function contains all of the state update logic and is declared at the bottom of this file:

A reducer helps keep the event handlers short and concise. However, as your app grows, you might run into another difficulty. Currently, the `tasks` state and the `dispatch` function are only available in the top-level `TaskApp` component. To let other components read the list of tasks or change it, you have to explicitly pass down the current state and the event handlers that change it as props.\
concise [/kənˈsaɪs/] 简洁的

For example, `TaskApp` passes a list of tasks and the event handlers to `TaskList`:
```jsx
<TaskList
  tasks={tasks}
  onChangeTask={handleChangeTask}
  onDeleteTask={handleDeleteTask}
/>
```
And `TaskList` passes the event handlers to `Task`:
```jsx
<Task
  task={task}
  onChange={onChangeTask}
  onDelete={onDeleteTask}
/>
```
In a small example like this, this works well, but if you have tens or hundreds of components in the middle, passing down all state and functions can be quite frustrating!\
frustrating [/frʌˈstreɪtɪŋ/] 令人沮丧的

This is why, as an alternative to passing them through props, you might want to put both the `tasks` state and the `dispatch` function into context. This way, any component below `TaskApp` in the tree can read the `tasks` and `dispatch` actions without the repetitive “prop drilling”.\
alternative [/ɔːlˈtɜːrnətɪv/] 替代方案

Here is how you can combine a reducer with context:

1. Create the context.
2. Put state and dispatch into context.
3. Use context anywhere in the tree.

### Step 1: Create the context 
The `useReducer` Hook returns the current `tasks` and the `dispatch` function that lets you update them:
```jsx
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```
To pass them down the tree, you will create two separate contexts:

- `TasksContext` provides the current list of tasks.
- `TasksDispatchContext` provides the function that lets components dispatch actions.

Export them from a separate file so that you can later import them from other files:

Here, you’re passing `null` as the default value to both contexts. The actual values will be provided by the `TaskApp` component.

### Step 2: Put state and dispatch into context
Now you can import both contexts in your `TaskApp` component. Take the `tasks` and `dispatch` returned by `useReducer()` and provide them to the entire tree below:
```jsx
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        ...
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```
For now, you pass the information both via props and in context:

In the next step, you will remove prop passing.
