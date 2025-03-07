# Extracting State Logic into a Reducer
Components with many state updates spread across many event handlers can get overwhelming. For these cases, you can consolidate all the state update logic outside your component in a single function, called a reducer.\
spread across 遍布\
overwhelming [/ˌoʊvərˈwelmɪŋ/] 令人不知所措的；压倒性的\
consolidate [kənˈsɑːlɪˌdeɪt] 巩固；加强；合并

**You will learn**\
- What a reducer function is
- How to refactor `useState` to `useReducer`
- When to use a reducer
- How to write one well

## Consolidate state logic with a reduce
As your components grow in complexity, it can get harder to see at a glance all the different ways in which a component’s state gets updated. For example, the `TaskApp` component below holds an array of `tasks` in state and uses three different event handlers to add, remove, and edit tasks:\
complexity [kəmˈpleksəti] 复杂性\
at a glance 乍一看, 一眼\

```jsx
import { useState } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
```
Each of its event handlers calls `setTasks` in order to update the state. As this component grows, so does the amount of state logic sprinkled throughout it. To reduce this complexity and keep all your logic in one easy-to-access place, you can move that state logic into a single function outside your component, called a “reducer”.\
sprinkle [ˈsprɪŋkl] 撒；洒；撒满；点缀\
throughout [θruːˈaʊt] 遍及；贯穿；自始至终\
reduce [rɪˈduːs] 减少；缩小；降低

Reducers are a different way to handle state. You can migrate from `useState` to `useReducer` in three steps:\
migrate [ˈmaɪɡreɪt] 迁移；移居

1. Move from setting state to dispatching actions.
2. Write a reducer function.
3. Use the reducer from your component.

### Step 1: Move from setting state to dispatching actions
Your event handlers currently specify what to do by setting state:
```jsx
function handleAddTask(text) {
  setTasks([
    ...tasks,
    {
      id: nextId++,
      text: text,
      done: false,
    },
  ]);
}

function handleChangeTask(task) {
  setTasks(
    tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    })
  );
}

function handleDeleteTask(taskId) {
  setTasks(tasks.filter((t) => t.id !== taskId));
}
```
Remove all the state setting logic. What you are left with are three event handlers:

- `handleAddTask(text)` is called when the user presses “Add”.
- `handleChangeTask(task)` is called when the user toggles a task or presses “Save”.
- `handleDeleteTask(taskId)` is called when the user presses “Delete”.

Managing state with reducers is slightly different from directly setting state. Instead of telling React “what to do” by setting state, you specify “what the user just did” by dispatching “actions” from your event handlers. (The state update logic will live elsewhere!) So instead of “setting `tasks`” via an event handler, you’re dispatching an “added/changed/deleted a task” action. This is more descriptive of the user’s intent.\
elsewhere [ˌelsˈwɛr] 在别处；在其他地方\
via [ˈvaɪə] 通过；经由\
descriptive [dɪˈskrɪptɪv] 描述的；描写的；描述性的\
intent [ɪnˈtent] 意图；目的；意向
```jsx
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
```
The object you pass to `dispatch` is called an “action”:
```jsx
function handleDeleteTask(taskId) {
  dispatch(
    // "action" object:
    {
      type: 'deleted',
      id: taskId,
    }
  );
}
```
It is a regular JavaScript object. You decide what to put in it, but generally it should contain the minimal information about what happened. (You will add the `dispatch` function itself in a later step.)
**Note**\
An action object can have any shape.

By convention, it is common to give it a string `type` that describes what happened, and pass any additional information in other fields. The `type` is specific to a component, so in this example either `'added'` or `'added_task'` would be fine. Choose a name that says what happened!
```jsx
dispatch({
  // specific to component
  type: 'what_happened',
  // other fields go here
});
```