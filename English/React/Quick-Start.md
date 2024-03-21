# Quick Start

Welcome to the React documentation! This page will give you an introduction to the 80% of React concepts that you will use on a daily basis.\
concepts [kɒnsept] n. 概念;\
basis ['beɪsɪs] n. 基础;

You will learn
- How to create and nest components
- How to add markup and styles
- How to display data
- How to render conditions and lists
- How to respond to events and update the screen
- How to share data between components

## Creating and nesting components
React apps are made out of components. A component is a piece of the UI(user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.\
logic ['lɒdʒɪk] n. 逻辑;\
interface ['ɪntəfeɪs] n. 界面\
appearance [ə'pɪərəns] n. 外貌\
entire [ɪn'taɪə] adj. 整个的

React components are JavaScript functions that return markup:
```jsx
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```
Now that you've declared `MyButton`, you can nest it into another component:
```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```
declare [dɪ'kleə] v. 声明;\
Notice that `<MyButton />` starts with a capital letter. That's how you know it's a React component. React component names must start with a capital letter, while HTML tags must be lowercase.

Have a look at the result:
```jsx
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```
The `export default` keywords specify the main component in the file. If you're not familiar with some piece of JavaScript syntax, `MDN` and `javascript.info` have great references.

## Writing markup with JSX

The markup syntax you've seen above is called `JSX`. It is optional, but most `React` projects use `JSX` for it's convenience. All of the tools we recommend for local development support `JSX` out of the box.\
optional ['ɒpʃən(ə)l] adj. 可选择的;\
convenience [kən'viːnɪəns] n. 便利\
recommend [rekə'mend] v. 推荐

`JSX` is stricter than `HTML`. You have to close tags like `<br />`. Your component also can't return multiple `JSX` tags. You have to wrap them into a shared parent, like a `<div>...<d/div>` or an empty `<>...</>` wrapper:\
stricter ['strɪktə] adj. 严格的;\
multiple ['mʌltɪp(ə)l] adj. 多个的;\
```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```
Ig you have a lot of HTML to port to JSX, you can use an online converter.

## Adding styles

In React, you specify a CSS class with `className`.It works the same way as the HTML `class` attribute.
```jsx
<img className="avatar" />
```
Then you write the CSS rules for it in a separate CSS file:\
separate ['sep(ə)rət] adj. 分开的;\
```css
.avatar {
  border-radius: 50%;
}
```
React does not prescribe how you add CSS files. In the simplest case, you'll add a `<link>` tag to your HTML.If you use a build tool or a framework, consult it's documentation to learn how to add a CSS file to your project.\
prescribe [prɪ'skraɪb] v. 规定;\
consult [kən'sʌlt] v. 参考;

## Displaying data

JSX lets you put markup into JavaScript. Curly braces let you "escape back" into JavaScript so that you can embed some variable from your code and display it to the user.For example, this will display `user.name`:
curly braces ['kɜːli breɪsɪz] 大括号;\
escape [ɪ'skeɪp] v. 逃脱;\
embed [ɪm'bed] v. 嵌入;\
variable ['veərɪəbl] n. 变量;\
```jsx
return (
  <h1>
    {user.name}
  </h1>
);
```
You can also "escape into JavaScript" from JSX attributes, but you have to use curly braces instead of quotes. For example, `className="avatar"` passes the "avatar" string as the CSS class, but `src={user.imageUrl}` reads the JavaScript `user.imageUrl` variable value, and then passes that value as the `src` attribute:\
quotes [kwəʊts] n. 引号;\
avatar ['ævətɑː] n. 头像;
```jsx
return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);
```
You can put more complex expressions inside the JSX curly braces too, for example, string concatenation:
complex [kəm'pleks] adj. 复杂的;\
concatenation [kənˌkætəˈneɪʃn] n. 连接;
```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```
In the above example, `style={{}}` is not a special syntax, but a regular `{}` object inside the `style={}` JSX curly braces. You can use the style attribute when your styles depend on JavaScript variables.\
regular ['reɡjʊlə] adj. 正规的;

## Conditional rendering
In React,there is no special syntax for writing conditions. Instead, you'll use the same techniques as you use when writing regular JavaScript code. For example, you can use an if statement to conditionally include JSX:
```jsx
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```
If you prefer more compact code, you can use the `conditional ? operator`. Unlike `if`. it works inside JSX:
```jsx
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```
When you don't need the `else` branch, you can also use a shorter `logical && syntax`:
```jsx
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```
All of these approaches also work for conditionally specifying attributes. If you're unfamiliar with some of this JavaScript syntax, you can start by always using `if...else`.\
approaches [ə'prəʊtʃɪz] n. 方法;