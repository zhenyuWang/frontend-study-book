# Choosing the State Structure
Structuring state well can make a difference between a component that is pleasant to modify and debug, and one that is a constant source of bugs. Here are some tips you should consider when structuring state.

You will learn
- When to use a single vs multiple state variables
- What to avoid when organizing state
- How to fix common issues with the state structure

## Principles for structuring state
When you write a component that holds some state, you’ll have to make choices about how many state variables to use and what the shape of their data should be. While it’s possible to write correct programs even with a suboptimal state structure, there are a few principles that can guide you to make better choices:\
suboptimal [ˌsʌbˈɒptɪməl] 次优的\
principal [ˈprɪnsəpl] 原则
1. Group related state. If you always update two or more state variables at the same time, consider merging them into a single state variable.
2. Avoid contradictions in state. When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes. Try to avoid this.
3. Avoid redundant state. If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.
4. Avoid duplication in state. When the same data is duplicated between multiple state variables, or within nested objects, it is difficult to keep them in sync. Reduce duplication when you can.
5. Avoid deeply nested state. Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.

contradicition [ˌkɒntrəˈdɪkʃən] 矛盾\
redundant [rɪˈdʌndənt] 多余的\
duplication [ˌdjuːplɪˈkeɪʃən] 重复\
higharchical [ˌhaɪəˈrɑːrkɪkl] 分层的

The goal behind these principles is to make state easy to update without introducing mistakes. Removing redundant and duplicate data from state helps ensure that all its pieces stay in sync. This is similar to how a database engineer might want to “normalize” the database structure to reduce the chance of bugs. To paraphrase Albert Einstein, “Make your state as simple as it can be—but no simpler.”\
redundant [rɪˈdʌndənt] 多余的\
ensure [ɪnˈʃʊər] 确保

Now let’s see how these principles apply in action.

## Group related state
You might sometimes be unsure between using a single or multiple state variables.

Should you do this?
```jsx
const [x, setX] = useState(0);
const [y, setY] = useState(0);
```
Or this?
```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
```
Technically, you can use either of these approaches. But if some two state variables always change together, it might be a good idea to unify them into a single state variable. Then you won’t forget to always keep them in sync, like in this example where moving the cursor updates both coordinates of the red dot:
```jsx
import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  )
}
```
Another case where you’ll group data into an object or an array is when you don’t know how many pieces of state you’ll need. For example, it’s helpful when you have a form where the user can add custom fields.

**Pitfall**\
If your state variable is an object, remember that you can’t update only one field in it without explicitly copying the other fields. For example, you can’t do `setPosition({ x: 100 })` in the above example because it would not have the `y` property at all! Instead, if you wanted to set `x` alone, you would either do `setPosition({ ...position, x: 100 })`, or split them into two state variables and do `setX(100)`.
