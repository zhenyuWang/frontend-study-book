# Passing Props to a Component
React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions.

**You will learn**
- How to pass props to a component
- How to read props from a component
- How to specify default values for props
- How to pass some JSX to a component
- How props change over time

## Familiar props
Props are the information that you pass to a JSX tag. For example, `className`, `src`, `alt`, `width`, and `height` are some of the props you can pass to an `<img>`:
```jsx
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}
```
The props you can pass to an `<img>` tag are predefined (ReactDOM conforms to the HTML standard). But you can pass any props to your own components, such as `<Avatar>`, to customize them. Here’s how!\
predefined [prɪˈdɪnaɪnd] 预先定义的\
standard [ˈstændərd] 标准
