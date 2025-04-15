import { useState } from 'react'
import './App.css'
import Homepage from './components/Homepage'
import { Routes, Route } from 'react-router-dom'
import Page1 from './components/Backgrounds'
import Page2 from './components/Buttons'
import Page3 from './components/Cursors'
import Page4 from './components/Text'
import Page5 from './components/Forms'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      <Route path="/page3" element={<Page3 />} />
      <Route path="/page4" element={<Page4 />} />
      <Route path="/page5" element={<Page5 />} />
    </Routes>
  )
}

export default App
