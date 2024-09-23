# Keeping Components Pure
Some JavaScript functions are pure. Pure functions only perform a calculation and nothing more. By strictly only writing your components as pure functions, you can avoid an entire class of baffling bugs and unpredictable behavior as your codebase grows. To get these benefits, though, there are a few rules you must follow.\
pure [pjʊr] 纯的、
baffling [ˈbæflɪŋ] 令人困惑的
unpredictable [ˌʌnprɪˈdɪktəbl] 不可预测的\
purity [ˈpjʊərəti] 纯度

You will learn
- What purity is and how it helps you avoid bugs
- How to keep components pure by keeping changes out of the render phase
- How to use Strict Mode to find mistakes in your components

## Purity: Components as formulas
In computer science (and especially the world of functional programming), a pure function is a function with the following characteristics:\
characteristics [ˌkærɪktəˈrɪstɪks] 特征、特性

- **It minds its own business**. It does not change any objects or variables that existed before it was called.
- **Same inputs, same output**. Given the same inputs, a pure function should always return the same result.

You might already be familiar with one example of pure functions: formulas in math.

Consider this math formula: `y = 2x`.

If `x = 2` then `y = 4`. Always.

If `x = 3` then `y = 6`. Always.

If `x = 3`, y won’t sometimes be `9 or –1 or 2.5` depending on the time of day or the state of the stock market.

If `y = 2x` and `x = 3`, `y` will always be `6`.

If we made this into a JavaScript function, it would look like this:
```jsx
function double(number) {
  return 2 * number;
}
```
In the above example, `double` is a pure function. If you pass it `3`, it will return `6`. Always.

React is designed around this concept. React assumes that every component you write is a pure function. This means that React components you write must always return the same JSX given the same inputs:\
concept [ˈkɑːnsept] 概念\
assume [əˈsuːm] 假定

```jsx
function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
```
When you pass `drinkers={2}` to `Recipe`, it will return JSX containing `2 cups of water`. Always.

If you pass `drinkers={4}`, it will return JSX containing `4 cups of water`. Always.

Just like a math formula.

You could think of your components as recipes: if you follow them and don’t introduce new ingredients during the cooking process, you will get the same dish every time. That “dish” is the JSX that the component serves to React to render.\
ingredients [ɪnˈɡriːdiənts] 食材
