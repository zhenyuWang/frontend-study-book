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
