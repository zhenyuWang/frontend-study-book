# Using TypeScript
TypeScript is a popular way to add type definitions to JavaScript codebases. Out of the box, TypeScript supports JSX and you can get full React Web support by adding `@types/react` and `@types/react-dom` to your project.\
definition [ˌdefɪˈnɪʃn] 定义，释义\
codebase [ˈkəʊdˌbeɪs] 代码库

You will lean
- TypeScript with React Components
- Examples of typing with Hooks
- Common types from @types/react
- Further learning locations

## Installation
All production-grade React frameworks offer support for using TypeScript. Follow the framework specific guide for installation:

- Next.js
- Remix
- Gatsby
- Expo

### Adding TypeScript to an existing React project
To install the latest version of React’s type definitions:
```
npm install @types/react @types/react-dom
```
The following compiler options need to be set in your tsconfig.json:

1. dom must be included in lib (Note: If no lib option is specified, dom is included by default).
2. jsx must be set to one of the valid options. preserve should suffice for most applications. If you’re publishing a library, consult the jsx documentation on what value to choose.\
suffice [səˈfaɪs] 足够，满足\
consult [kənˈsʌlt] 参考

## TypeScript with React Components
**Note:**\
Every file containing JSX must use the .tsx file extension. This is a TypeScript-specific extension that tells TypeScript that this file contains JSX.

Writing TypeScript with React is very similar to writing JavaScript with React. The key difference when working with a component is that you can provide types for your component’s props.\
These types can be used for correctness checking and providing inline documentation in editors.

Taking the `MyButton component` from the `Quick Start` guide, we can add a type describing the `title` for the button:
```
function MyButton({ title }: { title: string }) {
  return (
    <button>{title}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="I'm a button" />
    </div>
  );
}
```
**Note:**\
These sandboxes can handle TypeScript code, but they do not run the type-checker. This means you can amend the TypeScript sandboxes to learn, but you won’t get any type errors or warnings. To get type-checking, you can use the TypeScript Playground or use a more fully-featured online sandbox.

This inline syntax is the simplest way to provide types for a component, though once you start to have a few fields to describe it can become unwieldy. Instead, you can use an interface or type to describe the component’s props:\
unwieldy [ʌnˈwiːldi] 难处理的，笨重的
```
interface MyButtonProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return (
    <button disabled={disabled}>{title}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="I'm a disabled button" disabled={true}/>
    </div>
  );
}
```
The type describing your component’s props can be as simple or as complex as you need, though they should be an object type described with either a type or interface. You can learn about how TypeScript describes objects in Object Types but you may also be interested in using Union Types to describe a prop that can be one of a few different types and the Creating Types from Types guide for more advanced use cases.
