import { useState } from 'react'
import './App.css'
import Homepage from './components/Homepage'
import { Routes, Route } from 'react-router-dom'
import Backgrounds from './components/Backgrounds'
import Buttons from './components/Buttons'
import Cursors from './components/Cursors'
import Text from './components/Text'
import Forms from './components/Forms'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/backgrounds" element={<Backgrounds />} />
      <Route path="/buttons" element={<Buttons />} />
      <Route path="/cursors" element={<Cursors />} />
      <Route path="/text" element={<Text />} />
      <Route path="/forms" element={<Forms />} />
    </Routes>
  )
}

export default App
