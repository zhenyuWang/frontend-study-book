import { useState } from 'react'

function Header({ title }) {
  return <h1>{title}</h1>
}
function Message({ count }) {
  return <p>The count from home page is: {count}</p>
}
export default function HomePage({ title }) {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
  const [count, setCount] = useState(0)
  function handleClick() {
    setCount(count + 1)
  }
  return (
    <div>
      <Header title={title} />
      <p>React is a JavaScript library for building user interfaces.</p>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <button onClick={handleClick}>Click me to plus count</button>
      <Message count={count} />
    </div>
  )
}