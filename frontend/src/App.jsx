import { useState } from 'react'

import Header from './components/UI/Header/Header.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <h1>Счётчик кликов</h1>
      <button onClick={() => setCount(count + 1)}>
        Клик: {count}
      </button>
      <Header /> {/* Для примера */}
    </>
  )
}

export default App