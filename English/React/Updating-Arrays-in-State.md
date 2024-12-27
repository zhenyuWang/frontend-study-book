# Updating Arrays in State
Arrays are mutable in JavaScript, but you should treat them as immutable when you store them in state. Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array.

**You will learn**
- How to add, remove, or change items in an array in React state
- How to update an object inside of an array
- How to make array copying less repetitive with Immer

## Updating arrays without mutation
In JavaScript, arrays are just another kind of object. Like with objects, you should treat arrays in React state as read-only. This means that you shouldn’t reassign items inside an array like `arr[0] = 'bird'`, and you also shouldn’t use methods that mutate the array, such as `push()` and `pop()`.\
reassign [/ˌriːəˈsaɪn/] 重新委派（任务、职位、责任等）；再分配，再指定

Instead, every time you want to update an array, you’ll want to pass a new array to your state setting function. To do that, you can create a new array from the original array in your state by calling its non-mutating methods like `filter()` and `map()`. Then you can set your state to the resulting new array.

Here is a reference table of common array operations. When dealing with arrays inside React state, you will need to avoid the methods in the left column, and instead prefer the methods in the right column:

Alternatively, you can use Immer which lets you use methods from both columns.

**Pitfall**\
Unfortunately, `slice` and `splice` are named similarly but are very different:\
unfortunately [/ʌnˈfɔːtʃənətli/] 不幸地，不幸的是

- `slice` lets you copy an array or a part of it.
- `splice` mutates the array (to insert or delete items).

In React, you will be using `slice` (no p!) a lot more often because you don’t want to mutate objects or arrays in state. Updating Objects explains what mutation is and why it’s not recommended for state.
