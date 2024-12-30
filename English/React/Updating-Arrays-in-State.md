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

### Adding to an array
`push()` will mutate an array, which you don’t want:
```jsx
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        artists.push({
          id: nextId++,
          name: name,
        });
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```
Instead, create a new array which contains the existing items and a new item at the end. There are multiple ways to do this, but the easiest one is to use the `...` array spread syntax:
```jsx
setArtists( // Replace the state
  [ // with a new array
    ...artists, // that contains all the old items
    { id: nextId++, name: name } // and one new item at the end
  ]
);
```
Now it works correctly:
```jsx
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```
The array spread syntax also lets you prepend an item by placing it before the original `...artists`:\
prepend [/prɪˈpend/] 在…之前置于，放在…前面
```jsx
setArtists([
  { id: nextId++, name: name },
  ...artists // Put old items at the end
]);
```
In this way, spread can do the job of both `push()` by adding to the end of an array and `unshift()` by adding to the beginning of an array. Try it in the sandbox above!

### Removing from an array
The easiest way to remove an item from an array is to filter it out. In other words, you will produce a new array that will not contain that item. To do this, use the `filter` method, for example:
```jsx
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```
Click the “Delete” button a few times, and look at its click handler.
```jsx
setArtists(
  artists.filter(a => a.id !== artist.id)
);
```
Here, `artists.filter(a => a.id !== artist.id)` means “create an array that consists of those `artists` whose IDs are different from `artist.id`”. In other words, each artist’s “Delete” button will filter that artist out of the array, and then request a re-render with the resulting array. Note that `filter` does not modify the original array.
