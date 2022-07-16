import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

interface WithChildren {
  children: React.ReactNode;
}

interface CounterProps extends WithChildren {
  onClick: () => void;
}

type Handler = () => void;

const App: React.FC = () => {
  const [ count, setCount ] = useState<number>(0)
  const increaseCount = () => setCount((count) => count + 1);

  return (
    <main className="app">
      <Header>
        <Counter onClick={increaseCount}>
          count is: {count}
        </Counter>
      </Header>
    </main>
  )
}

const Counter: React.FC<CounterProps> = ({ onClick, children }) => (
  <p>
    <button type="button" className="counter" onClick={onClick}>
      {children}
    </button>
  </p>
)

const Header: React.FC<WithChildren> = ({ children }) => (
  <header className="header">
    <img src={logo} className="logo" alt="logo" />
    <h1 className="title">Hello Vite + React!</h1>
    {children}
  </header>
)

export default App
