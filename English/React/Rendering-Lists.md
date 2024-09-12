# Rendering Lists
You will often want to display multiple similar components from a collection of data. You can use the JavaScript array methods to manipulate an array of data. On this page, you’ll use `filter()` and `map()` with React to filter and transform your array of data into an array of components.\
manipulate [məˈnɪpjʊleɪt] 操纵；操作

**You will learn**\
- How to render components from an array using JavaScript’s map()
- How to render only specific components using JavaScript’s filter()
- When and why to use React keys

## Rendering data from arrays
Say that you have a list of content.
```jsx
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
```
The only difference among those list items is their contents, their data. You will often need to show several instances of the same component using different data when building interfaces: from lists of comments to galleries of profile images. In these situations, you can store that data in JavaScript objects and arrays and use methods like `map()` and `filter()` to render lists of components from them.\
galleries [ˈɡæləriz] 画廊；美术馆

Here’s a short example of how to generate a list of items from an array:
1. Move the data into an array:
```jsx
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```
2. Map the people members into a new array of JSX nodes, listItems:
```jsx
const listItems = people.map(person => <li>{person}</li>);
```
3. Return listItems from your component wrapped in a <ul>:
```jsx
return <ul>{listItems}</ul>;
```
Here is the result:
```jsx
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```
Notice the sandbox above displays a console error:
```jsx
Console
Warning: Each child in a list should have a unique “key” prop.
```
You’ll learn how to fix this error later on this page. Before we get to that, let’s add some structure to your data.

## Filtering arrays of items
This data can be structured even more.
```jsx
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',  
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];
```
Let’s say you want a way to only show people whose profession is `'chemist'`. You can use JavaScript’s `filter()` method to return just those people. This method takes an array of items, passes them through a “test” (a function that returns `true` or `false`), and returns a new array of only those items that passed the test (returned true).\
profession [prəˈfɛʃən] 职业\
chemical [ˈkɛmɪkəl] 化学的

You only want the items where profession is `'chemist'`. The “test” function for this looks like `(person) => person.profession === 'chemist'`. Here’s how to put it together:

1. Create a new array of just “chemist” people, `chemists`, by calling `filter()` on the people filtering by `person.profession === 'chemist'`:
```jsx
const chemists = people.filter(person =>
  person.profession === 'chemist'
);
```
2. Now map over `chemists`:
```jsx
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       known for {person.accomplishment}
     </p>
  </li>
);
```
3. Lastly, return the listItems from your component:
```jsx
return <ul>{listItems}</ul>;
```
**Pitfall**\
Arrow functions implicitly return the expression right after `=>`, so you didn’t need a return statement:\
implicitly [ɪmˈplɪsɪtli] 隐含地
```jsx
const listItems = chemists.map(person =>
  <li>...</li> // Implicit return!
);
```
However, you must write return explicitly if your `=>` is followed by a `{` curly brace!
```jsx
const listItems = chemists.map(person => { // Curly brace
  return <li>...</li>;
});
```
Arrow functions containing `=> {` are said to have a “block body”. They let you write more than a single line of code, but you have to write a `return` statement yourself. If you forget it, nothing gets returned!
