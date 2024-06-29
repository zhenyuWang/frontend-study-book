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
