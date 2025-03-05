# Extracting State Logic into a Reducer
Components with many state updates spread across many event handlers can get overwhelming. For these cases, you can consolidate all the state update logic outside your component in a single function, called a reducer.\
spread across 遍布\
overwhelming [/ˌoʊvərˈwelmɪŋ/] 令人不知所措的；压倒性的\
consolidate [kənˈsɑːlɪˌdeɪt] 巩固；加强；合并

**You will learn**\
- What a reducer function is
- How to refactor `useState` to `useReducer`
- When to use a reducer
- How to write one well
