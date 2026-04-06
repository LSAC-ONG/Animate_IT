import { useState } from 'react'
import './App.scss'
import Homepage from './components/Homepage'
import { Routes, Route } from 'react-router-dom'
import Backgrounds from './components/Backgrounds/Backgrounds'
import Buttons from './components/Buttons/Buttons'
import Cursors from './components/Cursors/Cursors'
import Text from './components/Text/Text'
import Forms from './components/Forms/Forms'
import CarouselTest from './components/Carousel/CarouselTest'

function App() {
  const [hasPlayedHomepageLoader, setHasPlayedHomepageLoader] = useState(false)

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <Homepage
            shouldShowLoading={!hasPlayedHomepageLoader}
            onLoadingComplete={() => setHasPlayedHomepageLoader(true)}
          />
        )}
      />
      <Route path="/backgrounds" element={<Backgrounds />} />
      <Route path="/buttons" element={<Buttons />} />
      <Route path="/cursors" element={<Cursors />} />
      <Route path="/text" element={<Text />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/carousel-test" element={<CarouselTest />} />
    </Routes>
  )
}

export default App
