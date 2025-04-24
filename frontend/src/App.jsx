import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Homepage from './components/Homepage';
import Backgrounds from './components/Backgrounds';
import Buttons from './components/Buttons';
import Cursors from './components/Cursors';
import Text from './components/Text';
import Forms from './components/Forms';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/backgrounds" element={<Backgrounds />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/cursors" element={<Cursors />} />
        <Route path="/text" element={<Text />} />
        <Route path="/forms" element={<Forms />} />
      </Routes>
    </Router>
  );
}

export default App;
