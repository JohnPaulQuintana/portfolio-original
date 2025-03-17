import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import SwingingCard from './components/SwingingCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-background relative'>
        {/* header */}
        <Header />
        <SwingingCard />
    </div>
  )
}

export default App
