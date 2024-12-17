# Updating Objects in State
State can hold any kind of JavaScript value, including objects. But you shouldn’t change objects that you hold in the React state directly. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use that copy.

You will learn
- How to correctly update an object in React state
- How to update a nested object without mutating it
- What immutability is, and how not to break it
- How to make object copying less repetitive with Immer

mutate [mjuːˈteɪt] v. 变异；使变异；使突变；使变化\
immutability [ˌɪmjuːtəˈbɪləti] n. 不变性；恒定性\
repetitive [rɪˈpetətɪv] adj. 重复的；反复的；重复性的\
immer [ɪmər] n. 沉浸；专心；陷入；沉浸式

## What’s a mutation?
You can store any kind of JavaScript value in state.
```jsx
const [x, setX] = useState(0);
```
So far you’ve been working with numbers, strings, and booleans. These kinds of JavaScript values are “immutable”, meaning unchangeable or “read-only”. You can trigger a re-render to replace a value:
```jsx
setX(5);
```
The `x` state changed from `0` to `5`, but the number `0` itself did not change. It’s not possible to make any changes to the built-in primitive values like numbers, strings, and booleans in JavaScript.

Now consider an object in state:
```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
```
Technically, it is possible to change the contents of the object itself. This is called a mutation:\
technically [ˈteknɪkli] adv. 技术上；学术上；专门地
```jsx
position.x = 5;
```
However, although objects in React state are technically mutable, you should treat them as if they were immutable—like numbers, booleans, and strings. Instead of mutating them, you should always replace them.
